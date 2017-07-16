from flask import Flask, render_template
from influxdb import InfluxDBClient
import subprocess

# INIT
data = {}
app = Flask(__name__)

ip = subprocess.check_output(['hostname', '-I'])
port=8086
dbname = "PiPowerSensor"
loc = "Maman";
InfluxClient = InfluxDBClient(ip, port, "root", "root", dbname)

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

@app.route("/getPower")
def getPower():
    results = InfluxClient.query('SELECT * FROM pulses WHERE location=\''+ loc +'\' ORDER BY time DESC LIMIT 2')
    print results
    # return kWh;
    return 1;

# RUN
if __name__ == "__main__":
    app.run(host = '0.0.0.0')
