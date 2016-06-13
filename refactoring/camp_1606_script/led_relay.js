process.stdin.resume();//this is how to get input from console
process.stdin.setEncoding('utf8');

var rpio = require('rpio');
var sleep = require('thread-sleep');
var usleep = require('sleep');

var pin_arry = [40,38,37,36,31,29,18,16]

var lvl = pin_arry.length

function config_pin(pin) {
  rpio.open(pin, rpio.OUTPUT, rpio.HIGH);
  sleep(1)
}

for (var i = 0; i < pin_arry.length; i++) {
  config_pin(pin_arry[i])
}

setInterval(function () {
  for (var i = 0; i < lvl; i++) {
    rpio.write(pin_arry[i],rpio.LOW)
    //sleep(1)
    usleep.usleep(100)
    rpio.write(pin_arry[i],rpio.HIGH)
  }
}, 0);



process.stdin.on('data',function (data) {
  try {
    lvl = parseInt(data.toString().replace(/[\n\r]/g,""))
    if (lvl > pin_arry.length) {
      lvl = pin_arry.length
    }
  } catch (e) {
    //lvl = pin_arry.length
  }
})
