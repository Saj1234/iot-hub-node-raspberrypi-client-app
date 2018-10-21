
'use strict';
var dht = require('dht-sensor');
const defaultOptions = {
  dht: 11, // defaults to DHT11
  bcmGpio: 18 // defaults to 0x77
};

class DHTSensor {
  constructor(options) {
    if(options) {
      defaultOptions = options; 
    }
    this.sensor = dht.read(defaultOptions.dht, defaultOptions.bcmGpio);
  }

  read() {
    return {
      humidity: this.sensor.humidity,
      temperature: this.sensor.temperature
    }
  }
}

module.exports = DHTSensor
