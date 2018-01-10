const Leap = require('leapjs')
require('../lib/leap-plugins/screen-position')

let isConnected = false;

const onFrame = (frame) => {
    if (isConnected) {
        frame.hands.forEach(hand => {
            document.getElementById('x').innerHTML = `x: ${hand.screenPosition()[0].toFixed(2)}`;
            document.getElementById('y').innerHTML = `y: ${hand.screenPosition()[1].toFixed(2)}`;
            document.getElementById('z').innerHTML = `z: ${hand.screenPosition()[2].toFixed(2)}`;
        })
    }
}

const controller = new Leap.Controller();
controller.connect()

controller.use('screenPosition');
controller.on('connect', () => isConnected = true)
controller.on('frame', onFrame)