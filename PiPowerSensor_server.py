from flask import Flask, render_template
from influxdb import InfluxDBClient
import subprocess

# INIT
impKWH = 1000  # 1000 pulses for 1 kWh or 1 pulse for 1 Wh

data = {}
app = Flask(__name__)

dbname = "PiPowerSensor"
loc = "Maman";
InfluxClient = InfluxDBClient('localhost', 8086, "root", "root", dbname)

ip = subprocess.check_output(['hostname', '-I'])
data['ip'] = ip

# WEB
@app.route("/")
def index():
    return render_template('index.html', data = data)

@app.route("/getPulses")
@app.route("/getPulses/<periode>")
def getPulses(periode=""):
    if periode == "day":
        query = "SELECT * FROM pulses"
        return "day"
    elif periode == "hour":
        return "hour"
    elif periode == "month":
        return "month"
    else:
        return "all"

    return "none";

# kW = 3600/(imp/kWh) / seconds per flash [http://people.ds.cam.ac.uk/ssb22/elec/imp.html]
@app.route("/getPower")
def getPower():
    results = InfluxClient.query('SELECT * FROM pulses WHERE location=\''+ loc +'\' ORDER BY time DESC LIMIT 2', epoch='s').get_points()
    pulses = list(results)

    intervalSEC = pulses[0]['time'] - pulses[1]['time']
    print "### ", intervalSEC

    kW = 3600 / impKWH / intervalSEC
    return kW;

# RUN
if __name__ == "__main__":
    app.run(host = '0.0.0.0')
