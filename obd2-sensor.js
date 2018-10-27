
'use strict';
var OBDReader = require('./OBDReader.js');


class Obd2Sensor {
  constructor(callback) {

    this.obdReader = new OBDReader(false),
    this.monitors = [
        'vss',
        'rpm',
        'temp',
        'iat',
        'maf',
        'map',
        'frp',
        'load_pct',
        'throttlepos'
    ]

    this.obdReader.on('connected', function() {
        console.log('Connected to OBD on '+ obdReader.getPort());
        var self = this;
    
        this.monitors.forEach(function(mon){
            self.addMonitor(mon);
        });
        this.startMonitors();
    
        //io.emit('connected');
    });
    
    this.obdReader.on('dataReceived', function(reply) {
        callback(null, reply);
        //io.emit(reply.name, reply);
    });

    this.obdReader.autoConnectBluetooth('obd');

   
}

  read(callback) {
      console.log("read called");
      //callback(null, "Test call"); 
     
  }
}

module.exports = Obd2Sensor
