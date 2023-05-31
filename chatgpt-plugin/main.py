import json
import quart
import quart_cors
from quart import Quart, request, jsonify
import uuid
import os
import requests
import xml.etree.ElementTree as ET

app = quart_cors.cors(quart.Quart(__name__),
                      allow_origin=["http://localhost:3000", "https://zerocarbon.vercel.app","https://chat.openai.com"])

@app.post("/upload")
async def upload_csv():
    files = await request.files
    if 'file' not in files:
        return 'No file part', 400
    file = files['file']
    if file.filename == '':
        return 'No selected file', 400
    doc_id = str(uuid.uuid4())
    await file.save(os.path.join('uploads', doc_id))
    print(f'Processing file: {len((file.read()))}')
    return jsonify({"message": "File uploaded", "document_id": doc_id}), 200

@app.post("/carbon_offset_clear")
async def carbon_offset_clear():
    try:
        URL = "https://zerocarbon.vercel.app/api/leaderboard"
        data = await request.get_json()
        jsonData = {
            "user_id": data['user_id'],
            "carbon_emissions": 0
        }
        r = requests.post(URL, json=jsonData)
        return jsonify({"message": "Your carbon credits have been offset and position has been updated on the leaderboard."}), 200
    except Exception as e:
        return jsonify(error=str(e)), 500
    
@app.get("/get_csv/<string:doc_id>")
async def get_csv(doc_id):
    try:
        with open(os.path.join('uploads', f'{doc_id}'), 'r') as f:
            data = f.read()
        return quart.Response(data, mimetype='text/csv'), 200
    except FileNotFoundError:
        return 'File not found', 404
    
@app.get("/get_documents/<string:user_id>")
async def get_documentids(user_id):
    try:
        URL = "https://zerocarbon.vercel.app/api/file"
        r = requests.get(URL, params={'user_id': user_id})
        files = r.json()
        files = files['files']
        files = [file['document_id'] for file in files]
        return jsonify(files), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.get("/carbon_footprint_factors")
async def factors():
    return jsonify(["fuel", "electricity bill", "groceries", "shopping for electronic and clothes"]), 200

@app.get("/values")
async def values():
    return jsonify({"gas_price": 5, "fuel_efficiency": 25, "gasoline_co2_emission": 19, "co2_emission_food": 2.5}), 200

@app.get("/gas_price")
async def gas_price():
    return quart.Response(response="5", status=200)

@app.get("/carbon_offsetting_methods")
async def carbon_offsetting_methods():
    return jsonify(["Plant trees, one year a mature tree absorbs more than 48 pounds of carbon dioxide and 1 tree costs $8 to plant", "Carbon Capture and Storage, It take $60 per metric ton of CO2"]), 200

@app.get("/leaderboard")
async def get_leaderboard():
    try:
        URL = "https://zerocarbon.vercel.app/api/leaderboard"
        r = requests.get(URL)
        return r.json(), 200
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.post("/leaderboard")
async def add_to_leaderboard():
    try:
        URL = "https://zerocarbon.vercel.app/api/leaderboard"
        data = await request.get_json()
        r = requests.post(URL, json=data)
        return quart.Response(response='OK', status=200)
    except Exception as e:
        return jsonify(error=str(e)), 500

@app.get("/logo.jpeg")
async def plugin_logo():
    filename = 'logo.jpeg'
    return await quart.send_file(filename, mimetype='image/jpeg')

@app.get("/.well-known/ai-plugin.json")
async def plugin_manifest():
    host = request.headers['Host']
    with open("./.well-known/ai-plugin.json") as f:
        text = f.read()
        return quart.Response(text, mimetype="text/json")


@app.get("/openapi.yaml")
async def openapi_spec():
    host = request.headers['Host']
    with open("openapi.yaml") as f:
        text = f.read()
        return quart.Response(text, mimetype="text/yaml")


def main():
    app.run(debug=True, host="0.0.0.0", port=5003)

if __name__ == "__main__":
    main()
