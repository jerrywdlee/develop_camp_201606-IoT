const child = require('child_process');

// sudo raspi-config (GUI)
// sudo nano /boot/config.txt => dtparam=i2c_arm=on
// sudo apt-get install python-smbus

var hdc1000 = child.spawn( 'python',['-u',"./read_temp_hum.py"],{stdio:[ 'pipe',null,null, 'pipe' ]});
hdc1000.stdout.setEncoding('utf8');

process.stdin.on('data',function (data) {
	// body...
  data = data.toString().replace(/[\n\r]/g,"")
	hdc1000.stdin.write(data+"\n")
})

hdc1000.stdout.on('data', function (data) {
  data = data.toString().replace(/[\n\r]/g,"")
  //console.log('stdout: ' + data);
  data = JSON.parse(data)
  console.log(data);
  console.log(my_round(data.Temp,2));
});
hdc1000.stderr.on('data', function (data) {
  data = data.toString().replace(/[\n\r]/g,"")
  console.log('stderr: ' + data);
});

hdc1000.on('close', function (code) {
  data = data.toString().replace(/[\n\r]/g,"")
  console.log('Exited! '+code);
});

function my_round(num,exp) {
  exp = Math.pow(10,exp)
  //console.log((Math.round(num*exp)/exp));
  data = Math.round(num*exp)/exp
  return data
}
