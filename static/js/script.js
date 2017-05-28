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
  var powerData;
  $.get('http://'+ ip +':8086/query?db='+ db +'&epoch=ms&q=SELECT * FROM pulses WHERE location=\''+ loc +'\' ORDER BY time DESC LIMIT 2', function(data) {
    console.log(data);
    powerData = data;
  });

  $("#data1").text(i);
  i++;
  refreshId = setTimeout(refreshStats, speed * 1000);
}

function updateRefreshRate() {
  speed = $("input[name=refreshRate]:checked").val();
  clearTimeout(refreshId);
  refreshStats();
  console.log(speed);
}
