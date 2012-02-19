import json

def application(environ, start_response):
    status = '200 OK' # HTTP Status
    headers = [('Content-type', 'application/json')] # HTTP Headers
    start_response(status, headers)
    data = {'username': 'test user'};
    out = json.dumps(data)
    return [out]
