var speed = 0;
var i = 0;
var refreshId;

$(document).ready(function() {
  updateRefreshRate();
});

$("input[name=refreshRate]").change(function() {
  updateRefreshRate();
});

function refreshStats() {
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
