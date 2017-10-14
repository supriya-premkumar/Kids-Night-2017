#!/usr/bin/env python
"""
Very simple HTTP server in python.
Usage::
    ./dummy-web-server.py [<port>]
Send a GET request::
    curl http://localhost
Send a HEAD request::
    curl -I http://localhost
Send a POST request::
    curl -d "foo=bar&bin=baz" http://localhost
"""
from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import slac

class S(BaseHTTPRequestHandler):
    def _set_headers(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

    def do_POST(self):
        # Doesn't do anything with posted data
        self._set_headers()
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        json_data = json.loads(post_data)
        json_out, status = calculate(json_data)
        self.send_response(status)
        if status != 200:
            json_out = write_http_error(status)
        self.wfile.write(json.dumps(json_out).encode())

def calculate(json_data):
    isValid = validate(json_data)
    if not isValid:
        json_out = json_data
        return (json_out, 400)
    if "reset" in json_data:
        json_out = slac.get_result(json_data, True)
    else:
        json_out = slac.get_result(json_data, False)
    return (json_out, 200)

def validate(json_data):
    if json_data["throttle"] < 0 or json_data["throttle"] > 100:
        return False
    return True

def write_http_error(status):
    out = {}
    if status == 400:
        out["error"] = "400: Bad Request"
    if status == 500:
        out["error"] = "500: Internal Server Error"
    return json.dumps(out)

def run(server_class=HTTPServer, handler_class=S, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print('Starting httpd...')
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
