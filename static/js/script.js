var speed = 0;
var i = 0;
var refreshId;

var db = "PiPowerSensor";
var loc = "Maman";
var ip = $( "#ip").text().trim();

$(document).ready(function() {
  updateRefreshRate();
});

$("input[name=refreshRate]").change(function() {
  updateRefreshRate();
});

function refreshStats() {

  var instantPower = getInstantPower();
  console.log(instantPower + "kW");

  $("#data1").text(i);
  i++;
  refreshId = setTimeout(refreshStats, speed * 1000);
}

function getInstantPower() {
  var powerData;
  $.get('http://'+ ip +':8086/query?db='+ db +'&epoch=ms&q=SELECT * FROM pulses WHERE location=\''+ loc +'\' ORDER BY time DESC LIMIT 2', function(data) {
    console.log(data);
    powerData = data;
  });
  var time1 = powerData['results'][0]['series'][0]['values'][0][0]
  var time2 = powerData['results'][0]['series'][0]['values'][1][0]

  var intervalMS = time1 - time2;
  var intervalSEC = intervalMS / 1000;

  return 3600 / (intervalSEC * 1000);
}

function updateRefreshRate() {
  speed = $("input[name=refreshRate]:checked").val();
  clearTimeout(refreshId);
  refreshStats();
  console.log(speed);
}
