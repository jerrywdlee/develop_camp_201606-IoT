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
        "upperLimit": "120",
        "lowerLimitDisplay": "Empty",
        "upperLimitDisplay": "Full",
        "numberSuffix": "%",
        "showValue": "0",
        "showhovereffect": "1",
        "bgCOlor": "#ffffff",
        "borderAlpha": "0",
<<<<<<< HEAD
        "cylFillColor": "#008ee4"
=======
        "cylFillColor": "#ffff00"
>>>>>>> jerrywdlee/master
      },
      "value": "110"
    },
    "events":{
      "rendered": function(evtObj, argObj){
        setInterval(function () {
          (fuelVolume < 10) ? (fuelVolume = 110) : "";
          var consVolume = fuelVolume -(Math.floor(Math.random() * 3));
          FusionCharts("fuelMeter").feedData("&value=" + consVolume);
          fuelVolume = consVolume;
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