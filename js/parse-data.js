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
