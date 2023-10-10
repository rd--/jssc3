#!/usr/bin/env python3

import http.server

class RequestHandler(http.server.CGIHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        return super(RequestHandler, self).end_headers()

httpd = http.server.HTTPServer(('', 8000), RequestHandler)
httpd.serve_forever()
