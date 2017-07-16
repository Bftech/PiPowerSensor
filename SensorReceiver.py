import serial
import subprocess

# INIT
ser = serial.Serial('/dev/ttyACM0', 9600) # find with 'ls /dev/tty*'

db = "PiPowerSensor"
location = "Maman"

# FUNC
def insertPulse():
    query = "curl -i -XPOST 'http://localhost:8086/write?db="+ db +"' --data-binary 'pulses,location="+ location +" pulse=1'"
    subprocess.call(query, shell=True)

# RUN
while 1:
    msg = ser.readline().rstrip() # Attente des pulses depuis l'arduino
    print "msg : " + msg
    if msg == "pulse":
        insertPulse();

    msg = ""
