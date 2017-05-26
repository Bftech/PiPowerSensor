from flask import Flask, render_template
app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/getPulses/<periode>")
def getPulses(periode):
    if periode == "day":
        return "day"
    else if periode == "hour":
        return "hour"
    else if periode == "month":
        return "month"
        
    return "none";

if __name__ == "__main__":
    app.run(host = '0.0.0.0')
