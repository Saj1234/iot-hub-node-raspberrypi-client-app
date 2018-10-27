
'use strict';
class Obd2Sensor {
  constructor(callback) {
    console.log('in constructor');
    var OBDReader = require('bluetooth-obd');
    var btOBDReader = new OBDReader();
    var dataReceivedMarker = {};
     
    btOBDReader.on('connected', function () {
        //this.requestValueByName("vss"); //vss = vehicle speed sensor
     
        this.addPoller("vss");
        this.addPoller("rpm");
        this.addPoller("temp");
        this.addPoller("load_pct");
        this.addPoller("map");
        this.addPoller("frp");
     
        this.startPolling(1000); //Request all values each second.
    });
     
    btOBDReader.on('dataReceived', function (data) {
        console.log(data);
        dataReceivedMarker = data;
    });
     
    // Use first device with 'obd' in the name
    btOBDReader.autoconnect('obd');
    console.log('end constructor');
   
}

  read(callback) {
      console.log("read called");
      //callback(null, "Test call"); 
     
  }
}

module.exports = Obd2Sensor
