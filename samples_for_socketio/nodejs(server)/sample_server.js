// socket.ioモジュールの導入
var io = require('socket.io').listen(3300);

/*// 暗号化するときのロジック
var fs = reqquire('fs');
var io = require('socket.io').listen(3300, {
    key : fs.readFileSync('/etc/pki/tls/private/your.domain.com.key').toString(),
    cert: fs.readFileSync('/etc/pki/tls/certs/your.domain.com.crt').toString(),
    ca: fs.readFileSync('/etc/pki/tls/certs/your.domain.com.cer').toString(),
    'log level':1
});*/

// client一台に付き、socket一個が動かす
console.log("Server waiting on http://localhost:3300");
io.on('connection', function(socket) {
  console.log("Connected!!");
  socket.emit('chat',{msg:'Server Connected',at:Date.now().toString()});
  console.log("please input and press Enter key");
  socket.on('chat',function (data) {
    console.log(data);
  })
  process.stdin.on('data',function (data) {
	  var msg = data.toString().replace(/[\n\r]/g,"")
	  console.log('> '+ msg)
      socket.emit('chat',{msg: msg ,at:Date.now().toString()});
  })
})

// process強制切断
if (process.env.EXIT_AT) {
  setTimeout(function() {
    return process.exit();
  }, process.env.EXIT_AT - 0);
}
