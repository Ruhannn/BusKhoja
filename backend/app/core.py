import re
from http.server import BaseHTTPRequestHandler, HTTPServer
import urllib.parse
import json

class App:
    def __init__(self):
        self.routes = {
            'GET': [],
            'POST': [],
            'PUT': [],
            'DELETE': [],
            'OPTIONS': []
        }

    def get(self, path): return self._add_route('GET', path)
    def post(self, path): return self._add_route('POST', path)
    def put(self, path): return self._add_route('PUT', path)
    def delete(self, path): return self._add_route('DELETE', path)
    def options(self, path): return self._add_route('OPTIONS', path)

    def _add_route(self, method, path):
        param_names = re.findall(r':(\w+)', path)
        regex_path = re.sub(r':\w+', r'([^/]+)', path)
        regex = f"^{regex_path}$"

        def wrapper(handler):
            self.routes[method].append((re.compile(regex), param_names, handler))
            return handler
        return wrapper

    def run(self, host='0.0.0.0', port=8000):
        app = self

        class Handler(BaseHTTPRequestHandler):
            def _handle(self, method):
                parsed_path = urllib.parse.urlparse(self.path)
                path = parsed_path.path
                query = urllib.parse.parse_qs(parsed_path.query)


                if not path.startswith("/api"):
                    self.send_error(404, f"No {method} handler for {path}")
                    return


                path = path[4:]

                for regex, param_names, handler in app.routes[method]:
                    match = regex.match(path)
                    if match:
                        self.query = query
                        self.params = dict(zip(param_names, match.groups()))
                        self.body = None
                        if method in ('POST', 'PUT', 'OPTIONS'):
                            length = int(self.headers.get('Content-Length', 0))
                            self.body = self.rfile.read(length).decode('utf-8')
                        return handler(self)

                self.send_error(404, f"No {method} handler for {path}")

            def do_GET(self): self._handle('GET')
            def do_POST(self): self._handle('POST')
            def do_PUT(self): self._handle('PUT')
            def do_DELETE(self): self._handle('DELETE')
            def do_OPTIONS(self): self._handle('OPTIONS')

            def send(self, status, body):
                self.send_response(status)
                self.send_header('Access-Control-Allow-Origin', '*')
                self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE ,OPTIONS')
                self.send_header('Access-Control-Allow-Headers', 'Content-Type')
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                if not isinstance(body, str):
                    body = json.dumps(body)
                self.wfile.write(body.encode('utf-8'))

            def json(self):
                try:
                    return json.loads(self.body) if self.body else {}
                except json.JSONDecodeError:
                    return {}

        print(f"server running at http://{host}:{port}")
        try:
            HTTPServer((host, port), Handler).serve_forever()
        except KeyboardInterrupt:
            print("\nserver stopped.")

