
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
      type: 'thermometer',
      dataFormat: 'json',
      id: 'fuelMeter2',
      renderAt: 'chart-container2',
      width: '250',
      height: '400',
      dataSource: {
        "chart": {
          "caption": "湿度計",
          "subcaptionFontBold": "0",
          "lowerLimit": "0",
          "upperLimit": "80",
          "numberSuffix": "%",
          "showValue": "0",
          "showhovereffect": "1",
          "bgCOlor": "#ececec",
          "borderAlpha": "0",
          "thmFillColor": "eeeeee"
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
      type: 'thermometer',
      dataFormat: 'json',
      id: 'fuelMeter3',
      renderAt: 'chart-container3',
      width: '250',
      height: '400',
      dataSource: {
        "chart": {
          "caption": "温度計",
          "subcaptionFontBold": "0",
          "lowerLimit": "0",
          "upperLimit": "50",
          //"lowerLimitDisplay": "Empty",
          //"upperLimitDisplay": "Full",
          "numberSuffix": "°C",
          "showValue": "0",
          "showhovereffect": "1",
          "bgCOlor": "#ececec",
          "borderAlpha": "0",
          "thmFillColor": "F92500"
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
  //var fuelVolume = 110
  /*
  setInterval(function () {
    (fuelVolume < 10) ? (fuelVolume = 110) : "";
    var consVolume = fuelVolume -(Math.floor(Math.random() * 3));
    FusionCharts("fuelMeter2").feedData("&value=" + consVolume);
    fuelVolume = consVolume;
    $("#fuelMeter2_tag").html("残量："+consVolume+"%")
  }, 1000);
*/

  var url = "http://localhost:3333";
  //接続
  var socket = io.connect(url);

  var water_sever_lvl =0;
  socket.on("real_time_report", function(data){
    var chart_name
    var empty_weight =0
    console.log(raw_data);
    var raw_data = JSON.parse(data.raw_data)
    vol1 = Math.round((100*raw_data.pressure/900),2)
    FusionCharts("fuelMeter").feedData("&value=" + vol1);
    $("#fuelMeter_tag").html("残量："+vol1+"%")

    Temp = raw_data.Temp
    FusionCharts("fuelMeter3").feedData("&value=" + Temp);
    $("#fuelMeter3_tag").html("温度："+Temp+"°C")

    Humi = raw_data.Humi
    FusionCharts("fuelMeter2").feedData("&value=" + Humi);
    $("#fuelMeter2_tag").html("湿度："+Humi+"%")


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
        url: '/users/',
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
        url: '/time_ots',
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
  /*
  setInterval(function () {
    //console.log("send_data_realtime"+water_sever_lvl);
    if (socket&&water_sever_lvl) {
      socket.emit("send_data_realtime","raspi_a_02","led_gague",water_sever_lvl)
    }
  },2500)
  */
});
