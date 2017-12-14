<<<<<<< HEAD
    console.log("Going to call getJSON");
    //var dataJson;
        $.ajax({
            url:"http://localhost:5000/underFive/35.8032/-78.5661",
            crossDomain:true,
            type: 'get',
            dataType: "jsonp",
            jsonpCallback: 'apiCallback',
            success: function(json) {
                console.log("worked");
                console.log(json);
                //dataJson = json;
                // for (var key in json){
                //     for (var key2 in json[key]){
                //         console.log(key2 + ": "+ json[key][key2]);
                //     }
                // }
                console.log("----RACE----")
                var race={};
                for (var key in json["race"]){
                    console.log("race - " + key +": "+ json["race"][key]);
                    race[key]=json["race"][key];
                    //console.log("LOOK: "+race["total"]);
                }
                console.log();
                console.log("----Per-Capita-Income----")
                var perCapIncome={};
                for (var key in json["perCapIncome"]){
                    console.log(key +": "+ json["perCapIncome"][key]);
                    perCapIncome[key]=json["perCapIncome"][key];
                }
                console.log();
                console.log("----Households Receiving Public Assistance----");
                var publicAssistanceHouseholds={};
                for (var key in json["publicAssistanceHouseholds"]){
                    console.log("publicAssistanceHouseholds - " + key +": "+ json["publicAssistanceHouseholds"][key]);
                    publicAssistanceHouseholds[key]=json["publicAssistanceHouseholds"][key];
                }
                console.log();
                console.log("----Citizenship Status----");
                var citizenship={};
                for (var key in json["citizenship"]){
                    console.log(key +": "+ json["citizenship"][key]);
                    citizenship[key]=json["citizenship"][key];
                }
                console.log();
                console.log("----Travel Time to Work----");
                var transpoTime={};
                for (var key in json["transpoTime"]){
                    console.log(key +": "+ json["transpoTime"][key]);
                    transpoTime[key]=json["transpoTime"][key];
                }
                console.log();
                console.log("----Sex----");
                var sex={};
                for (var key in json["sex"]){
                    console.log(key +": "+ json["sex"][key]);
                    sex[key]=json["sex"][key];
                }
                console.log();
                console.log("----Household Type----");
                var household_type = {};
                for (var key in json["household_type"]){
                    console.log(key +": "+ json["household_type"][key]);
                    household_type[key]=json["household_type"][key];
                }
                console.log();
                console.log("----Geographic Mobility in Past Year----");
                var geographic_mobility={};
                for (var key in json["geographic_mobility"]){
                    console.log(key +": "+ json["geographic_mobility"][key]);
                    geographic_mobility[key]=json["geographic_mobility"][key];
                }

            },
            error : function(e) {
                console.log("error..");
                console.log(e);
            }
    }
    )
    //console.log(dataJson);
    console.log("Successfully called.");
