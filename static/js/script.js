var speed = 0;
var i = 0;
var refreshId;

var db = "PiPowerSensor";
var loc = "Maman";

$(document).ready(function() {
  updateRefreshRate();
});

$("input[name=refreshRate]").change(function() {
  updateRefreshRate();
});

function refreshStats() {
  $("#data1").text(i);
  $.get('http://localhost:8086/query?db='+ db +'&q=SELECT * FROM pulses ', function(data) {
    console.log(data);
  });

  i++;
  refreshId = setTimeout(refreshStats, speed * 1000);
}

function updateRefreshRate() {
  speed = $("input[name=refreshRate]:checked").val();
  clearTimeout(refreshId);
  refreshStats();
  console.log(speed);
}
