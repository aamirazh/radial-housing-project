# Mapping Inequality

Our project allows for the interactive exploration and visualization of demographic data of American cities. Select a city of interest to reveal its statistical makeup. 

![overview](https://github.com/kupoko/radial-housing-project/blob/master/images/overview.JPG)

![charts](https://github.com/kupoko/radial-housing-project/blob/master/images/charts.JPG)

![raw_data](https://github.com/kupoko/radial-housing-project/blob/master/images/rawdata.JPG)

## To set up the database in PostgreSQL:
Make sure the 13 CSV files from census_data_files.zip in the  are in the same directory as create.sql, load.sql, and setup.sh in housingdb. In the VM, run setup.sh. 

## Site/API:
Install Flask and SQLAlchemy as described on the course site. Then, install CensusGeocode (https://pypi.python.org/pypi/censusgeocode) and geopy (https://pypi.python.org/pypi/geopy). 

From the FlaskAPI directory, run app.py. 
To launch the webpage, open index.html (from the "html" folder) in a browser. 
