from ..controllers.bus_controllers import (
    create_bus,
    get_buses,
    get_bus_by_id,
    update_bus,
    delete_bus
)

def handle_bus_routes(app):
    # create bus
    @app.options("/api/create-bus")
    def route(req):
        req.send(204, "")

    @app.post("/api/create-bus")
    def route(req):
        return create_bus(req)

    # get all buses
    @app.get("/api/get-buses")
    def route(req):
        return get_buses(req)

    # get bus by id
    @app.get("/api/get-bus/:id")
    def route(req):
        return get_bus_by_id(req)

    # update bus
    @app.options("/api/update-bus/:id")
    def route(req):
        req.send(204, "")

    @app.put("/api/update-bus/:id")
    def route(req):
        return update_bus(req)

    # delete bus
    @app.options("/api/delete-bus/:id")
    def route(req):
        req.send(204, "")

    @app.delete("/api/delete-bus/:id")
    def route(req):
        return delete_bus(req)
