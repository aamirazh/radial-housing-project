
function callAPI(distance, lat, long) {
    console.log("Going to call getJSON");
        $.ajax({
            url:"http://localhost:5000/"+dist+"/"+lat+"/"+long,
            crossDomain:true,
            type: 'get',
            dataType: "jsonp",
            jsonpCallback: 'apiCallback',
            success: function(json) {
                console.log("worked");
                console.log(json);
            },
            error : function(e) {
                console.log("error..");
                console.log(e);
            }
    })
    console.log("Successfully called.");
}


function apiCallback(d){
    console.log("START");
    console.log("END");
    console.log(JSON.stringify(d));
    console.log(d);
    console.log(test);
    console.log(d.race.total);
    console.log('aaa');
    // for (var key in data){
    //     if (data.hasOwnProperty(key)) {
    //         var val = data[key];
    //         console.log(val)
    //     }
    // }
    // var parsed = JSON.parse(data);
    // for (var i = 0; i < parsed.length; i++){
    //     console.log(parsed[i]);
    // }
  // document.getElementById("data").innerHTML = JSON.stringify(test);
}
