from ..controllers.location_controllers import (
    create_location,
    get_locations,
    get_location_by_id,
    update_location,
    delete_location
)

def handle_location_routes(app):
    # create location
    @app.options("/api/create-location")
    def route(req):
        req.send(204, "")

    @app.post("/api/create-location")
    def route(req):
        return create_location(req)

    # get all locations
    @app.get("/api/get-locations")
    def route(req):
        return get_locations(req)

    # get location by id
    @app.get("/api/get-location/:id")
    def route(req):
        return get_location_by_id(req)

    # update location
    @app.options("/api/update-location/:id")
    def route(req):
        req.send(204, "")

    @app.put("/api/update-location/:id")
    def route(req):
        return update_location(req)

    # delete location
    @app.options("/api/delete-location/:id")
    def route(req):
        req.send(204, "")

    @app.delete("/api/delete-location/:id")
    def route(req):
        return delete_location(req)
