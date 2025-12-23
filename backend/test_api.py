#!/usr/bin/env python3
"""
Simple HTTP server to test the Lambda function locally
"""

import json
import os
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

# Set environment variable for local testing
os.environ['LOCAL_TEST'] = 'true'

# Mock boto3 for local testing
class MockBoto3:
    def client(self, *args, **kwargs):
        return self

import sys
sys.modules['boto3'] = MockBoto3()

from lambda_handler import lambda_handler

class RequestHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/analyze':
            # Read request body
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            
            # Create Lambda event
            event = {
                'body': post_data.decode('utf-8'),
                'headers': dict(self.headers)
            }
            
            try:
                # Call Lambda handler
                response = lambda_handler(event, {})
                
                # Send response
                self.send_response(response['statusCode'])
                for key, value in response['headers'].items():
                    self.send_header(key, value)
                self.end_headers()
                
                self.wfile.write(response['body'].encode('utf-8'))
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                error_response = json.dumps({'error': str(e)})
                self.wfile.write(error_response.encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()

def run_server(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RequestHandler)
    print(f"🚀 CatchUpX Backend Test Server running on http://localhost:{port}")
    print(f"📡 Test endpoint: POST http://localhost:{port}/analyze")
    print("\n📋 Test with curl:")
    print(f'''curl -X POST http://localhost:{port}/analyze \\
  -H "Content-Type: application/json" \\
  -d '{{"grade": "8", "answers": [{{"question_id": "MATH_Q1", "selected_option": "B"}}]}}'
''')
    print("Press Ctrl+C to stop the server")
    
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Server stopped")
        httpd.server_close()

if __name__ == '__main__':
    run_server()