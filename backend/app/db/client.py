import os
import psycopg2
import psycopg2.extras

class DB:
    def __init__(self, dsn=None):
        if dsn is None:
            secret_file = "/run/secrets/db-password"
            try:
                with open(secret_file, "r") as f:
                    db_password = f.read().strip()
            except FileNotFoundError:
                raise RuntimeError(f"Docker secret file not found: {secret_file}")
            dsn = ""
            dsn = f'postgresql://Ruhan:{db_password}@postgres:5432/bus-khoja'

        self.dsn = dsn
        self.conn = psycopg2.connect(self.dsn)

    # run a query that doesn't return results (INSERT, UPDATE, DELETE)
    def run(self, query, params=()):
        with self.conn.cursor() as cur:
            cur.execute(query, params)
        self.conn.commit()

    # get a single row
    def get(self, query, params=()):
        with self.conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(query, params)
            return cur.fetchone()

    # get all rows
    def all(self, query, params=None):
        with self.conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
            cur.execute(query, params or ())
            return cur.fetchall()

    # close connection
    def close(self):
        self.conn.close()
