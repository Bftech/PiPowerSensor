// INIT
var speed = 0;
var impKWH = 1000 //1000 pulses for 1 kWh or 1 pulse for 1 Wh
var refreshId;

var db = "PiPowerSensor";
var loc = "Maman";
var ip = $( "#ip").text().trim();

var kW = 0;

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

//  kW = 3600/(imp/kWh) / seconds per flash [http://people.ds.cam.ac.uk/ssb22/elec/imp.html]
function getInstantPower() {
  // $.get('http://'+ ip +':8086/query?db='+ db +'&epoch=ms&q=SELECT * FROM pulses WHERE location=\''+ loc +'\' ORDER BY time DESC LIMIT 2', function(data) {
  //   var time1 = data['results'][0]['series'][0]['values'][0][0] //Dernier pulse
  //   var time2 = data['results'][0]['series'][0]['values'][1][0] //Avant-Dernier pulse
  //
  //   var intervalMS = time1 - time2;
  //   var intervalSEC = intervalMS / 1000;
  //
  //   kW = 3600 / impKWH / intervalSEC;
  //   console.log(kW + "kW");
  // });
  $.get('/getPower',function(data) {
    kW = parseInt(data);
  })
  return kW.toFixed(2);
}

function pulsesToKWH(nbPulses) {
  var kWh = nbPulses / impKWH;
  return kWh;
}


// RUN
// Render Loop
function refreshStats() {
  $("#data0").text(getInstantPower());
  refreshId = setTimeout(refreshStats, speed * 1000);
}
