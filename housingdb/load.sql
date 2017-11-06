\COPY sex_by_age FROM 'sex_by_age.csv' WITH DELIMITER ',' NULL '' CSV
\COPY household_type FROM 'household_type.csv' WITH DELIMITER ',' NULL '' CSV
\COPY race FROM 'race.csv' WITH DELIMITER ',' NULL '' CSV
\COPY geographical_mobility_in_last_year FROM 'geographical_mobility_in_last_year.csv' WITH DELIMITER ',' NULL '' CSV
\COPY transpo_travel_time_to_work FROM 'transpo_travel_time_to_work.csv' WITH DELIMITER ',' NULL '' CSV header encoding 'windows-1251'
\COPY sex_by_edu_attainment_25plus FROM 'sex_by_edu_attainment_25plus.csv' WITH DELIMITER ',' NULL '' CSV
\COPY age_by_language_by_english_ability FROM 'age_by_language_by_english_ability.csv' WITH DELIMITER ',' NULL '' CSV
\COPY income_povertylvl_ratio FROM 'income_povertylvl_ratio.csv' WITH DELIMITER ',' NULL '' CSV
\COPY public_assistance_income_households FROM 'public_assistance_income_households.csv' WITH DELIMITER ',' NULL '' CSV
\COPY per_capita_income_2010dollars FROM 'per_capita_income_2010dollars.csv' WITH DELIMITER ',' NULL '' CSV
\COPY sex_by_workstatus_by_hoursperweek_by_weeksperyear FROM 'sex_by_workstatus_by_hoursperweek_by_weeksperyear.csv' WITH DELIMITER ',' NULL '' CSV
\COPY imputation_citizen_status FROM 'imputation_citizen_status.csv' WITH DELIMITER ',' NULL '' CSV