import sqlite3
import os
import sys

from youtube_api import YouTubeDataAPI

class YouTube:
    def __init__(self, path):
        self.API_KEY = os.environ.get("YOUTUBE_API_KEY")
        self.path = path
        #if not os.path.exists("{}/youtube.db".format(self.path)):
        #    self.create_db()

    def create_db(self):
        conn = sqlite3.connect("{}/youtube.db".format(self.path))
        conn.execute("CREATE TABLE videos (video_id TEXT PRIMARY KEY, title TEXT, channel TEXT)")

    def _transform_video(self, video):
        return {
            "video_id": video["video_id"],
            "title": video["video_title"],
            "subtitle": video["channel_title"],
            "thumbnail": video["video_thumbnail"],
            "image": video["video_thumbnail"],
            "type": "YouTube",
        }

    def get_video(self, video_id):
        #conn = sqlite3.connect("{}/youtube.db".format(self.path))
        yt = YouTubeDataAPI(self.API_KEY)
        results = yt.search(q=video_id, max_results=1)
        if results:
            return self._transform_video(results[0])
        else:
            return None

    def search(self, query):
        yt = YouTubeDataAPI(self.API_KEY)
        results = yt.search(q=query, max_results=10)
        if results:
            return [self._transform_video(v) for v in results] 
        else:
            return None

if __name__ == "__main__":
    yt = YouTube("./")
    print(yt.thumbnail("wpIl7KhQadA"))
