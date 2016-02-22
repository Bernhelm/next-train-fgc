var request = require('request');

var currentDate = new Date();
var currentHour = currentDate.getHours();
var currentMinute = currentDate.getMinutes();
var currentDayFormatted = currentDate.getUTCDate() + "/" + (currentDate.getUTCMonth() + 1) + "/" + currentDate.getFullYear();
console.log(currentDayFormatted);

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
            console.log(body)
        }
    }
);