import os
from flask import Flask, render_template, make_response, request
import json
from werkzeug.utils import secure_filename
from core.panorama import Panorama
import core.utils as utils
import time

app = Flask(__name__,
    template_folder= "templates"
)
BASE = os.path.dirname(__file__)
__SAVED_DIR__ = BASE + "/static/saved"

@app.route('/', methods=['GET', 'POST'])
@app.route('/index', methods=['GET', 'POST'])
def index():
    return render_template(
        'index.html',
    )
    


@app.route('/upload_file', methods=['GET', 'POST'])
def upload_file():
    if request.method == "POST":
        files = request.files.getlist('file')
        # print(files)
        img_dirs = []
        # remove previous session
        utils.clean_folder(__SAVED_DIR__)
        for f in files:
            img_src = os.path.join(__SAVED_DIR__, secure_filename(f.filename))
            print("Saving file " + f.filename)
            f.save(img_src)
            img_dirs.append("/static/saved/" + secure_filename(f.filename))
    resp = make_response(json.dumps(img_dirs))
    resp.status_code = 200
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp



@app.route('/stitch', methods=['GET'])
def stitch():
    if request.method == "GET":
        # get uploaded filesp
        files = sorted(utils.files_in(__SAVED_DIR__), reverse=False)
        panorama = Panorama(files)
        path = panorama.stitch()
        resp = make_response(json.dumps(path))
        resp.status_code = 200
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp

if app.config["DEBUG"]:
    @app.after_request
    def after_request(response):
        response.headers["Cache-Control"] = "no-cache, no-store, must-revalidate, public, max-age=0"
        response.headers["Expires"] = 0
        response.headers["Pragma"] = "no-cache"
        return response

app.config["CACHE_TYPE"] = "null"
app.run(debug = True)
