import sqlite3
import os
import sys
import requests
import musicbrainzngs as mbz
from musicbrainzngs.musicbrainz import ResponseError as MbzError
#import pylast

class Music:
    def __init__(self, path):
        self.path = path
        #self.API_KEY = os.environ.get("LASTFM_API_KEY")
        #self.API_SECRET = os.environ.get("LASTFM_API_SECRET")

        #if not self.API_KEY or not self.API_SECRET:
        #    print("Missing Key or Secret", file=sys.stderr)

        mbz.set_useragent("Durhack 2020", "0.0.1", "https://github.com/jgbyrne")

        if not os.path.exists("{}/music.db".format(self.path)):
            self.create_db()

    def create_db(self):
        conn = sqlite3.connect("{}/music.db".format(self.path))
        conn.execute("CREATE TABLE albums (album_id TEXT PRIMARY KEY, name TEXT, year INTEGER, artist_id TEXT, artist_name TEXT)")

    def search(self, album_name):
        resp = mbz.search_release_groups(album_name)
        if rgl := resp.get("release-group-list"):
            resp = []
            for result in rgl:
                resp.append({"album_id": result["id"], "name": result["title"],
                             "artist_name": result["artist-credit"][0]["artist"]["name"]})
            return resp
        else:
            return None

    def get_album(self, album_id):
        conn = sqlite3.connect("{}/music.db".format(self.path))
        c = conn.cursor()
        c.execute("SELECT * FROM albums WHERE album_id=?", (album_id,))

        if album := c.fetchone():
            return {"album_id": album[0], "name": album[1], "year": album[2],
                    "artist_id": album[3], "artist_name": album[4], "type": "Album"}

        try:
           album_info = mbz.get_release_group_by_id(album_id,
                                                    includes=["artists"])["release-group"]
        except MbzError as e:
            print("MusicBrainz Error: {}".format(e), file=sys.stderr)
            return None

        name = album_info.get("title")
        year = album_info.get("first-release-date")

        if None in (name, year):
            return None

        year = int(year.split("-")[0])

        artist = album_info.get("artist-credit")
        if artist is None:
            return None
        artist = artist[0]["artist"]
        
        artist_id = artist.get("id")
        artist_name = artist.get("name")

        if None in (artist_id, artist_name):
            return None

        values = (album_id, name, year, artist_id, artist_name)
        c.execute("INSERT INTO albums VALUES (?,?,?,?,?);", values)
        conn.commit()

        return {"album_id": album_id, "name": name, "year": year,
                "artist_id": artist_id, "artist_name": artist_name, "type": "Album"}

    def _download_art(self, album_id):
        resp = requests.get("http://coverartarchive.org/release-group/{}".format(album_id))
        if resp.status_code != 200:
            return False

        if data := resp.json():
            if images := data.get("images")[0]:
                if thumbs := images.get("thumbnails"):
                    urls = (thumbs.get("small"), thumbs.get("large"))
                    if all(urls):
                        small, large = urls
                        s_resp = requests.get(small)
                        path = "{}/art/{}.small.png".format(self.path, album_id)
                        with open(path, 'wb') as outf:
                            outf.write(s_resp.content)
                        del s_resp

                        l_resp = requests.get(large)
                        path = "{}/art/{}.large.png".format(self.path, album_id)
                        with open(path, 'wb') as outf:
                            outf.write(l_resp.content)
                        del l_resp
                        return True
                    return False
        else:
            return False
            

    def get_album_art(self, album_id):
        path = "{}/art/{}.large.png".format(self.path, album_id)
        if not os.path.exists(path):
            if not self._download_art(album_id):
                return None

        with open(path, 'rb') as inf:
            return inf.read()

    def get_album_thumbnail(self, album_id):
        path = "{}/art/{}.small.png".format(self.path, album_id)
        if not os.path.exists(path):
            if not self._download_art(album_id):
                return None

        with open(path, 'rb') as inf:
            return inf.read()

if __name__ == "__main__":
    music = Music(".")
    print(music.get_album_from_search_result(music.search("Filosofem")[0]))

