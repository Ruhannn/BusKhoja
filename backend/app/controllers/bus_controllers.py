import uuid
from app.db.client import DB

db = DB()

# create bus
def create_bus(req):
    body = req.json()
    bus_id = str(uuid.uuid4())
    route_ids = body.get("routeIds", [])  
    db.run("""
        INSERT INTO bus (id, name, picture, route_ids)
        VALUES ($1, $2, $3, $4)
    """, (
        bus_id,
        body.get("busName"),
        body.get("fullPath"),  # assuming 'fullPath' is your picture
        route_ids  # PostgreSQL array
    ))

    res = {
        "message": "Bus created successfully",
        "bus": body
    }
    req.send(200, res)


# get all buses
def get_buses(req):
    buses = db.all("SELECT * FROM bus")
    res = {
        "message": "Buses retrieved successfully",
        "buses": [dict(bus) for bus in buses]
    }
    req.send(200, res)


# get bus by id
def get_bus_by_id(req):
    bus_id = req.params["id"]
    bus = db.get("SELECT * FROM bus WHERE id = $1", (bus_id,))
    if not bus:
        return req.send(404, {"error": "Bus not found"})
    req.send(200, {"bus": dict(bus)})


# update bus
def update_bus(req):
    bus_id = req.params["id"]
    body = req.json()

    current = db.get("SELECT * FROM bus WHERE id = $1", (bus_id,))
    if not current:
        return req.send(404, {"error": "Bus not found"})

    bus_name = body.get("busName", current["name"])
    picture = body.get("fullPath", current["picture"])
    route_ids = body.get("routeIds", current["route_ids"])

    db.run("""
        UPDATE bus SET name = $1, picture = $2, route_ids = $3 WHERE id = $4
    """, (bus_name, picture, route_ids, bus_id))

    req.send(200, {"message": "Bus updated successfully"})


# delete bus
def delete_bus(req):
    bus_id = req.params["id"]
    db.run("DELETE FROM bus WHERE id = $1", (bus_id,))
    req.send(200, {"message": "Bus deleted successfully"})
