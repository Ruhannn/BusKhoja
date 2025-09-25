from ..controllers.bus_controllers import (
    create_bus,
    get_buses,
    get_bus_by_id,
    update_bus,
    delete_bus
)

def handle_bus_routes(app):
    @app.get("/")
    def route(req):
        req.send(204, "Bus Khoja API is running.")
    # create bus
    @app.options("/create-bus")
    def route(req):
        req.send(204, "")

    @app.post("/create-bus")
    def route(req):
        return create_bus(req)

    # get all buses
    @app.get("/get-buses")
    def route(req):
        return get_buses(req)

    # get bus by id
    @app.get("/get-bus/:id")
    def route(req):
        return get_bus_by_id(req)

    # update bus
    @app.options("/update-bus/:id")
    def route(req):
        req.send(204, "")

    @app.put("/update-bus/:id")
    def route(req):
        return update_bus(req)

    # delete bus
    @app.options("/delete-bus/:id")
    def route(req):
        req.send(204, "")

    @app.delete("/delete-bus/:id")
    def route(req):
        return delete_bus(req)
