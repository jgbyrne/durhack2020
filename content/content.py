import music

import sqlite3
import uuid

from flask import Flask, make_response, jsonify, request
app = Flask(__name__)

music_items = music.Music("./music")

temp_items = {}
temp_item_sets = {}

@app.route('/search/<string:item_type>/', methods=['GET'])
def search(item_type):
    if query := request.args.get("q"):
        if item_type == "album":
            items = music_items.search(query)
            set_id = str(uuid.uuid4())
            item_set = set()
            for item in items:
                temp_id = str(uuid.uuid4())
                item["id"] = temp_id
                temp_items[temp_id] = (item, set_id)
                item_set.add(temp_id)
            temp_item_sets[set_id] = (item_type, item_set)
            return jsonify(items)
        return make_response(jsonify({"msg": "No such Item Type"}), 400)
    return make_response(jsonify({"msg": "Needs 'q' param in args"}), 400)

@app.route('/item/<string:item_id>/', methods=['GET'])
def get_item(item_id):
    print(temp_items)
    if temp_item := temp_items.get(item_id):
        item, set_id = temp_item
        item_type, item_set = temp_item_sets[set_id]
        for item_id in item_set:
            del temp_items[item_id]
        del temp_item_sets[set_id]
        if item_type == "album":
            print(item)
            return jsonify(music_items.get_album_from_search_result(item))
        else:
            return make_response(jsonify({"msg": "No such Item Type"}), 400)
    
    conn = sqlite3.connect("items.db")
    c = conn.cursor()
    c.execute("SELECT * FROM items WHERE item_id = ?", (item_id,))
    if item := c.fetchone():
        _, item_type, impl_id = item
        if item_type == "album":
            return jsonify(music_items.get_album(impl_id))
        else:
            return make_response(jsonify({"msg": "No such Item Type"}), 400)
    else:
        return make_response(jsonify({"msg": "Not Found"}), 404)

