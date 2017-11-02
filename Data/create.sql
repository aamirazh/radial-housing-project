CREATE TABLE Durham_Household_Income(id VARCHAR(30) NOT NULL PRIMARY KEY,
                 id2 VARCHAR(30),
                 geography VARCHAR(100),
                 income VARCHAR(15));
CREATE TABLE Durham_Race(id VARCHAR(30) NOT NULL PRIMARY KEY,
                  id2 VARCHAR(20),
                  geography VARCHAR(100),
                  total VARCHAR(10),
                  white VARCHAR(10),
                  black_or_african_american VARCHAR(10),
                  american_indian_or_alaska_native VARCHAR(10),
                  asian VARCHAR(10),
                  native_hawaiian_and_other_pacific_islander VARCHAR(10),
                  other VARCHAR(10),
                  two_or_more VARCHAR(10),
                  two_or_more_including_some_other VARCHAR(10),
                  two_or_more_including_some_other_and_three_or_more VARCHAR(10));

