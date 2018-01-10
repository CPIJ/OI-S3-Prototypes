const Leap = require('leapjs');
const robot = require('robotjs');
const P5 = require('p5');
const ipcRenderer = require('electron').ipcRenderer;

let mouseDown = false;

new P5((p5) => {
    let hands = [];
    let controller;
    let isConnected = false;
    let canvas;

    p5.setup = () => {
        controller = new Leap.Controller();
        controller.connect()
        controller.on('connect', () => isConnected = true)
        controller.on('frame', onFrame)

        canvas = p5.createCanvas(window.innerWidth, window.innerHeight)
    }

    p5.draw = () => {
        if (hands.length === 0) {
            return;
        }

        p5.clear();

        if (hands.length > 0 && !mouseDown) {
            const x1 = Math.min(...hands.map(h => h.x))
            const x2 = Math.max(...hands.map(h => h.x))
            const y1 = Math.min(...hands.map(h => h.y))
            const y2 = Math.max(...hands.map(h => h.y))

            const w = (x2 - x1)
            const h = (y2 - y1)

            const margin = 30;

            const rect = {
                x: parseInt(x1 - margin),
                y: parseInt(y1 - margin),
                width: parseInt(w + (margin * 2)),
                height: parseInt(h + (margin * 2)),
            }

            ipcRenderer.send('move', rect)
            canvas = p5.createCanvas(window.innerWidth, window.innerHeight)

            const r = 20;

            p5.fill(255, 0, 255);
            p5.stroke(255, 0, 255);

            p5.ellipse(r, r, r)

            if (hands.length === 2) {
                p5.ellipse(w, h, r)
            }
        }
    }

    const handleClick = (pos, hand) => {
       robot.moveMouse(pos.x, pos.y)

       if(hand.pinchStrength > 0.25) {
           robot.moveMouse(pos.x, pos.y++)
       }
    }

    const onFrame = (frame) => {
        if (!isConnected) {
            return;
        }

        hands = [];
        id = 0;

        if (frame.hands.length === 0) {
            return;
        }

        frame.hands.forEach((hand) => {
            const box = frame.interactionBox

            const index = hand.fingers[0]
            const point = box.normalizePoint(hand.palmPosition)

            const pos = {
                id: id++,
                x: screen.width * point[0],
                y: screen.height - point[1] * screen.height,
            }

            hands.push(pos);

            if (hand.pinchStrength > 0.75) {
                    handleClick(pos, hand)
            }
            })
        }
    })


ipcRenderer.on('reaction', (sender, args) => {
    console.log(args)
})

