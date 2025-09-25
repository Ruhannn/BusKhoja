from ..controllers.route_controllers import (
    create_route,
    get_routes,
    get_route_by_id,
    update_route,
    delete_route,
    search_buses
)

def handle_route_routes(app):
    # create route
    @app.options("/api/create-route")
    def route(req):
        req.send(204, "")

    @app.post("/api/create-route")
    def route(req):
        return create_route(req)

    # get all routes
    @app.get("/api/get-routes")
    def route(req):
        return get_routes(req)

    # get route by id
    @app.get("/api/get-route/:id")
    def route(req):
        return get_route_by_id(req)

    # update route
    @app.options("/api/update-route/:id")
    def route(req):
        req.send(204, "")

    @app.put("/api/update-route/:id")
    def route(req):
        return update_route(req)

    # delete route
    @app.options("/api/delete-route/:id")
    def route(req):
        req.send(204, "")

    @app.delete("/api/delete-route/:id")
    def route(req):
        return delete_route(req)

    # search buses (from / to query params)
    @app.get("/api/search-buses")
    def route(req):
        return search_buses(req)
