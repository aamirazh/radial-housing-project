from flask import Flask, render_template, redirect, url_for, jsonify, Response
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import models
import forms
import censusgeocode as cg
from geopy.geocoders import Nominatim
from geopy.distance import vincenty
import json

class mydict(dict):
        def __str__(self):
            return json.dumps(self)

app = Flask(__name__)
app.secret_key = 's3cr3t'
app.config.from_object('config')
db = SQLAlchemy(app, session_options={'autocommit': False})

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
        if conv_id not in tract_coord:
           tract_coord[conv_id] = {
                'gis_id':[row.gis_id],
                'long': row2.longitude,
                'lat': row2.latitude,
           }
        else:
            tract_coord.get(conv_id).get('gis_id').append(row.gis_id)
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
            for listElem in tract_coord.get(entry).get('gis_id'):
                distances['underFive'].append(listElem)
        elif distance <10:
            for listElem in tract_coord.get(entry).get('gis_id'):
                distances['fiveToTen'].append(listElem)
            #distances['fiveToTen'].append(tract_coord.get(entry).get('gis_id'))
        elif distance <20:
            for listElem in tract_coord.get(entry).get('gis_id'):
                distances['tenToTwenty'].append(listElem)
            #distances['tenToTwenty'].append(tract_coord.get(entry).get('gis_id'))
        else:
            for listElem in tract_coord.get(entry).get('gis_id'):
                distances['overTwenty'].append(listElem)
            #distances['overTwenty'].append(tract_coord.get(entry).get('gis_id'))

    return distances

#the data dictionary which holds aggregated results from the db
def intialize_data():
    data = {
    'empty': False,
    'race':{
    'total':0,
    'white':0,
    'black':0,
    'asian':0,
    'native_american':0,
    'pacific_islander':0,
    'mixed':0
    },
    'perCapIncome':{},
    'povertyLvl':{
    'total':0,
    'under0point5':0,
    'point5topoint99':0,
    'oneto1point24':0,
    'onepoint25to1point49':0,
    'onepoint5to1point84':0,
    'onepoint85toonepoint99':0,
    'over2':0
    },

    'publicAssistanceHouseholds':{
    'total':0,
    'with_assistance':0,
    'no_assistance':0
    },
    'citizenship':{
    'total':0,
    'native_total':0,
    'native_imputed':0,
    'native_not_imputed':0,
    'foreign_born_total':0,
    'foreign_born_imputed':0,
    'foreign_born_not_imputed':0
    },
    'transpoTime':{
    'total':0,
    'under10':0,
    '_10to14':0,
    '_15to19' :0,
    '_20to24' :0,
    '_25to29' :0,
    '_30to34' :0,
    '_35to44':0,
    '_45to59' :0,
    '_60plus' :0,
    },
    'sex':{
    'total':0,
    'male':0,
    'female':0
    },
    'household_type':{
    'total':0,
    'family_households':0,
    'nonfamily_household_total':0,
    'nonfamily_alone':0,
    'nonfamily_roommate':0
    },
    'geographic_mobility':{
    'total':0,
    'same_house':0,
    'diff_house_total':0,
    'diff_house_same_metro':0,
    'diff_house_diff_metro':0,
    'diff_house_micropolitan_area':0,
    'diff_house_other':0
    }

    }
    return data

@app.route('/')
def default():
    return("hello")

