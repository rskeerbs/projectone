document.addEventListener('DOMContentLoaded', function () {


    $(document).ready(function () { // DocRdy start

        let country = "";
        let newCases = [];
        let active = []; 
        let critical = [];
        let total = [];
        let deathsNew = [];
        let deathsTotal = [];
        let recovered = [];
        let confirmedArray = [];
        let caseTitle = ["New", "Active", "Critical", " Recovered", "Total", "New Deaths", "Total Deaths"];

        //$("myDataTable").empty();
        //$(".myDataTable > td").remove();


        $('.mySearchBtn2').click(function (e) {
            console.log('clicked');
            e.preventDefault();

            country = $('.myInputCountry').val();

            var settings = {
                "async": true,
                "crossDomain": true,
                "url": `https://covid-193.p.rapidapi.com/statistics?country=${country}`,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "covid-193.p.rapidapi.com",
                    "x-rapidapi-key": "209b88513bmshbc9ff320e04d9e1p1f5294jsnc0b4d120644a"
                }
            }


            $.ajax(settings).done(function (response) {
                let results = response.response;
                //console.log(results);

                function getResults() { //get results func starts

                    for (let i = 0; i < results.length; i++) {
                        console.log(results[i]);


                        newCases = results[i].cases.new;
                        active = results[i].cases.active;
                        total = results[i].cases.total;
                        critical = results[i].cases.critical;
                        deathsNew = results[i].deaths.new;
                        deathsTotal = results[i].deaths.total;
                        recovered = results[i].cases.recovered;

                        confirmedArray.push(newCases, active, critical, recovered, total, deathsNew, deathsTotal);

                    }

                    $('.myDataTable').append('<tr><td>' + country + '</td><td>' + newCases + '</td> <td>' + active + '</td> <td>' + critical + '</td><td>' + recovered + '</td>  <td>' + total + '</td>  <td>' + deathsNew + '</td><td>' + deathsTotal + '</td> </tr>');
                }
                getResults();
                console.log(newCases);
                console.log(active);
                console.log(total);
                console.log(critical);
                console.log(deathsNew);
                console.log(deathsTotal);
                console.log(recovered);


                function mychart() {

					
					let countryLabel = country; //country name
	
					let dataChart = new Chart(myChart, {
						type: 'horizontalBar',
						data: {
							labels: caseTitle,
							datasets: [{
								label: countryLabel,
								data: confirmedArray,
								backgroundColor: "Grey"
							}]
						},
						options: {}
					})
					//chart end
				}
				mychart();


            });


        });

    });


});