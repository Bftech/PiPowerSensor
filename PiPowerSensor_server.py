from flask import Flask, render_template
import subprocess
app = Flask(__name__)
ip = subprocess.check_output(['hostname', '-I'])
print ip

data = {}
data['ip'] = ip

@app.route("/")
def index():
    return render_template('index.html', data = data)

@app.route("/getPulses")
@app.route("/getPulses/<periode>")
def getPulses(periode=""):
    if periode == "day":
        return "day"
    elif periode == "hour":
        return "hour"
    elif periode == "month":
        return "month"

    return "none";

if __name__ == "__main__":
    app.run(host = '0.0.0.0')
