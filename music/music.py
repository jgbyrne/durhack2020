import sqlite3
import os
import sys
import requests
import musicbrainzngs as mbz
from musicbrainzngs.musicbrainz import ResponseError as MbzError

class Music:
    def __init__(self):
        self.conn = sqlite3.connect("music.db")
        self.API_KEY = os.environ.get("LASTFM_API_KEY")
        self.API_SECRET = os.environ.get("LASTFM_API_SECRET")

        if not self.API_KEY or not self.API_SECRET:
            print("Missing Key or Secret", file=sys.stderr)

        mbz.set_useragent("Durhack 2020", "0.0.1", "https://github.com/jgbyrne")

    def create_db(self):
        self.conn.execute("CREATE TABLE albums (album_id TEXT PRIMARY KEY, name TEXT, year INTEGER, artist_id TEXT, artist_name TEXT)")

    def search(self):
        pass

    def get_album(self, album_id):
        c = self.conn.cursor()
        c.execute("SELECT * FROM albums WHERE album_id=?", (album_id,))

        if album := c.fetchone():
            return {"album_id": album[0], "name": album[1], "year": album[2],
                    "artist_id": album[3], "artist_name": album[4]}

        try:
           album_info = mbz.get_release_group_by_id(album_id,
                                                    includes=["artists"])["release-group"]
        except MbzError:
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
        self.conn.commit()

        return {"album_id": album_id, "name": name, "year": year,
                "artist_id": artist_id, "artist_name": artist_name}


if __name__ == "__main__":
    music = Music()
    print(music.get_album("6e335887-60ba-38f0-95af-fae7774336bf"))

