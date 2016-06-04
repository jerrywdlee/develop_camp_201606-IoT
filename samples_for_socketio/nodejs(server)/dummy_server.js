// socket.ioモジュールの導入
var io = require('socket.io').listen(3333);
var userIdType = {};
var name_id_table = {};
console.log("Server On !");
io.on('connection', function(socket) {
  var client_ip = show_client_ip(socket);
  var id = socket.id;
  var network_delay = "";
  var startTime= Date.now();
  if(!userIdType[id]){
      userIdType[id] = {};
      userIdType[id].local_ip = client_ip;
      userIdType[id].network_delay= network_delay;
    }
  console.log("Connected to "+client_ip);
  console.log("ID :"+id);
  socket.on('instr_status',function (instr_list) {
    console.log("instr_list:"+instr_list);
  });
  socket.on('log_in',function (device_name,hashed_password,uuid) {
    userIdType[id].device_name = device_name;
    userIdType[id].hashed_password = hashed_password;
    userIdType[id].uuid = uuid;
    console.log(device_name+" Log In");
    //if (!name_id_table[device_name]) {
      name_id_table[device_name] = id;
    //}else {
      //console.error("Device \""+device_name+"\" Exsited!!");
    //}
  })
  socket.on('real_time_report',function (temp_data_obj) {
    temp_data_obj.socket_id = id;
    temp_data_obj.device_name = userIdType[id].device_name;
    temp_data_obj.device_uuid = userIdType[id].uuid;
    temp_data_obj.client_local_ip = client_ip;
    //temp_data_obj.network_delay = network_delay;
    console.log("temp_data_obj:");
    console.log(temp_data_obj);
    socket.broadcast.emit('real_time_report',temp_data_obj);
  })
  //ダミーサーバー用自動発信ロジック
  // 5sごとダミーデータを送信
  setInterval(function () {
    var dummy_data = { instr_name: 'dummy_data01', //計器(登録したセンサー)の名前
                       sample_time: '2016-06-02 06:42:53.154', //計測した時のタイム(GMT)
                       raw_data: '{"dummy":675}', //収集されたデータ(json文字列)
                       pushed: 0, //サーバー側では使わない、IoT側のFLAG
                       socket_id: '/#462w2S9eUe0qNUg6AAAA', //socketのセッションID
                       device_name: 'dummy_raspi01', //デバイス(raspi)の名前
                       device_uuid: '2016-06-01T06:27:48.353Z8bb8', //raspiのUUID
                       client_local_ip: '::ffff:192.168.11.104' //raspiのIP
                     }
    dummy_data.raw_data = random_data("dummy");
    dummy_data.sample_time = time_stamp();
    console.log("dummy_data:");
    console.log(dummy_data);
    socket.broadcast.emit('real_time_report',dummy_data);
  },5000)


  socket.on('send_data_realtime',function (target_name,instr_name,msg) {
    io.sockets.to(name_id_table[target_name]).emit('real_time_control',instr_name,msg);
  })
  socket.on('network_delay',function (target_name) {
    startTime = Date.now();
    console.log("startTime:"+startTime);
    console.log("id:"+id);
    io.sockets.to(name_id_table[target_name]).emit('ping',startTime,id);
  })
  socket.on('pong_client',function (time_stamp,query_id) {
    network_delay = Date.now()-time_stamp
    console.log("network_delay:"+network_delay);
    console.log("query_id:"+query_id);
    io.sockets.to(query_id).emit('network_delay',network_delay)
  })
  socket.on('reg',function (target_name) {
    io.sockets.to(name_id_table[target_name]).emit('reg');
    console.log("Reg Page on : "+show_client_ip(socket,false)+"8888");
  })
  socket.on('disconnect',function() {
    var device_name = userIdType[id].device_name
    console.log(userIdType[id].device_name);
      if(userIdType[id]){
        delete userIdType[id];//退出时删除该用户
      }
      if (name_id_table[device_name]) {
        delete name_id_table[device_name]
      }
      console.log('User '+ device_name +'('+id+') disconnected');
      console.log(userIdType);
  });

});

function show_client_ip(socket,no_port) {
  var clientIp = socket.request.connection;
  var ip = clientIp.remoteAddress;
  if (no_port) {
    var port = clientIp.remotePort;//::ffff:192.168.11.14"
  }else {
    return ip;
    //var port = '';
  }
  //console.log(socket.request.connection);
  //console.log(port);
  if (ip.indexOf(":")!=-1) {
      var ip_v6 = "["+ip+"]:"+port;
      return ip_v6;
  }else{
      var ip_v4 = ip+':'+port
      return ip_v4
  }
}

function random_data(key,max,min) {
  if (!max||!min) {
    max = 1023;
    min = 0
  }
  var value = Math.floor( Math.random() * (max - min + 1) ) + min;
  return '{"'+key+'":'+value+'}'
}
//make a time stamp like 2016-01-06 04:41:13.636
function time_stamp () {
	var now = new Date();
	var timeNowISO = now.toISOString();//2016-01-06T04:38:02.561Z
	var theTimeNow=timeNowISO.split('T')[0]+" "+timeNowISO.split('T')[1].split('Z')[0];
	return theTimeNow;
	//console.log("time: "+theTimeNow);//2016-01-06 04:41:13.636
}
