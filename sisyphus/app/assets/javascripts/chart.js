FusionCharts.ready(function(){
  fuelWidget = new FusionCharts({
    type: 'cylinder',
    dataFormat: 'json',
    id: 'fuelMeter',
    renderAt: 'chart-container',
    width: '200',
    height: '250',
    dataSource: {
      "chart": {
        "caption": "残量",
        "subcaptionFontBold": "0",
        "lowerLimit": "0",
        "upperLimit": "120",
        "lowerLimitDisplay": "Empty",
        "upperLimitDisplay": "Full",
        "numberSuffix": "%",
        "showValue": "0",
        "showhovereffect": "1",
        "bgCOlor": "#ffffff",
        "borderAlpha": "0",
        "cylFillColor": "#008ee4"
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
    id: 'fuelMeter2',
    renderAt: 'chart-container2',
    width: '200',
    height: '250',
    dataSource: {
      "chart": {
        "caption": "残量",
        "subcaptionFontBold": "0",
        "lowerLimit": "0",
        "upperLimit": "100",
        "lowerLimitDisplay": "Empty",
        "upperLimitDisplay": "Full",
        "numberSuffix": "%",
        "showValue": "0",
        "showhovereffect": "1",
        "bgCOlor": "#ffffff",
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
    width: '200',
    height: '250',
    dataSource: {
      "chart": {
        "caption": "残量",
        "subcaptionFontBold": "0",
        "lowerLimit": "0",
        "upperLimit": "100",
        "lowerLimitDisplay": "Empty",
        "upperLimitDisplay": "Full",
        "numberSuffix": "%",
        "showValue": "0",
        "showhovereffect": "1",
        "bgCOlor": "#ffffff",
        "borderAlpha": "0",
        "cylFillColor": "F92500"
      },
      "value": "0"
    },
    "events":{
      "rendered": function(evtObj, argObj){
        /*
        setInterval(function () {
          vol = 512
          FusionCharts("fuelMeter3").feedData("&value=" + vol);
          $("#present-number").text(Math.round((vol*100/1023),2) + "%")
        }, 1000);
        */
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
}, 1000);


//setInterval(function () {
//  FusionCharts("fuelMeter2").feedData("&value=" + 10);
//},5000)
$(document).ready(function(){
  //何かしらの処理
  var url = "http://192.168.3.11:3333";
  //接続
  var socket = io.connect(url);

  socket.on("real_time_report", function(data){
    var chart_name
    var empty_weight =0
    //console.log(raw_data);
    switch (data.instr_name) {
      case "water_sever":
        chart_name = "fuelMeter"
        empty_weight = 500
        break;
      case "supplement":
        chart_name = "fuelMeter3"
        empty_weight = 200
      default:
        chart_name = "fuelMeter3"
    }
    var vol = 0;
    var raw_data = JSON.parse(data.raw_data)
    for (var i in raw_data) {
      console.log(raw_data);
      console.log(raw_data[i]);
      vol = Math.round(((raw_data[i]-empty_weight)*100/(1023- empty_weight) ),2)
      if (vol<0) {
        vol =0
      }
      console.log(vol);
    }
    if (chart_name) {
      console.log(chart_name);
      FusionCharts(chart_name).feedData("&value=" + vol);
    }
  })

});
