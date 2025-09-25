import uuid
from app.db.client import DB

db = DB()

# create location
def create_location(req):
    body = req.json()
    loc_id = str(uuid.uuid4())
    db.run("INSERT INTO location (id, name) VALUES ($1, $2)", (loc_id, body.get("name")))

    res = {"message": "Location created successfully", "location": body}
    req.send(200, res)

# get all locations
def get_locations(req):
    locations = db.all("SELECT * FROM location")
    res = {"locations": [dict(loc) for loc in locations]}
    req.send(200, res)

# get location by id
def get_location_by_id(req):
    loc_id = req.params["id"]
    loc = db.get("SELECT * FROM location WHERE id = $1", (loc_id,))
    if not loc:
        return req.send(404, {"error": "Location not found"})
    req.send(200, {"location": dict(loc)})

# update location
def update_location(req):
    loc_id = req.params["id"]
    body = req.json()

    db.run("UPDATE location SET name = $1 WHERE id = $2", (body.get("name"), loc_id))
    req.send(200, {"message": "Location updated successfully"})

# delete location
def delete_location(req):
    loc_id = req.params["id"]
    db.run("DELETE FROM location WHERE id = $1", (loc_id,))
    req.send(200, {"message": "Location deleted successfully"})
