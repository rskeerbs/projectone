$(document).ready( function(){

    var min = 0;
    var max = 0;

    var states_list = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    var states_list_confirmed = []
    states_list.map(function (s) {
        $.ajax({
            "url": `https://azlabs.tech/covid/country/us/state/${s}`,
            "method": "GET",
            "dataType": "json"
        }).done(function(res) {
            //console.log("api resi;lt s", res)
            let total = 0;
            res.map((obj) => {
                console.log("OBject is", obj.CONFIRMED)
                total = total + obj.CONFIRMED
            })

            


            let state_confirmed = {
                state: s,
                confirmed_total:total
            }

            if(state_confirmed.confirmed_total > max){
                max = state_confirmed.confirmed_total
            }

            console.log("state confirmed", state_confirmed, total)
            states_list_confirmed.push(state_confirmed)
            console.log(states_list_confirmed)

        })
    })

    mapStates();

        //Map code begins here
    function mapStates() {
        console.log("we are in")
    //Width and height
        var w = 500;
        var h = 300;

        var margin = {
            top: 60,
            bottom: 40,
            left: 70,
            right: 40
          };

        var width = w - margin.left - margin.right;
        var height = h - margin.top - margin.bottom;
        
        // define map projection
        var projection = d3.geoAlbersUsa()
        .translate([w / 2, h / 2])
        .scale([500]);

         //Define default path generator
        var path = d3.geoPath()
        .projection(projection);

        var svg = d3.select("body")
        .append("svg")
        .attr("id", "chart")
        .attr("width", w)
        .attr("height", h)
        .append("g")
        .attr("tranform", "translate(0" + margin.left + "," + margin.top + ")");




     

        d3.json("us-states.json", function (json) {
                //Merge the agriculture and GeoJSON data
                //Loop through once for each agriculture data value
            for (var i = 0; i < states_list_confirmed.length; i++) {
                console.log("COLRIONG IN STATES", states_list_confirmed)
                // grab state name
                var dataState = states_list_confirmed[i].state

                //grab data value, and convert from string to float

                var dataValue =states_list_confirmed[i].confirmed_total
                console.log("data is", dataValue)

                //find the corresponding state inside the GeoJSON
                //console.log(json.features.length);

                for (var n = 0; n < json.features.length; n++) {

                    // properties name gets the states name
                    var jsonState = json.features[n].properties.name;
                   
                    // if statment to merge by name of state
                    if (dataState === jsonState) {
                        //Copy the data value into the JSON
                        // basically creating a new value column in JSON data
                        json.features[n].properties.value = dataValue;
                        console.log("change is", json.features[n])

                        console.log(dataState, jsonState)

                        //stop looking through the JSON
                        break;
                    } else {
                       // console.log("NO MATCH")
                    }
                };
            }
            console.log(json.features);


            var max_area = d3.max( states_list_confirmed, function(d) { return d.confirmed_total});
            var min_area = d3.min( states_list_confirmed, function(d) { return d.confirmed_total})
            var color = d3.scaleLinear().domain([min_area, max_area]).range(['#ffffcc', '#ffeda0', '#fed976', '#feb24c', '#fd8d3c', '#fc4e2a', '#e31a1c', '#bd0026', '#800026']);
            

            svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function (d) {
                //get the data value
                var value = d.properties.value;
                console.log("fill is", d)
                if (value) {
                    //If value exists
                    console.log("value is", color(value));
                    return color(value*500 );
                } 
                else {
                    // If value is undefined
                    //we do this because alaska and hawaii are not in dataset we are using but still in projections
                    return "#ccc"
                  }
            })
        });

    }
});