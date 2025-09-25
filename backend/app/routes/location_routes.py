from ..controllers.location_controllers import (
    create_location,
    get_locations,
    get_location_by_id,
    update_location,
    delete_location
)

def handle_location_routes(app):
    # create location
    @app.options("/create-location")
    def route(req):
        req.send(204, "")

    @app.post("/create-location")
    def route(req):
        return create_location(req)

    # get all locations
    @app.get("/get-locations")
    def route(req):
        return get_locations(req)

    # get location by id
    @app.get("/get-location/:id")
    def route(req):
        return get_location_by_id(req)

    # update location
    @app.options("/update-location/:id")
    def route(req):
        req.send(204, "")

    @app.put("/update-location/:id")
    def route(req):
        return update_location(req)

    # delete location
    @app.options("/delete-location/:id")
    def route(req):
        req.send(204, "")

    @app.delete("/delete-location/:id")
    def route(req):
        return delete_location(req)
