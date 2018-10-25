/*
* IoT Hub Raspberry Pi NodeJS - Microsoft Sample Code - Copyright (c) 2017 - Licensed MIT
*/
'use strict';

const Bme280Sensor = require('./bme280Sensor.js');
const DhtSensor = require('./dhtsensor.js');
const SimulatedSensor = require('./simulatedSensor.js');
const Obd2Sensor = require('./obd2-sensor.js');

function MessageProcessor(option, cb) {
  option = Object.assign({
    deviceId: '[Unknown device] node',
    temperatureAlert: 30
  }, option);
  const sensorType = option.sensorType;
  if(sensorType === 'DhtSensor') {
    this.sensor = new DhtSensor()
  } else if(sensorType === 'Bme280') {
    this.sensor = new Bme280Sensor(option.i2cOption);
  }
 else if(sensorType === 'Obd2') {
  this.sensor = new Obd2Sensor((content) => {
    cb(content);
  });
  }
  else {
    this.sensor = new SimulatedSensor()
  }
  this.deviceId = option.deviceId;
  this.temperatureAlert = option.temperatureAlert
  this.sensor.init(() => {
    this.inited = true;
  });
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
