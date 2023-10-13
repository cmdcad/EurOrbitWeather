
$(document).ready(function () {
    // Handler for .ready() called.
    loadData("http://www.7timer.info/bin/api.pl?lon=52.367&lat=4.904&product=civillight&output=json");
    $('select>option:eq(1)').prop('selected', true);
});


$("#citySelected")
    .on("change", function () {
        var str = "";
        var obj = "";
        var addr = "";

        $("select option:selected").each(function () {
            if ($(this).val().length == 0)
                return;
            else {
                str += $(this).val() + " ";
                console.log(str);
                obj = JSON.parse(str);
                addr = `http://www.7timer.info/bin/api.pl?lon=${obj.lon}&lat=${obj.lat}&product=civillight&output=json`;
                str = addr;
                loadData(addr);
            }
        }); 
    })
    .trigger("change");

function loadData(addr) {
    // and remember the jqxhr object for this request
    $.get(addr, function (json) {
        for (var i = 0; i < 7; i++) {
            $(".forecast-block").append(getCard(json, i));
        }
    })

}

// Assign handlers immediately after making the request,
function getCard(json, index) {
    const result = JSON.parse(json);
    const info = result.dataseries;

    const d = getDate(info[index].date.toString());
    const weather = info[index].weather;
    const temp = info[index].temp2m;
    const image = getImage(weather);
    const form = getForm(weather).toUpperCase();

    return `<div class="col bm-2">
        <div class="card h-100">
            <p class="weather-date">${d}</p>
            <div class="weather-icon-div"><img class="weather-icon" src="${image}" alt="cloudy">
            </div>
            <div class="card-body">
                <p class="weather-description">${form}</p>
                <p class="weather-temperatures">H: ${temp.max} ºC</p>
                <p class="weather-temperatures">L: ${temp.min} ºC</p>
            </div>
        </div>
    </div>
    `
}



function getDate(_date) {
    //const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var _d = [_date.substring(0, 4), _date.substring(4, 6), _date.substring(6, 8)];
    console.log(`date array ${_d}`);
    console.log(`${_d[0]}-${_d[1]}-${_d[2]}`);

    const date = new Date();
    date.setFullYear(_d[0], _d[1] - 1, _d[2]);

    console.log(`FullYear ${date}`);
    const d = date.toString().split(' ');

    return ` ${d[0]} ${d[1]} ${d[2]}`;
}

function getImage(image) {
    return "images/" + image + ".png";
}

function getForm(image) {
    const weather = {
        "clear": "clear",
        "cloudy": "cloudy",
        "fog": "fog",
        "humid": "humid",
        "ishower": "Isolated Shower",
        "lightrain": "light rain",
        "lisghtsnow": "light snow",
        "mcloudy": "moderate cloudy",
        "oshower": "Occasional shower",
        "pcloudy": "partly cloudy",
        "rain": "rain",
        "rainsnow": "rain and snow",
        "snow": "snow",
        "tsrain": "thunderstorm or rain",
        "tstorm": "thunderstorm",
        "windy": "windy"
    }
    return weather[image];
}
