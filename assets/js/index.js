var api;
var url =
  "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=usa";
var queryURL;

$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
console.log(response);
});
var settings = {
  async: true,
  crossDomain: true,
  url:
    "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country=USA",
  method: "GET",
  headers: {
    "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
    "x-rapidapi-key": "f8c62c6da0msh66a624b29081a48p18af92jsnc6d3dfbee09f"
  }
};

$.ajax(settings).done(function(response) {
  for (var i = 0; i < response.data.covid19Stats[i].province.length; i++) {
    console.log(response.data);

var data = [];
states = response.data.covid19Stats[i].province
data.push(states)
console.log(data)

function generateTable(){

    var numOfStates = response.data.covid19Stats[i].length;
    if (numOfStates > 0){
        var table = document.createElement("table");
        table.style.width = '50%';
        table.setAttribute('border', '1');
        table.setAttribute('cellspacing', '0');
        table.setAttribute('cellpadding', '5');
    }
};

}
});

