from flask import Flask, render_template, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
import models
import forms

app = Flask(__name__)
app.secret_key = 's3cr3t'
app.config.from_object('config')
db = SQLAlchemy(app, session_options={'autocommit': False})


@app.route('/')
def get_ids():
    ids = {}
    row = db.session.query(models.AgeLanguageEnglish).first()
    ids[row.gis_id]={
        'gis_id' : row.gis_id,
        'region_code' : row.region_code
    }
    print(row.gis_id)
    return jsonify(ids)



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
