const child = require('child_process');
const EventEmitter = require('events').EventEmitter;
const event = new EventEmitter();


var mcp3002 = child.spawn( 'python',['-u',"./mcp3002.py",0],{stdio:[ 'pipe',null,null, 'pipe' ]});
var led_relay = child.spawn( 'node', ['./led_relay.js'],{stdio:[ 'pipe',null,null, 'pipe' ]});

//mcp3002.stdout.setEncoding('utf8');

mcp3002.stdout.on('data', function (data) {
  data = data.toString().replace(/[\n\r]/g,"")
  //console.log('stdout: ' + data);
  console.log(data);
  data = JSON.parse(data)

  //console.log(my_round(data.Temp,2));
  for (var i in data) {
    //var level = Math.round(8*data[i]/1023)
    var level = Math.round(8*data[i]/950)
  }
  //console.log(level);
  led_relay.stdin.write(level+"\n");//must end by "\n"
});

setInterval(function () {
  mcp3002.stdin.write("L\n");
}, 1000);

function my_round(num,exp) {
  exp = Math.pow(10,exp)
  //console.log((Math.round(num*exp)/exp));
  data = Math.round(num*exp)/exp
  return data
}
