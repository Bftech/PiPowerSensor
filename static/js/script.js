// INIT
var speed = 0;
var i = 0;
var refreshId;

var db = "PiPowerSensor";
var loc = "Maman";
var ip = $( "#ip").text().trim();

var power = 0;

$(document).ready(function() {
  updateRefreshRate();
});

$("input[name=refreshRate]").change(function() {
  updateRefreshRate();
});

// DEF
function updateRefreshRate() {
  speed = $("input[name=refreshRate]:checked").val();
  clearTimeout(refreshId);
  refreshStats();
  console.log(speed);
}

function getInstantPower() {
  $.get('http://'+ ip +':8086/query?db='+ db +'&epoch=ms&q=SELECT * FROM pulses WHERE location=\''+ loc +'\' ORDER BY time DESC LIMIT 2', function(data) {
    var time1 = data['results'][0]['series'][0]['values'][0][0] //Dernier pulse
    var time2 = data['results'][0]['series'][0]['values'][1][0] //Avant-Dernier pulse

    var intervalMS = time1 - time2;
    var intervalSEC = intervalMS / 1000;
    console.log(intervalSEC + "sec");

    power = (3600 / (intervalSEC * 1000));
  });
  return power.toFixed(2);
}


// RUN
// Render Loop
function refreshStats() {
  $("#data1").text(getInstantPower());
  refreshId = setTimeout(refreshStats, speed * 1000);
}
