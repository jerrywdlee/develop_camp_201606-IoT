//接続先の指定
var url = "http://localhost:3333";
//接続
var socket = io.connect(url);

FusionCharts.ready(function(){
  var fuelVolume = 110,
  fuelWidget = new FusionCharts({
    type: 'cylinder',
    dataFormat: 'json',
    id: 'fuelMeter',
    renderAt: 'chart-container',
    width: '200',
    height: '250',
    dataSource: {
      "chart": {
        "caption": "残業",
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
        "cylFillColor": "#ffff00"
      },
      "value": "0"
    },
    "events":{
      "rendered": function(evtObj, argObj){
        setInterval(function () {
          socket.on("real_time_report", function(data){
            FusionCharts("fuelMeter").feedData("&value=" + data.raw_data.match(/\d+/)[0]);
            $("#present-number").text(data.raw_data.match(/\d+/)[0] + "%")
          })
        }, 1000);
      }
    }
  }).render();
});

FusionCharts.ready(function(){
  var fuelVolume = 110,
  fuelWidget = new FusionCharts({
    type: 'cylinder',
    dataFormat: 'json',
    id: 'fuelMeter2',
    renderAt: 'chart-container2',
    width: '200',
    height: '250',
    dataSource: {
      "chart": {
        "caption": "残業",
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
      "value": "0"
    },
    "events":{
      "rendered": function(evtObj, argObj){
        setInterval(function () {
          socket.on("real_time_report2", function(data){
            console.log(data)
            FusionCharts("fuelMeter2").feedData("&value=" + data.raw_data.match(/\d+/)[0]);
            $("#present-number").text(data.raw_data.match(/\d+/)[0] + "%")
          })
        }, 1000);
      }
    }
  }).render();
});

FusionCharts.ready(function(){
  var fuelVolume = 110,
  fuelWidget = new FusionCharts({
    type: 'cylinder',
    dataFormat: 'json',
    id: 'fuelMeter3',
    renderAt: 'chart-container3',
    width: '200',
    height: '250',
    dataSource: {
      "chart": {
        "caption": "残業",
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
        setInterval(function () {
          socket.on("real_time_report3", function(data){

            FusionCharts("fuelMeter3").feedData("&value=" + data.raw_data.match(/\d+/)[0]);
            $("#present-number").text(data.raw_data.match(/\d+/)[0] + "%")
          })

        }, 1000);
      }
    }
  }).render();
});