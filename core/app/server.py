from os import path
from flask import Flask, render_template, make_response, request
import json
from werkzeug.utils import secure_filename

import time

app = Flask(__name__,
    template_folder= "templates"
)
BASE = path.dirname(__file__)
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
        print('xxxxxxxxx')
        files = request.files.getlist('file')
        # print(files)
        img_dirs = []
        for f in files:
            img_src = path.join(__SAVED_DIR__, secure_filename(f.filename))
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
        time.sleep(3)
        # sdnfkjhsdkjfnsdlkf
        print('Stitching......')
        resp = make_response(json.dumps("/static/saved/Screen Shot 2019-07-21 at 3.58.56 PM.png"))
        resp.status_code = 200
        resp.headers['Access-Control-Allow-Origin'] = '*'
        return resp


app.run(debug = True)


