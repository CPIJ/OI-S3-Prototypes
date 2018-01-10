const controller = Leap.loop({ enableGesutres: true }, (frame) => {
    frame.hands.forEach(hand => {
        document.getElementById('x').innerHTML = `x: ${hand.screenPosition()[0].toFixed(2)}`;
        document.getElementById('y').innerHTML = `y: ${hand.screenPosition()[1].toFixed(2)}`;
        document.getElementById('z').innerHTML = `z: ${hand.screenPosition()[2].toFixed(2)}`;
    })
}).use('screenPosition');

