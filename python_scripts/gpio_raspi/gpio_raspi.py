#!/usr/bin/env python
# -*- coding: utf-8 -*-
# http://www.ic.daito.ac.jp/~mizutani/raspi/blinkingLED.html

import RPi.GPIO as GPIO
from time import sleep
gpio_pin_group = [26,19,13,6,5,24,23,22,27,17]
GPIO.setmode(GPIO.BCM)
#GPIO.setup(25, GPIO.OUT)
for pin_num in gpio_pin_group:
    GPIO.setup(pin_num, GPIO.OUT)
    sleep(0.025)
lvl = 0

for pin_num in gpio_pin_group:
    GPIO.output(pin_num, GPIO.LOW)
    sleep(0.0001)
    pass

try:
    while True:
        vol = float(raw_input())
        print(vol)
        lvl = int(vol/10)
        i = 0
        if lvl > 2:
            while(i<1000):
                i+=1
                temp_lvl = lvl
                for pin_num in gpio_pin_group:
                    if temp_lvl == 0:
                        break
                    temp_lvl -= 1
                    GPIO.output(pin_num, GPIO.HIGH)
                    sleep(0.0001)
                    GPIO.output(pin_num, GPIO.LOW)
                    sleep(0.0001)
                    pass
        else:
            i =0
            while i < 1:
                i+=1
                GPIO.output(gpio_pin_group[0], GPIO.HIGH)
                GPIO.output(gpio_pin_group[1], GPIO.HIGH)
                sleep(0.5)
                GPIO.output(gpio_pin_group[0], GPIO.LOW)
                GPIO.output(gpio_pin_group[1], GPIO.LOW)
                sleep(0.5)
                pass
except KeyboardInterrupt:
    pass

GPIO.cleanup()
