const child = require('child_process');
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();
var sleep = require('thread-sleep');

var mcp3002 = child.spawn( 'python',['-u',__dirname+"/mcp3002.py",0],{stdio:[ 'pipe',null,null, 'pipe' ]});
var led_relay = child.spawn( 'node', [__dirname+'/led_relay.js'],{stdio:[ 'pipe',null,null, 'pipe' ]});
var hdc1000 = child.spawn( 'node', [__dirname+'/hdc1000/hdc1000.js'],{stdio:[ 'pipe',null,null, 'pipe' ]});

var all_data = {};
//mcp3002.stdout.setEncoding('utf8');

mcp3002.stdout.on('data', function (data) {
  data = data.toString().replace(/[\n\r]/g,"")
  //console.log('stdout: ' + data);
  //console.log(data);
  try {
    data = JSON.parse(data)

  } catch (e) {

  }
  //console.log(my_round(data.Temp,2));
  for (var i in data) {
    //var level = Math.round(8*data[i]/1023)
    all_data.pressure = data[i]
    var level = Math.round(8*data[i]/950)
  }
  //console.log(level);
  led_relay.stdin.write(level+"\n");//must end by "\n"
});

hdc1000.stdout.on('data', function (data) {
  //console.log(data.toString());
  try {
    data = JSON.parse(data.toString())
    all_data.Temp = my_round(data.Temp,2)
    all_data.Humi = my_round(data.Humi,2)
  } catch (e) {
    console.log(e);
  }
})
hdc1000.stderr.on('data', function (data) {
  data = data.toString().replace(/[\n\r]/g,"")
  console.log('stderr: ' + data);
});

setInterval(function () {
  mcp3002.stdin.write("L\n");
  sleep(100)
  hdc1000.stdin.write("L\n");
}, 500);

process.stdin.on('data',function (data) {
  data = data.toString().replace(/[\n\r]/g,"")
  setTimeout(function () {
    //if (all_data.Temp&&all_data.Humi&&all_data.pressure) {
      console.log(JSON.stringify(all_data));
    //}
  }, 100);
})

function my_round(num,exp) {
  exp = Math.pow(10,exp)
  //console.log((Math.round(num*exp)/exp));
  data = Math.round(num*exp)/exp
  return data
}
