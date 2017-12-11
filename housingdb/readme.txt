
The two .csv files in the google drive that start with "nhgis" are the ones with all of the original data. The data for each of the 12 tables has been split into its own .csv file which you should download. They all start with the same 8 columns that are area identifiers/IDs for each blockgroup.

Update: there's now a 13th csv called "tract_data"

Download create.sql, load.sql, setup.sh, to the same directory as the csv files and then run setup.sh in the class VM to create the database. 

Some of the column names are really obnoxious, but the two .txt files in the github folder have schema for the tables in case anything is unclear. 