@app.route('/<distance>/<latitude>/<longitude>')
def get_data(distance, latitude, longitude):
    distances = get_blkgrps(latitude, longitude)
    #data is dictionary of dictionaries of relevant information
    data = intialize_data()
    totalIncome = 0
    idList = distances.get(distance)
    if len(idList)==0:
        data['empty'] = True
    for gis_id in idList:
        #race
        row = db.session.query(func.sum(models.race.total).label('total'), func.sum(models.race.white_alone).label('white'),\
        func.sum(models.race.black_africanamerican_alone).label('black'),\
        func.sum(models.race.americanindian_alaskanative_alone).label('native_american'),\
        func.sum(models.race.asian_alone).label('asian'),\
        func.sum(models.race.nativehawaiian_otherpacificislander_alone).label('pacific_islander'),\
        func.sum(models.race.someotherrace_alone).label('other'),\
        func.sum(models.race.two_or_more).label('mixed'))\
        .filter(models.race.gis_id==gis_id).first()

        data.get('race')['total'] += row.total
        data.get('race')['white'] += row.white
        data.get('race')['black'] += row.black
        data.get('race')['asian'] += row.asian
        data.get('race')['native_american'] += row.native_american
        data.get('race')['pacific_islander'] += row.pacific_islander
        data.get('race')['mixed'] += row.mixed
        #per capita income
        row= db.session.query(func.avg(models.PerCapitaIncome2010Dollars.per_capita_income_past_year).label('per_capita_income_past_year'))\
        .filter(models.PerCapitaIncome2010Dollars.gis_id==gis_id).first()

        if type(row.per_capita_income_past_year)!=None:
            totalIncome += row.per_capita_income_past_year

        #poverty level
        row= db.session.query(func.sum(models.income_povertylvl_ratio.total).label('total'),\
        func.sum(models.income_povertylvl_ratio.under_onehalf).label('under0point5'),\
        func.sum(models.income_povertylvl_ratio.point5_to_point99).label('point5topoint99'),\
        func.sum(models.income_povertylvl_ratio._1_to_1point24).label('oneto1point24'),\
        func.sum(models.income_povertylvl_ratio._1point25_to_1point49).label('onepoint25to1point49'),\
        func.sum(models.income_povertylvl_ratio._1point5_to_1point84).label('onepoint5to1point84'),\
        func.sum(models.income_povertylvl_ratio._1point85_to_1point99).label('onepoint85toonepoint99'),\
        func.sum(models.income_povertylvl_ratio._2andover).label('over2'))\
        .filter(models.income_povertylvl_ratio.gis_id==gis_id).first()

        data.get('povertyLvl')['total']+=row.total
        data.get('povertyLvl')['under0point5']+=row.under0point5
        data.get('povertyLvl')['point5topoint99']+=row.point5topoint99
        data.get('povertyLvl')['oneto1point24']+=row.oneto1point24
        data.get('povertyLvl')['onepoint25to1point49']+=row.onepoint25to1point49
        data.get('povertyLvl')['onepoint5to1point84']+=row.onepoint5to1point84
        data.get('povertyLvl')['onepoint85toonepoint99']+=row.onepoint85toonepoint99
        data.get('povertyLvl')['over2']+=row.over2



        #public assistance households
        row = db.session.query(func.sum(models.PublicAssistanceIncomeHouseholds.total).label('total'),\
            func.sum(models.PublicAssistanceIncomeHouseholds.with_public_assistance).label('with_assistance'),\
            func.sum(models.PublicAssistanceIncomeHouseholds.no_public_assistance).label('no_assistance'))\
            .filter(models.PublicAssistanceIncomeHouseholds.gis_id==gis_id).first()

        data.get('publicAssistanceHouseholds')['total']+=row.total
        data.get('publicAssistanceHouseholds')['with_assistance']+=row.with_assistance
        data.get('publicAssistanceHouseholds')['no_assistance']+=row.no_assistance

        #imputation citizenship status
        row = db.session.query(func.sum(models.imputation_citizen_status.total).label('total'),\
            func.sum(models.imputation_citizen_status.native).label('native_total'),\
            func.sum(models.imputation_citizen_status.native_imputed).label('native_imputed'),\
            func.sum(models.imputation_citizen_status.native_not_imputed).label('native_not_imputed'),\
            func.sum(models.imputation_citizen_status.foreign_born).label('foreign_born_total'),\
            func.sum(models.imputation_citizen_status.foreign_born_imputed).label('foreign_born_imputed'),\
            func.sum(models.imputation_citizen_status.foreign_born_not_imputed).label('foreign_born_not_imputed'))\
            .filter(models.imputation_citizen_status.gis_id==gis_id).first()

        data.get('citizenship')['total']+=row.total
        data.get('citizenship')['native_total']+=row.native_total
        data.get('citizenship')['native_imputed']+=row.native_imputed
        data.get('citizenship')['native_not_imputed']+=row.native_not_imputed
        data.get('citizenship')['foreign_born_total']+=row.foreign_born_total
        data.get('citizenship')['foreign_born_imputed']+=row.foreign_born_imputed
        data.get('citizenship')['foreign_born_not_imputed']+=row.foreign_born_not_imputed

        #travel time to work
        row = db.session.query(models.TranspoTime.total.label('total'),\
            models.TranspoTime.under10.label('under10'),\
            models.TranspoTime._10to14.label('_10to14'),\
            models.TranspoTime._15to19.label('_15to19'),\
            models.TranspoTime._20to24.label('_20to24'),\
            models.TranspoTime._25to29.label('_25to29'),\
            models.TranspoTime._30to34.label('_30to34'),\
            models.TranspoTime._35to44.label('_35to44'),\
            models.TranspoTime._45to59.label('_45to59'),\
            models.TranspoTime._60plus.label('_60plus'))\
            .filter(models.TranspoTime.gis_id==gis_id).first()

        data.get('transpoTime')['total']+=row.total
        data.get('transpoTime')['under10']+=row.under10
        data.get('transpoTime')['_10to14']+=row._10to14
        data.get('transpoTime')['_15to19']+=row._15to19
        data.get('transpoTime')['_20to24']+=row._20to24
        data.get('transpoTime')['_25to29']+=row._25to29
        data.get('transpoTime')['_30to34']+=row._30to34
        data.get('transpoTime')['_35to44']+=row._35to44
        data.get('transpoTime')['_45to59']+=row._45to59
        data.get('transpoTime')['_60plus']+=row._60plus

        #sex
        row = db.session.query(models.sex_by_age.total.label('total'),\
            models.sex_by_age.male.label('male'),\
            models.sex_by_age.female.label('female'))\
            .filter(models.sex_by_age.gis_id==gis_id).first()

        data.get('sex')['total']+=row.total
        data.get('sex')['male']+=row.male
        data.get('sex')['female']+=row.female

        #household type
        row = db.session.query(models.household_type.total.label('total'),\
            models.household_type.family_households.label('family_households'),\
            models.household_type.nonfamily_households.label('nonfamily_household_total'),\
            models.household_type.nonfamily_households_livingalone.label('nonfamily_alone'),\
            models.household_type.nonfamily_households_notlivingalone.label('nonfamily_roommate'))\
            .filter(models.household_type.gis_id==gis_id).first()

        data.get('household_type')['total']+=row.total
        data.get('household_type')['family_households']+=row.family_households
        data.get('household_type')['nonfamily_household_total']+=row.nonfamily_household_total
        data.get('household_type')['nonfamily_alone']+=row.nonfamily_alone
        data.get('household_type')['nonfamily_roommate']+=row.nonfamily_roommate

        #geographic mobility in last year
        row = db.session.query(models.geographical_mobility_in_last_year.total.label('total'),\
            models.geographical_mobility_in_last_year.same_house.label('same_house'),\
            models.geographical_mobility_in_last_year.diff_house.label('diff_house_total'),\
            models.geographical_mobility_in_last_year.diff_house_same_metro.label('diff_house_same_metro'),\
            models.geographical_mobility_in_last_year.diff_house_diff_metro.label('diff_house_diff_metro'),\
            models.geographical_mobility_in_last_year.diff_house_micropolitan_area.label('diff_house_micropolitan_area'),\
            models.geographical_mobility_in_last_year.diff_house_not_metro_or_micro.label('diff_house_other'))\
        .filter(models.geographical_mobility_in_last_year.gis_id==gis_id).first()

        data.get('geographic_mobility')['total']+=row.total
        data.get('geographic_mobility')['same_house']+=row.same_house
        data.get('geographic_mobility')['diff_house_total']+=row.diff_house_total
        data.get('geographic_mobility')['diff_house_same_metro']+=row.diff_house_same_metro
        data.get('geographic_mobility')['diff_house_diff_metro']+=row.diff_house_diff_metro
        data.get('geographic_mobility')['diff_house_micropolitan_area']+=row.diff_house_micropolitan_area
        data.get('geographic_mobility')['diff_house_other']+=row.diff_house_other

    if len(idList!=0):
        data.get('perCapIncome')['per_capita_income_past_year'] = int(totalIncome/len(idList))

   # dataString = Response(json.dumps(data))+'"'#, mimetype='application/json'))
    data2 = mydict(data)
    return 'apiCallback('+str(data2)+');'

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
