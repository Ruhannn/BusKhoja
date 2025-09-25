import uuid
from app.db.client import DB

db = DB()

# create route
def create_route(req):
    body = req.json()
    route_id = str(uuid.uuid4())
    db.run("""
        INSERT INTO route (id, from_location_id, to_location_id, price)
        VALUES ($1, $2, $3, $4)
    """, (
        route_id,
        body.get("fromLocationId"),
        body.get("toLocationId"),
        body.get("price")
    ))

    res = {"message": "Route created successfully", "route": body}
    req.send(200, res)

# get all routes
from app.db.client import DB

db = DB()

def get_routes(req):
    query = """
    SELECT
        r.id AS route_id,
        r.price,
        l1.id AS from_id,
        l1.name AS from_name,
        l2.id AS to_id,
        l2.name AS to_name,
        COALESCE(
            json_agg(
                json_build_object(
                    'id', b.id,
                    'name', b.name,
                    'picture', b.picture,
                    'full_path', b.full_path
                )
            ) FILTER (WHERE b.id IS NOT NULL),
            '[]'
        ) AS buses
    FROM route r
    JOIN location l1 ON r.from_id = l1.id
    JOIN location l2 ON r.to_id = l2.id
    LEFT JOIN bus b ON b.route_id = r.id
    GROUP BY r.id, r.price, l1.id, l2.id;
    """
    routes = db.all(query)
    res = {"routes": [dict(route) for route in routes]}
    req.send(200, res)

# get route by id
def get_route_by_id(req):
    route_id = req.params["id"]
    route = db.get("SELECT * FROM route WHERE id = $1", (route_id,))
    if not route:
        return req.send(404, {"error": "Route not found"})
    req.send(200, {"route": dict(route)})

# update route
def update_route(req):
    route_id = req.params["id"]
    body = req.json()

    current = db.get("SELECT * FROM routes WHERE id = $1", (route_id,))
    if not current:
        return req.send(404, {"error": "Route not found"})

    price = body.get("price", current["price"])

    db.run("UPDATE routes SET price = $1 WHERE id = $2", (price, route_id))
    req.send(200, {"message": "Route updated successfully"})

# delete route
def delete_route(req):
    route_id = req.params["id"]
    db.run("DELETE FROM route WHERE id = $1", (route_id,))
    req.send(200, {"message": "Route deleted successfully"})

def parse_int_param(param):
    if isinstance(param, list):
        param = param[0]
    try:
        return int(param)
    except (TypeError, ValueError):
        return None

# search buses by from/to
def search_buses(req):
    from_id = parse_int_param(req.query.get("from"))
    to_id = parse_int_param(req.query.get("to"))

    if from_id is None or to_id is None:
        return req.send(400, {"message": "Invalid 'from' or 'to' parameter"})

    try:
        results = db.all("""
            SELECT b.*, r.price, l_from.name AS from_location, l_to.name AS to_location
            FROM route r
            JOIN bus b ON b.route_id = r.id
            JOIN location l_from ON r.from_id = l_from.id
            JOIN location l_to ON r.to_id = l_to.id
            WHERE r.from_id = %s AND r.to_id = %s
        """, (from_id, to_id))

        buses_list = [
            {
                "price": row["price"],
                "bus": {
                    "name": row["name"],
                    "picture": row.get("picture"),
                    "full_path": row.get("full_path"),
                }
            }
            for row in results
        ]

        response = {
            "from": {"name": results[0]["from_location"]} if results else {},
            "to": {"name": results[0]["to_location"]} if results else {},
            "buses": buses_list,
        }

        req.send(200, {"message": "Search results", **response})

    except Exception as e:
        print("Error in search_buses:", e)
        req.send(500, {"message": "Internal server error"})
