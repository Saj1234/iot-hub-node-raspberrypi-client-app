
'use strict';
var getConnector = require('obd-parser-bluetooth-connection');

function configureFunction (connection) {
    return new Promise(function (resolve, reject) {
      // Set up the obd connection etc.
      conn.write('ATZ');
      conn.write('ATE0');
    });
  }
  
class Obd2SensorParser {
  constructor(callback) {
    console.log('in constructor');
    var connect = getConnector({
        name: 'obd'
      });
      
      connect(configureFunction)
        .then(function () {
          console.log('connected to bluetooth obd adapter!')
        })
        .catch(function (err) {
          console.error('oh noes');
          console.error(err);
        });
    console.log('end constructor');
   
}

  read(callback) {
      console.log("read called in parser");
      //callback(null, "Test call"); 
     
  }
}

module.exports = Obd2SensorParser
