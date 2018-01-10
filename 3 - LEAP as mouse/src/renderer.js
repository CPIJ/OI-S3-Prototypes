const Leap = require('leapjs');
const robot = require('robotjs');

let isConnected = false;
let mouseDown = false;

const onFrame = (frame) => {
    if (!isConnected) {
        return;
    }

    const hand = frame.hands[0];
    const box = frame.interactionBox

    if (hand) {
        const index = hand.fingers[0]
        const point = box.normalizePoint(index.tipPosition)
        robot.setMouseDelay(1)

        const pos = {
            x: screen.width * point[0],
            y: screen.height - point[1] * screen.height,
        }

        robot.moveMouse(pos.x, pos.y)

        if (hand.pinchStrength > 0.75) {
            if (!mouseDown) {
                handleClick(pos)
                mouseDown = true;
            }
        } else if (hand.pinchStrength === 0) {
            mouseDown = false;
        }
    }
}

const handleClick = (position) => {
    console.log(position)
}

const controller = new Leap.Controller();
controller.connect()
controller.on('connect', () => isConnected = true)
controller.on('frame', onFrame)