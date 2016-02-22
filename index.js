var request = require('request');

var currentDate = new Date();
var currentHour = currentDate.getHours();
var currentMinute = currentDate.getMinutes();
var currentDayFormatted = currentDate.getUTCDate() + "/" + (currentDate.getUTCMonth() + 1) + "/" + currentDate.getFullYear();
console.log("Current time: ", currentDayFormatted, currentHour + ":" + currentMinute + ":00");

function findNextTrain(results){
    var now = new Date();
    var result;
    for(var i in results){
        if(results[i].date > now){
            result = results[i].date.getHours() + ":" + results[i].date.getMinutes() + ":00";
            break;
        }
    }

    return result;
}

function processResults(response){
    var result = [];
    var results = JSON.parse(response);
    for(var i in results[0][0]){
        var hours = results[0][0][i][0].sortida.split(" ")[1].split(":")[0];
        var minutes = results[0][0][i][0].sortida.split(" ")[1].split(":")[1];
        var date = new Date();

        date.setHours(hours);
        date.setMinutes(minutes);
        result.push({
            id: i,
            date: date
        });
    }

    result.sort(function(a,b){
      return a.date - b.date;
    });
    // console.log(result);
    return result;
}

request.post(
    'http://www.fgc.cat/cercador/cerca.asp',
    {
        form: {
            liniasel:"1",
            estacio_origen:"PC",
            estacio_desti:"NA",
            tipus:"S",
            dia:currentDayFormatted,
            horas:currentHour,
            minutos:currentMinute
        }
    },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var sortedResult = processResults(body);
            var nextTrain = findNextTrain(sortedResult);
            console.log("Next train:   ", currentDayFormatted, nextTrain);
        }
    }
);