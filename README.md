# Mapping Inequality

![overview](/images/overview.jpg)

![charts](/images/charts.jpg)

![raw_data](/images/rawdata.jpg)

To set up the database in PostgreSQL:
Make sure the 13 CSV files are in the same directory as create.sql, load.sql, and setup.sh. In the VM, run setup.sh. 

Site/API:
Install Flask and SQLAlchemy as described on the course site. Then, install CensusGeocode (https://pypi.python.org/pypi/censusgeocode) and geopy (https://pypi.python.org/pypi/geopy). 

From the FlaskAPI directory, run app.py. 
To launch the webpage, open index.html (from the "html" folder) in a browser. 
