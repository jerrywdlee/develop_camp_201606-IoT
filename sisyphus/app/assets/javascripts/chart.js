
$(document).ready(function(){
  //全てのスクリプトの導入を待つ
  FusionCharts.ready(function(){
    fuelWidget = new FusionCharts({
      type: 'cylinder',
      dataFormat: 'json',
      id: 'fuelMeter',
      renderAt: 'chart-container',
      width: '250',
      height: '400',
      dataSource: {
        "chart": {
          "caption": "ウォーターサーバ",
          "subcaptionFontBold": "0",
          "lowerLimit": "0",
          "upperLimit": "120",
          "lowerLimitDisplay": "Empty",
          "upperLimitDisplay": "Full",
          "numberSuffix": "%",
          "showValue": "0",
          "showhovereffect": "1",
          "bgCOlor": "#ececec",
          "borderAlpha": "0",
          "cylFillColor": "#008ee4"
        },
        "value": "0"
      },
      "events":{
        "rendered": function(evtObj, argObj){
        }
      }
    }).render();
  });

  FusionCharts.ready(function(){
    //var fuelVolume = 110,
    fuelWidget = new FusionCharts({
      type: 'cylinder',
      dataFormat: 'json',
      id: 'fuelMeter2',
      renderAt: 'chart-container2',
      width: '250',
      height: '400',
      dataSource: {
        "chart": {
          "caption": "ダミー",
          "subcaptionFontBold": "0",
          "lowerLimit": "0",
          "upperLimit": "100",
          "lowerLimitDisplay": "Empty",
          "upperLimitDisplay": "Full",
          "numberSuffix": "%",
          "showValue": "0",
          "showhovereffect": "1",
          "bgCOlor": "#ececec",
          "borderAlpha": "0",
          "cylFillColor": "eeeeee"
        },
        "value": "110"
      },
      "events":{
        "rendered": function(evtObj, argObj){
        }
      }
    }).render();
  });

  FusionCharts.ready(function(){
    //var fuelVolume = 110,
    fuelWidget = new FusionCharts({
      type: 'cylinder',
      dataFormat: 'json',
      id: 'fuelMeter3',
      renderAt: 'chart-container3',
      width: '250',
      height: '400',
      dataSource: {
        "chart": {
          "caption": "サプリメント",
          "subcaptionFontBold": "0",
          "lowerLimit": "0",
          "upperLimit": "100",
          "lowerLimitDisplay": "Empty",
          "upperLimitDisplay": "Full",
          "numberSuffix": "%",
          "showValue": "0",
          "showhovereffect": "1",
          "bgCOlor": "#ececec",
          "borderAlpha": "0",
          "cylFillColor": "F92500"
        },
        "value": "0"
      },
      "events":{
        "rendered": function(evtObj, argObj){
        }
      }
    }).render();
  });


  // ダミーのチャート
  var fuelVolume = 110
  setInterval(function () {
    (fuelVolume < 10) ? (fuelVolume = 110) : "";
    var consVolume = fuelVolume -(Math.floor(Math.random() * 3));
    FusionCharts("fuelMeter2").feedData("&value=" + consVolume);
    fuelVolume = consVolume;
    $("#fuelMeter2_tag").html("残量："+consVolume+"%")
  }, 1000);


  var url = "http://192.168.3.11:3333";
  //接続
  var socket = io.connect(url);

  var water_sever_lvl =0;
  socket.on("real_time_report", function(data){
    var chart_name
    var empty_weight =0
    console.log(raw_data);
    switch (data.instr_name) {
      case "water_sever":
        chart_name = "fuelMeter"
        empty_weight = 550
        break;
      case "supplement":
        chart_name = "fuelMeter3"
        empty_weight = 200
      default:
        //chart_name = "fuelMeter3"
    }
    var vol = 0;
    var raw_data = JSON.parse(data.raw_data)
    for (var i in raw_data) {
      console.log(raw_data);
      //console.log(raw_data[i]);
      vol = Math.round(((raw_data[i]-empty_weight)*100/(1023- empty_weight) ),2)
      if (vol<0) {
        vol =0
      }
      if (data.instr_name=="water_sever") {
        water_sever_lvl = vol;
      }
      console.log(vol);
    }
    if (chart_name) {
      console.log(chart_name+":"+vol);
      FusionCharts(chart_name).feedData("&value=" + vol);
      $("#"+chart_name+"_tag").html("残量："+vol+"%");
      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/users/',
        data: {
            "name": data.instr_name,
            "uuid": data.instr_name,
            "ip" : data.client_local_ip
        },
        success: function(msg){
          console.log('Success' + msg);
        },
        error: function(msg){
          console.log('Success' + msg);
        }
      });

      $.ajax({
        type: "POST",
        url: 'http://localhost:3000/time_ots',
        data: {
            "present": vol,
            "device_id" : data.instr_name
        },
        success: function(msg){
          console.log('Success' + msg);
        },
        error: function(msg){
          console.log('Success' + msg);
        }
      });
    }
  })
  setInterval(function () {
    //console.log("send_data_realtime"+water_sever_lvl);
    if (socket&&water_sever_lvl) {
      socket.emit("send_data_realtime","raspi_a_02","led_gague",water_sever_lvl)
    }
  },1900)
});
