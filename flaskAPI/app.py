from flask import Flask, render_template, redirect, url_for, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import models
import forms
import censusgeocode as cg
from geopy.geocoders import Nominatim
from geopy.distance import vincenty



def get_blkgrps(latitude, longitude):
    result = cg.coordinates(x=longitude, y=latitude)
    county = result.get("Counties")[0].get("NAME")
    state = result.get("States")[0].get("NAME")
    ids = {}
    rows = db.session.query(models.race)\
    .filter(models.race.state==state, models.race.county==county).all()
    for row in rows:
        #gis_id = row.gis_id
        #tract_id = row.tract[-6:-1]
        ids[row.gis_id]={        
           'gis_id' : row.gis_id,
           'tract_id': row.census_tract,
           'county_code': row.county_code,
           'state_id':row.state_code
        }
    return ids

app = Flask(__name__)
app.secret_key = 's3cr3t'
app.config.from_object('config')
db = SQLAlchemy(app, session_options={'autocommit': False})

@app.route('/')
def default():
    return("hello")

@app.route('/coord-blkgrp/<latitude>/<longitude>')
def get_blkgrps(latitude, longitude):
    result = cg.coordinates(x=longitude, y=latitude)
    county = result.get("Counties")[0].get("NAME")
    state = result.get("States")[0].get("NAME")
    gisid = set()
    tract_coord = {}
    rows = db.session.query(models.race.gis_id)\
    .filter(models.race.state==state, models.race.county==county).all()
    for row in rows:
       conv_id = row.gis_id[1:3]+row.gis_id[4:7]+ row.gis_id[8:14]
       gisid.add(conv_id),
       row2 = db.session.query(models.tract_data)\
       .filter(models.tract_data.geoid==conv_id).first()
       tract_coord[conv_id] = {
            'gis_id':row.gis_id,
            'long': row2.longitude,
            'lat': row2.latitude,
       }
    distances = {
    'underFive' : [],
    'fiveToTen' : [],
    'tenToTwenty': [],
    'overTwenty':[]
    }
    for entry in tract_coord.keys():
        #distance = get_distance(float(latitude), float(longitude), tract_coord.get(entry).get('lat'), float(tract_coord.get(entry).get('long')))
        point1 = (float(latitude), float(longitude))
        point2 = (tract_coord.get(entry).get('lat'), float(tract_coord.get(entry).get('long')))
        distance = vincenty(point1, point2).miles
        if distance<5:
            distances['underFive'].append(tract_coord.get(entry).get('gis_id'))
        elif distance <10:
            distances['fiveToTen'].append(tract_coord.get(entry).get('gis_id'))
        elif distance <20:
            distances['tenToTwenty'].append(tract_coord.get(entry).get('gis_id'))
        else:
            distances['overTwenty'].append(tract_coord.get(entry).get('gis_id'))
    
    return jsonify(distances)

@app.route('/race/<state>/<county>')
def get_race_info(state, county):
    row= db.session.query(func.sum(models.race.total).label('total'), func.sum(models.race.white_alone).label('white'),\
        func.sum(models.race.black_africanamerican_alone).label('black'),\
        func.sum(models.race.americanindian_alaskanative_alone).label('native_american'),\
        func.sum(models.race.asian_alone).label('asian'),\
        func.sum(models.race.nativehawaiian_otherpacificislander_alone).label('pacific_islander'),\
        func.sum(models.race.someotherrace_alone).label('other'),\
        func.sum(models.race.two_or_more).label('mixed'))\
    .filter(models.race.state==state, models.race.county==county).first()


    race_results={
        'total' : row.total,
        'white' : row.white,
        'black' : row.black,
        'asian' : row.asian,
        'native_american':row.native_american,
        'pacific_islander':row.pacific_islander,
        'mixed':row.mixed

    }
    return jsonify(race_results)

@app.route('/poverty/<state>/<county>')
def get_poverty_info(state, county):
    row= db.session.query(func.sum(models.income_povertylvl_ratio.total).label('total'),\
        func.sum(models.income_povertylvl_ratio.under_onehalf).label('under0point5'),\
        func.sum(models.income_povertylvl_ratio.point5_to_point99).label('point5topoint99'),\
        func.sum(models.income_povertylvl_ratio._1_to_1point24).label('oneto1point24'),\
        func.sum(models.income_povertylvl_ratio._1point25_to_1point49).label('onepoint25to1point49'),\
        func.sum(models.income_povertylvl_ratio._1point5_to_1point84).label('onepoint5to1point84'),\
        func.sum(models.income_povertylvl_ratio._1point85_to_1point99).label('onepoint85toonepoint99'),\
        func.sum(models.income_povertylvl_ratio._2andover).label('over2'))\
    .filter(models.income_povertylvl_ratio.state==state, models.income_povertylvl_ratio.county==county).first()

    poverty_results={
    'total' : row.total,
    'under0.5' :row.under0point5,
    '0.5_0.99' : row.point5topoint99,
    '1_1.24' : row.oneto1point24,
    '1.25_1.49':row.onepoint25to1point49,
    '1.5_1.84':row.onepoint5to1point84,
    '1.85_1.99':row.onepoint85toonepoint99,
    'over2' : row.over2

    }
    return jsonify(poverty_results)

@app.route('/PerCapIncome/<state>/<county>')
def get_avgincome(state, county):
    row= db.session.query(func.avg(models.PerCapitaIncome2010Dollars.per_capita_income_past_year).label('per_capita_income_past_year'))\
    .filter(models.PerCapitaIncome2010Dollars.state==state, models.PerCapitaIncome2010Dollars.county==county).first()
    
    #row = db.session.query(models.race).first()
    ids={
        
        'per_capita_income_past_year' : float(row.per_capita_income_past_year)
    }
    return jsonify(ids)

@app.route('/coord-race/<latitude>/<longitude>')
def get_ids(latitude, longitude):
    result = cg.coordinates(x=longitude, y=latitude)
    county = result.get("Counties")[0].get("NAME")
    state = result.get("States")[0].get("NAME")
    row= db.session.query(func.sum(models.race.total).label('total'), func.sum(models.race.white_alone).label('white'),\
        func.sum(models.race.black_africanamerican_alone).label('black'))\
    .filter(models.race.state==state, models.race.county==county).first()
 
    #row = db.session.query(models.race).first()
    ids={
        
        'total' : row.total,
        'white' : row.white,
        'black' : row.black
    }
    return  jsonify(ids)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