=======
function parseData(lat, long){
        console.log("Going to call getJSON");
        
        //var dataJson;
            $.ajax({
                url:"http://localhost:5000/underFive/"+lat+"/"+long,
                crossDomain:true,
                type: 'get',
                dataType: "jsonp",
                async: true,
                jsonpCallback: 'apiCallback',
                success: function(json) {
                    var section = document.getElementById('pieChart');
                    console.log("worked");
                    console.log(json);
                    //dataJson = json;
                    // for (var key in json){
                    //     for (var key2 in json[key]){
                    //         console.log(key2 + ": "+ json[key][key2]);
                    //     }
                    // }
                    console.log("----RACE----")
                    var race={};
                    for (var key in json["race"]){
                        console.log("race - " + key +": "+ json["race"][key]);
                        race[key]=json["race"][key];
                        //console.log("LOOK: "+race["total"]);
                    }
                    console.log();
                    console.log("----Per-Capita-Income----");
                    var perCapIncome={};
                    for (var key in json["perCapIncome"]){
                        console.log(key +": "+ json["perCapIncome"][key]);
                        perCapIncome[key]=json["perCapIncome"][key];
                    }
                    console.log();
                    console.log("----Poverty Level----");
                    var povertyLvl={};
                    for (var key in json["povertyLvl"]){
                        console.log(key +": "+ json["povertyLvl"][key]);
                       povertyLvl[key]=json["povertyLvl"][key];
                    }
                    console.log();
                    console.log("----Households Receiving Public Assistance----");
                    var publicAssistanceHouseholds={};
                    for (var key in json["publicAssistanceHouseholds"]){
                        console.log("publicAssistanceHouseholds - " + key +": "+ json["publicAssistanceHouseholds"][key]);
                        publicAssistanceHouseholds[key]=json["publicAssistanceHouseholds"][key];
                    }
                    console.log();
                    console.log("----Citizenship Status----");
                    var citizenship={};
                    for (var key in json["citizenship"]){
                        console.log(key +": "+ json["citizenship"][key]);
                        citizenship[key]=json["citizenship"][key];
                    }
                    console.log();
                    console.log("----Travel Time to Work----");
                    var transpoTime={};
                    for (var key in json["transpoTime"]){
                        console.log(key +": "+ json["transpoTime"][key]);
                        transpoTime[key]=json["transpoTime"][key];
                    }
                    console.log();
                    console.log("----Sex----");
                    var sex={};
                    for (var key in json["sex"]){
                        console.log(key +": "+ json["sex"][key]);
                        sex[key]=json["sex"][key];
                    }
                    console.log();
                    console.log("----Household Type----");
                    var household_type = {};
                    for (var key in json["household_type"]){
                        console.log(key +": "+ json["household_type"][key]);
                        household_type[key]=json["household_type"][key];
                    }
                    console.log();
                    console.log("----Geographic Mobility in Past Year----");
                    var geographic_mobility={};
                    for (var key in json["geographic_mobility"]){
                        console.log(key +": "+ json["geographic_mobility"][key]);
                        geographic_mobility[key]=json["geographic_mobility"][key];
                    }
                    var racePie = new d3pie("pieChart", {
                        "header": {
                            "title": {
                                "text": "Racial Demographics",
                                "fontSize": 24,
                                "font": "open sans"
                            },
                            "subtitle": {
                                "text": "Racial representation miles away from the city center",
                                "color": "#999999",
                                "fontSize": 12,
                                "font": "open sans"
                            },
                            "titleSubtitlePadding": 9
                        },
                        "footer": {
                            "color": "#999999",
                            "fontSize": 10,
                            "font": "open sans",
                            "location": "bottom-left"
                        },
                        "size": {
                            "canvasWidth": 590,
                            "pieOuterRadius": "90%"
                        },
                        "data": {
                            "sortOrder": "value-desc",
                            "content": [
                                {
                                    "label": "White",
                                    "value": race["white"],
                                    "color": "#2383c1"
                                },
                                {
                                    "label": "Black",
                                    "value": race["black"],
                                    "color": "#64a61f"
                                },
                                {
                                    "label": "Asian",
                                    "value": race["asian"],
                                    "color": "#7b6788"
                                },
                                {
                                    "label": "Native American",
                                    "value": race["native_american"],
                                    "color": "#a05c56"
                                },
                                {
                                    "label": "Pacific Islander",
                                    "value": race["pacific_islander"],
                                    "color": "#961919"
                                },
                                {
                                    "label": "Mixed",
                                    "value": race["mixed"],
                                    "color": "#d8d239"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 32
                            },
                            "inner": {
                                "hideWhenLessThanPercentage": 3
                            },
                            "mainLabel": {
                                "fontSize": 11
                            },
                            "percentage": {
                                "color": "#ffffff",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#adadad",
                                "fontSize": 11
                            },
                            "lines": {
                                "enabled": true
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        },
                        "misc": {
                            "gradient": {
                                "enabled": true,
                                "percentage": 100
                            }
                        }
                    });
                    $("#pieChart").append(racePie);

                    var povertyPie = new d3pie("pieChart", {
                        "header": {
                            "title": {
                                "text": "Poverty Level Distribution",
                                "fontSize": 24,
                                "font": "open sans"
                            },
                            "subtitle": {
                                "text": "The distribution of the population in relation to how close they are to the poverty level",
                                "color": "#999999",
                                "fontSize": 12,
                                "font": "open sans"
                            },
                            "titleSubtitlePadding": 9
                        },
                        "footer": {
                            "color": "#999999",
                            "fontSize": 10,
                            "font": "open sans",
                            "location": "bottom-left"
                        },
                        "size": {
                            "canvasWidth": 590,
                            "pieOuterRadius": "90%"
                        },
                        "data": {
                            "sortOrder": "value-desc",
                            "content": [
                                {
                                    "label": "Under 0.5",
                                    "value": povertyLvl["under0point5"],
                                    "color": "#2383c1"
                                },
                                {
                                    "label": "0.5-0.99",
                                    "value": povertyLvl["point5topoint99"],
                                    "color": "#64a61f"
                                },
                                {
                                    "label": "1-1.24",
                                    "value": povertyLvl["oneto1point24"],
                                    "color": "#7b6788"
                                },
                                {
                                    "label": "1.25-1.49",
                                    "value": povertyLvl["onepoint25to1point49"],
                                    "color": "#a05c56"
                                },
                                {
                                    "label": "1.5-1.84",
                                    "value": povertyLvl["onepoint5to1point84"],
                                    "color": "#961919"
                                },
                                {
                                    "label": "1.85-1.99",
                                    "value": povertyLvl["onepoint85toonepoint99"],
                                    "color": "#d8d239"
                                },
                                {
                                    "label": "Over 2",
                                    "value": povertyLvl["over2"],
                                    "color": "#e98125"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 32
                            },
                            "inner": {
                                "hideWhenLessThanPercentage": 3
                            },
                            "mainLabel": {
                                "fontSize": 11
                            },
                            "percentage": {
                                "color": "#ffffff",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#adadad",
                                "fontSize": 11
                            },
                            "lines": {
                                "enabled": true
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        },
                        "misc": {
                            "gradient": {
                                "enabled": true,
                                "percentage": 100
                            }
                        }
                    });
                    // var povertyEl = document.createElement('povertyEl');
                    // povertyEl.appendChild(povertyPie);
                    $("#pieChart").append(povertyPie);

                    var assistancePie = new d3pie("pieChart", {
                        "header": {
                            "title": {
                                "text": "Public Assistance Households",
                                "fontSize": 24,
                                "font": "open sans"
                            },
                            "subtitle": {
                                "text": "What percentage of households are on public assistance",
                                "color": "#999999",
                                "fontSize": 12,
                                "font": "open sans"
                            },
                            "titleSubtitlePadding": 9
                        },
                        "footer": {
                            "color": "#999999",
                            "fontSize": 10,
                            "font": "open sans",
                            "location": "bottom-left"
                        },
                        "size": {
                            "canvasWidth": 590,
                            "pieOuterRadius": "90%"
                        },
                        "data": {
                            "sortOrder": "value-desc",
                            "content": [
                                {
                                    "label": "With Assistance",
                                    "value": publicAssistanceHouseholds["with_assistance"],
                                    "color": "#2383c1"
                                },
                                {
                                    "label": "Without Assistance",
                                    "value": publicAssistanceHouseholds["no_assistance"],
                                    "color": "#64a61f"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 32
                            },
                            "inner": {
                                "hideWhenLessThanPercentage": 3
                            },
                            "mainLabel": {
                                "fontSize": 11
                            },
                            "percentage": {
                                "color": "#ffffff",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#adadad",
                                "fontSize": 11
                            },
                            "lines": {
                                "enabled": true
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        },
                        "misc": {
                            "gradient": {
                                "enabled": true,
                                "percentage": 100
                            }
                        }
                    });
                    $("#pieChart").append(assistancePie);

                    var citizenshipPie = new d3pie("pieChart", {
                        "header": {
                            "title": {
                                "text": "Citizenship",
                                "fontSize": 24,
                                "font": "open sans"
                            },
                            "subtitle": {
                                "text": "The distribution of citizenship status among this population",
                                "color": "#999999",
                                "fontSize": 12,
                                "font": "open sans"
                            },
                            "titleSubtitlePadding": 9
                        },
                        "footer": {
                            "color": "#999999",
                            "fontSize": 10,
                            "font": "open sans",
                            "location": "bottom-left"
                        },
                        "size": {
                            "canvasWidth": 590,
                            "pieOuterRadius": "90%"
                        },
                        "data": {
                            "sortOrder": "value-desc",
                            "content": [
                                {
                                    "label": "Native ",
                                    "value": citizenship["native_total"],
                                    "color": "#2383c1"
                                },
                                {
                                    "label": "Non-Native",
                                    "value": citizenship["foreign_born_total"],
                                    "color": "#64a61f"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 32
                            },
                            "inner": {
                                "hideWhenLessThanPercentage": 3
                            },
                            "mainLabel": {
                                "fontSize": 11
                            },
                            "percentage": {
                                "color": "#ffffff",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#adadad",
                                "fontSize": 11
                            },
                            "lines": {
                                "enabled": true
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        },
                        "misc": {
                            "gradient": {
                                "enabled": true,
                                "percentage": 100
                            }
                        }
                    });
                    $("#pieChart").append(citizenshipPie);

                    var transportationPie = new d3pie("pieChart", {
                        "header": {
                            "title": {
                                "text": "Transportation Time to Work",
                                "fontSize": 24,
                                "font": "open sans"
                            },
                            "subtitle": {
                                "text": "The distribution of transit time among the working population",
                                "color": "#999999",
                                "fontSize": 12,
                                "font": "open sans"
                            },
                            "titleSubtitlePadding": 9
                        },
                        "footer": {
                            "color": "#999999",
                            "fontSize": 10,
                            "font": "open sans",
                            "location": "bottom-left"
                        },
                        "size": {
                            "canvasWidth": 590,
                            "pieOuterRadius": "90%"
                        },
                        "data": {
                            "sortOrder": "value-desc",
                            "content": [
                                {
                                    "label": "Under 10 Minutes",
                                    "value": transpoTime["under10"],
                                    "color": "#2383c1"
                                },
                                {
                                    "label": "10-14 Minutes",
                                    "value": transpoTime["_10to14"],
                                    "color": "#64a61f"
                                },
                                {
                                    "label": "15-19 Minutes",
                                    "value": transpoTime["_15to19"],
                                    "color": "#7b6788"
                                },
                                {
                                    "label": "20-24 Minutes",
                                    "value": transpoTime["_20to24"],
                                    "color": "#a05c56"
                                },
                                {
                                    "label": "25-29 Minutes",
                                    "value": transpoTime["_25to29"],
                                    "color": "#961919"
                                },
                                {
                                    "label": "30-34 Minutes",
                                    "value": transpoTime["_30to34"],
                                    "color": "#d8d239"
                                },
                                {
                                    "label": "35-44 Minutes",
                                    "value": transpoTime["_35to44"],
                                    "color": "#e98125"
                                },
                                {
                                    "label": "45-59 Minutes",
                                    "value": transpoTime["_45to49"],
                                    "color": "#d0743c"
                                },
                                {
                                    "label": "60+ Minutes",
                                    "value": transpoTime["_60plus"],
                                    "color": "#635122"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 32
                            },
                            "inner": {
                                "hideWhenLessThanPercentage": 3
                            },
                            "mainLabel": {
                                "fontSize": 11
                            },
                            "percentage": {
                                "color": "#ffffff",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#adadad",
                                "fontSize": 11
                            },
                            "lines": {
                                "enabled": true
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        },
                        "misc": {
                            "gradient": {
                                "enabled": true,
                                "percentage": 100
                            }
                        }
                    });
                    
                    $("#pieChart").append(transportationPie);

                    var sexPie = new d3pie("pieChart", {
                        "header": {
                            "title": {
                                "text": "Sex",
                                "fontSize": 24,
                                "font": "open sans"
                            },
                            "subtitle": {
                                "text": "Percentage of male and female residents",
                                "color": "#999999",
                                "fontSize": 12,
                                "font": "open sans"
                            },
                            "titleSubtitlePadding": 9
                        },
                        "footer": {
                            "color": "#999999",
                            "fontSize": 10,
                            "font": "open sans",
                            "location": "bottom-left"
                        },
                        "size": {
                            "canvasWidth": 590,
                            "pieOuterRadius": "90%"
                        },
                        "data": {
                            "sortOrder": "value-desc",
                            "content": [
                                {
                                    "label": "Male",
                                    "value": sex["male"],
                                    "color": "#2383c1"
                                },
                                {
                                    "label": "Female",
                                    "value": sex["female"],
                                    "color": "#64a61f"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 32
                            },
                            "inner": {
                                "hideWhenLessThanPercentage": 3
                            },
                            "mainLabel": {
                                "fontSize": 11
                            },
                            "percentage": {
                                "color": "#ffffff",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#adadad",
                                "fontSize": 11
                            },
                            "lines": {
                                "enabled": true
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        },
                        "misc": {
                            "gradient": {
                                "enabled": true,
                                "percentage": 100
                            }
                        }
                    });

                    $("#pieChart").append(sexPie);

                    var householdPie = new d3pie("pieChart", {
                        "header": {
                            "title": {
                                "text": "Household Type",
                                "fontSize": 24,
                                "font": "open sans"
                            },
                            "subtitle": {
                                "text": "The distribution of different household types in this area",
                                "color": "#999999",
                                "fontSize": 12,
                                "font": "open sans"
                            },
                            "titleSubtitlePadding": 9
                        },
                        "footer": {
                            "color": "#999999",
                            "fontSize": 10,
                            "font": "open sans",
                            "location": "bottom-left"
                        },
                        "size": {
                            "canvasWidth": 590,
                            "pieOuterRadius": "90%"
                        },
                        "data": {
                            "sortOrder": "value-desc",
                            "content": [
                                {
                                    "label": "Family Household",
                                    "value": household_type["family_households"],
                                    "color": "#2383c1"
                                },
                                {
                                    "label": "Alone",
                                    "value": household_type["nonfamily_alone"],
                                    "color": "#64a61f"
                                },
                                {
                                    "label": "Roommate",
                                    "value": household_type["nonfamily_roommate"],
                                    "color": "#7b6788"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 32
                            },
                            "inner": {
                                "hideWhenLessThanPercentage": 3
                            },
                            "mainLabel": {
                                "fontSize": 11
                            },
                            "percentage": {
                                "color": "#ffffff",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#adadad",
                                "fontSize": 11
                            },
                            "lines": {
                                "enabled": true
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        },
                        "misc": {
                            "gradient": {
                                "enabled": true,
                                "percentage": 100
                            }
                        }
                    });

                    $("#pieChart").append(householdPie);

                    var mobilityPie = new d3pie("pieChart", {
                        "header": {
                            "title": {
                                "text": "Geographic Mobility",
                                "fontSize": 24,
                                "font": "open sans"
                            },
                            "subtitle": {
                                "text": "Where residents have moved in the past year",
                                "color": "#999999",
                                "fontSize": 12,
                                "font": "open sans"
                            },
                            "titleSubtitlePadding": 9
                        },
                        "footer": {
                            "color": "#999999",
                            "fontSize": 10,
                            "font": "open sans",
                            "location": "bottom-left"
                        },
                        "size": {
                            "canvasWidth": 590,
                            "pieOuterRadius": "90%"
                        },
                        "data": {
                            "sortOrder": "value-desc",
                            "content": [
                                {
                                    "label": "Same House",
                                    "value": geographic_mobility["same_house"],
                                    "color": "#2383c1"
                                },
                                {
                                    "label": "Same Metro Area",
                                    "value": geographic_mobility["diff_house_same_metro"],
                                    "color": "#64a61f"
                                },
                                {
                                    "label": "Different Metro Area",
                                    "value": geographic_mobility["diff_house_diff_metro"],
                                    "color": "#7b6788"
                                },
                                {
                                    "label": "Different Micro Area",
                                    "value": geographic_mobility["diff_house_micropolitan_area"],
                                    "color": "#a05c56"
                                },
                                {
                                    "label": "Other Area",
                                    "value": geographic_mobility["diff_house_other"],
                                    "color": "#961919"
                                }
                            ]
                        },
                        "labels": {
                            "outer": {
                                "pieDistance": 32
                            },
                            "inner": {
                                "hideWhenLessThanPercentage": 3
                            },
                            "mainLabel": {
                                "fontSize": 11
                            },
                            "percentage": {
                                "color": "#ffffff",
                                "decimalPlaces": 0
                            },
                            "value": {
                                "color": "#adadad",
                                "fontSize": 11
                            },
                            "lines": {
                                "enabled": true
                            },
                            "truncation": {
                                "enabled": true
                            }
                        },
                        "effects": {
                            "pullOutSegmentOnClick": {
                                "effect": "linear",
                                "speed": 400,
                                "size": 8
                            }
                        },
                        "misc": {
                            "gradient": {
                                "enabled": true,
                                "percentage": 100
                            }
                        }
                    });

                    $("#pieChart").append(mobilityPie);


                },
                error : function(e) {
                    console.log("error..");
                    console.log(e);
                }
        }
        )
        //console.log(dataJson);
        console.log("Successfully called.");

}
>>>>>>> 205610347e28cbee6b3c76a424d3797a0427686c
