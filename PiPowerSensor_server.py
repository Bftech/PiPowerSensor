from flask import Flask, render_template
import subprocess

# INIT
data = {}
app = Flask(__name__)
influxDb = "PiPowerSensor"

data['ip'] = subprocess.check_output(['hostname', '-I'])

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

if __name__ == "__main__":
    app.run(host = '0.0.0.0')
