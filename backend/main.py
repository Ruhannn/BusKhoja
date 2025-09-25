from app.core import App
from app.routes.bus_route import handle_bus_routes
from app.routes.location_routes import handle_location_routes
from app.routes.route_route import handle_route_routes
from app.db.client import DB
from app.db.schema import create_tables

db = DB()
app = App()

create_tables()
handle_bus_routes(app)
handle_location_routes(app)
handle_route_routes(app)

@app.get("/")
def route(req):
    req.send(204, "Bus Khoja API is running.")

app.run()
