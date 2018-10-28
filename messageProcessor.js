/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';

const SimulatedSensor = require('./simulatedSensor.js');
const Obd2Sensor = require('./obd2-sensor.js');
const Obd2SensorParser = require('./obd2-sensor-parser.js');

function MessageProcessor(option, cb) {
  option = Object.assign({
    deviceId: '[Unknown device] node',
    temperatureAlert: 30
  }, option);
  const sensorType = option.sensorType;
  console.log(sensorType);
  if(sensorType === 'Obd2') {
    console.log('in Obd2');
    this.sensor = new Obd2Sensor((content) => {
      cb(content);
    });
  }  else if(sensorType === 'Obd2Parser') {
    console.log('in Obd2Parser');
    this.sensor = new Obd2SensorParser((content) => {
      cb(content);
    });
  }
  else {
    console.log('in simulated sensor');
    this.sensor = new SimulatedSensor()
  }
  this.deviceId = option.deviceId;
  this.temperatureAlert = option.temperatureAlert
  // this.sensor.init(() => {
     this.inited = true;
  // });
}

MessageProcessor.prototype.getMessage = function (messageId, cb) {
  if (!this.inited) { return; }
  this.sensor.read((err, data) => {
    if (err) {
      console.log('[Sensor] Read data failed: ' + err.message);
      return;
    }

    cb(JSON.stringify({
      messageId: messageId,
      deviceId: this.deviceId,
      data: data}), false);

    // cb(JSON.stringify({
    //   messageId: messageId,
    //   deviceId: this.deviceId,
    //   temperature: data.temperature,
    //   humidity: data.humidity
    // }), data.temperature > this.temperatureAlert);
  });
}

module.exports = MessageProcessor;
