import music

import sqlite3
import uuid
import io

from flask import Flask, make_response, jsonify, request, send_file
app = Flask(__name__)

music_items = music.Music("./music")

# When a search is performed, an item_set is produced
# These items are then cached in two variables

# temp_items = {temp_id : (item, set_id)}
# temp_item_sets = {set_id : (item_type, item_set)}

# When one item is retrieved from the temporary set,
# it is made permanant (retaining its temp_id); the other
# temporary items from the same set are all discarded.

temp_items = {}
temp_item_sets = {}

@app.route('/search/<string:item_type>/', methods=['GET'])
def search(item_type):
    if query := request.args.get("q"):
        if item_type == "album":
            items = music_items.search(query)
            set_id = str(uuid.uuid4())
            item_set = set()
            ret_items = []
            for item in items:
                temp_id = str(uuid.uuid4())
                item["id"] = temp_id
                ret_items.append({
                    "id": temp_id,
                    "title": item["name"],
                    "subtitle": item["artist_name"],
                    "type": "album"
                })
                temp_items[temp_id] = (item, set_id)
                item_set.add(temp_id)
            temp_item_sets[set_id] = (item_type, item_set)

            return jsonify(ret_items)
        return make_response(jsonify({"msg": "No such Item Type"}), 400)
    return make_response(jsonify({"msg": "Needs 'q' param in args"}), 400)

def transform_album(item_id, album):
    return {
                "id": item_id,
                "title": album["name"],
                "subtitle": album["artist_name"],
                "year": album["year"]
            }

@app.route('/item/<string:item_id>/', methods=['GET'])
def get_item(item_id):
    conn = sqlite3.connect("items.db")
    c = conn.cursor()

    if temp_item := temp_items.get(item_id):
        item, set_id = temp_item
        item_type, item_set = temp_item_sets[set_id]
        for item_id in item_set:
            del temp_items[item_id]
        del temp_item_sets[set_id]

        if item_type == "album":
            album = music_items.get_album(item["album_id"])
            values = (item["id"], "album", album["album_id"])
            c.execute("INSERT INTO items VALUES (?,?,?);", values)
            conn.commit()
            return jsonify(transform_album(item["id"], album))
        else:
            return make_response(jsonify({"msg": "No such Item Type"}), 400)
    
    c.execute("SELECT * FROM items WHERE item_id = ?", (item_id,))
    if item := c.fetchone():
        _, item_type, impl_id = item
        if item_type == "album":
            return jsonify(transform_album(item_id, music_items.get_album(impl_id)))
        else:
            return make_response(jsonify({"msg": "No such Item Type"}), 400)
    else:
        return make_response(jsonify({"msg": "Not Found"}), 404)

@app.route('/item/<string:item_id>/image', methods=['GET'])
def get_image(item_id):
    conn = sqlite3.connect("items.db")
    c = conn.cursor()
    c.execute("SELECT * FROM items WHERE item_id = ?", (item_id,))
    if item := c.fetchone():
        _, item_type, impl_id = item
        if item_type == "album":
            buf = music_items.get_album_art(impl_id)
            return send_file(io.BytesIO(buf),
                             mimetype='image/png')
        return make_response(jsonify({"msg": "No such Item Type"}), 400)
    return make_response(jsonify({"msg": "Not Found"}), 404)

@app.route('/item/<string:item_id>/thumbnail', methods=['GET'])
def get_thumbnail(item_id):
    conn = sqlite3.connect("items.db")
    c = conn.cursor()
    c.execute("SELECT * FROM items WHERE item_id = ?", (item_id,))
    if item := c.fetchone():
        _, item_type, impl_id = item
        if item_type == "album":
            buf = music_items.get_album_thumbnail(impl_id)
            return send_file(io.BytesIO(buf),
                             mimetype='image/png')
        return make_response(jsonify({"msg": "No such Item Type"}), 400)
    return make_response(jsonify({"msg": "Not Found"}), 404)


