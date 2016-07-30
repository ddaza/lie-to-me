'use strict';
const five = require('johnny-five');
const particle = require('particle-io');
const Shield = require('j5-sparkfun-weather-shield')(five);

let board;
let lastTemp = 0;
let tempDiff = 0;

function lie(keys) {
  function init() {
    board = new five.Board({
      io: new particle({
        token: keys.token,
        deviceId:  keys.deviceId
      })
    });
    console.log('Board connected...');
  }

  function start(cb) {
    board.on('ready', function() {
        console.log('board ready');
        const weather = new Shield({
            variant: 'PHOTON',  // or ARDUINO
            freq: 250,          // Set the callback frequency to 1-second
            elevation: 582      // Go to http://www.WhatIsMyElevation.com to get your current elevation
        });
        const photoresistor = new five.Sensor({
            pin: 'A4',
            freq: 250
        });
        photoresistor.on('data', function onLight(data) {
            console.log(data);
        });

      weather.on('data', function () {
        const led = new five.Led('A5');
        const wetdata = {
          celsius: this.celsius,
          fahrenheit: this.fahrenheit,
          relativeHumidity: this.relativeHumidity,
          pressure: this.pressure,
          feet: this.feet,
          meters: this.meters
        };

        console.log(wetdata);
        tempDiff =  wetdata.celsius - lastTemp;
        if (tempDiff > 0.01) {
            led.on(1);
        } else {
            led.off(1);
        }
        lastTemp = wetdata.celsius;
        cb(wetdata);
      })
    });
  }

  return {
    init: init,
    start: start
  };
}

module.exports = lie;

