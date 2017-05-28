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

function refreshStats() {
  $("#data1").text(getInstantPower());
  refreshId = setTimeout(refreshStats, speed * 1000);
}

function getInstantPower() {
  $.get('http://'+ ip +':8086/query?db='+ db +'&epoch=ms&q=SELECT * FROM pulses WHERE location=\''+ loc +'\' ORDER BY time DESC LIMIT 2', function(data) {
    var time1 = data['results'][0]['series'][0]['values'][0][0]
    var time2 = data['results'][0]['series'][0]['values'][1][0]

    var intervalMS = time1 - time2;
    var intervalSEC = intervalMS / 1000;

    power = (3600 / (intervalSEC * 1000)) / 1000;
  });
  return power.toFixed(2);
}
 
function updateRefreshRate() {
  speed = $("input[name=refreshRate]:checked").val();
  clearTimeout(refreshId);
  refreshStats();
  console.log(speed);
}
