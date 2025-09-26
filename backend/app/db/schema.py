from app.db.client import DB

db = DB()

# table
def create_tables():
    # location
    db.run("""
    CREATE TABLE IF NOT EXISTS location (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL UNIQUE
    );
    """)

    # route (connects two locations + price)
    db.run("""
    CREATE TABLE IF NOT EXISTS route (
        id SERIAL PRIMARY KEY,
        from_id INT NOT NULL REFERENCES location(id),
        to_id INT NOT NULL REFERENCES location(id),
        price INT NOT NULL
    );
    """)

    # bus (each bus belongs to a route)
    db.run("""
    CREATE TABLE IF NOT EXISTS bus (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        picture TEXT,
        route_id INT NOT NULL REFERENCES route(id) ON DELETE CASCADE
    );
    """)
