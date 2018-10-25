
'use strict';
var obd2 = require("obd2");
var OBD = new obd2({
    device  : "ELM327", // Device type
    serial  : "fake",   // usb, bluetooth
    port    : "COM6",   // Device COM port / path
    baud    : 38400,    // Device baud rate
    delay   : 50,       // Ticker delay time (ms)
    cleaner : true      // Automatic ticker list cleaner ( ex. PID not supported, no response )
});


class Obd2Sensor {
  constructor(callback) {

    // OBD Initializing
    OBD.start( function()
    {
        console.log("starting obd sensor");
        debug("OBD2 example start");

        OBD.listDTC();

        OBD.on("dataParsed", function( type, elem, data )
        {
            callback('obd2 - dataParsed: ' + type + ' - ' + elem + ' - ' + data);
            //console.log('obd2 - dataParsed: ' + type + ' - ' + elem + ' - ' + data );
        });

        OBD.on("pid", function( data )
        {
            callback('pid: '+ data );
            //console.log('pid: '+ data );
        });

        OBD.on("dtc", function( data )
        {
            callback('dtcList: '+ data );
            //console.log('dtcList: ' + data );
        });

        

        OBD.listPID( function( pidList )
        {
            callback(pidList );
            OBD.listDTC();
        });

/* Extra usage code
        OBD.listPID(function( pidList )
        {
            // io.emit list
            io.emit('pidList', pidList );
            // io.emit pid
            OBD.readPID( "0C" );
            // io.emit pid & vss
            OBD.readPID( "0D", function( data )
            {
                io.emit('vss', data );
            });
            // Unavailable, auto clean
            OBD.readPID( "99" );
        });
*/

    });

   
     }

  read(callback) {
      console.log("read called");
      callback(null, "Test call"); 
      OBD.listPID( function( pidList )
      {
          callback(null, pidList); 
          OBD.listDTC();
        
      });
  }
}

module.exports = Obd2Sensor
