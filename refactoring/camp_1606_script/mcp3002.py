#!/usr/bin/env python
# http://kakakikikeke.blogspot.jp/2015/12/raspberrypi-with-mcp3002.html

import time
import sys
import spidev

spi = spidev.SpiDev()
spi.open(0,0)

#print(sys.argv)
try:
    channel_num = int(sys.argv[1], 10)
    #print(channel_num)
except Exception as e:
    print(e)
    raise

def readAdc(channel):
    if channel ==0 or channel ==1:
        adc = spi.xfer2([1, (2 + channel) << 6,0])
        data = ((adc[1] & 31) << 6) + (adc[2] >> 2)
    else:
        data = "error"
    return data

def sample(lvl):
    temp_data = 0
    if lvl == "H":
        for i in range(20):
            temp_data += readAdc(channel_num)
            time.sleep(0.05)
            pass
        return temp_data//20 # need int

    elif lvl == "L":
        for i in range(5):
            temp_data += readAdc(channel_num)
            time.sleep(0.05)
            pass
        return temp_data//5 # need int
    else:
        for i in range(10):
            temp_data += readAdc(channel_num)
            time.sleep(0.05)
            pass
        return temp_data//10 # need int

try:
    while True:
        #data = readAdc(0)
        #print("{"+'"port_0" : '+ str(data)+"}")
        #time.sleep(1)
        #data = readAdc(1)
        #print("{"+'"port_1" : '+str(data)+"}")
        #time.sleep(1)
        input_lvl = raw_input()
        temp_data = sample(input_lvl)
        print("{"+'"port_'+ str(channel_num) +'" : '+str(sample(input_lvl))+"}")
except KeyboardInterrupt:
    spi.close()
    sys.exit(0)
