import uuid
from app.db.client import DB

db = DB()

# create bus
def create_bus(req):
    body = req.json()
    bus_id = str(uuid.uuid4())
    db.run("""
        INSERT INTO bus (id, route_id, bus_name, full_path)
        VALUES ($1, $2, $3, $4)
    """, (
        bus_id,
        body.get("routeId"),
        body.get("busName"),
        body.get("fullPath")
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

    bus_name = body.get("busName", current["bus_name"])
    full_path = body.get("fullPath", current["full_path"])

    db.run("""
        UPDATE buses SET bus_name = $1, full_path = $2 WHERE id = $3
    """, (bus_name, full_path, bus_id))

    req.send(200, {"message": "Bus updated successfully"})

# delete bus
def delete_bus(req):
    bus_id = req.params["id"]
    db.run("DELETE FROM bus WHERE id = $1", (bus_id,))
    req.send(200, {"message": "Bus deleted successfully"})
