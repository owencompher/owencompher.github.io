let frog = {
    sprite: 0,
    pos: 50,
    q: []
};

function update() {
    const frogElem = document.getElementById('frog');
    frogElem.setAttribute("src", `resources/image/frog/${frog.sprite-(frog.sprite<10?0:8)}.png`);
    frogElem.setAttribute("style", `transform: scaleX(${frog.sprite<10?-1:1});
                                    position: relative;
                                    left: ${frog.pos}%`);
}

let timer = setInterval(function() {
    switch (frog.sprite) { // move the frog if jumping
        case 5: frog.pos += 0.5; break;
        case 6: frog.pos += 2; break;
        case 7: frog.pos += 2; break;
        case 8: frog.pos += 1; break;
        case 13: frog.pos -= 0.5; break;
        case 14: frog.pos -= 2; break;
        case 15: frog.pos -= 2; break;
        case 16: frog.pos -= 1; break;
    }
    let item = frog.q.pop();
    if (item || item == 0) { // do queue item
        frog.sprite = item;
    } else { // pick an action to queue
        let choice = Math.random();
        switch (frog.sprite) {
            case 10: // facing left
                if (choice > 0.9 || frog.pos < 5) frog.q.push(0,0,0,17); // turn middle
                else if (choice > 0.7) frog.q.push(10,16,15,14,13); // jump left
                else if (choice > 0.4) frog.q.push(10,11,12,12,12,11); // croak right
                break;
            case 0: // facing front
                if (choice > 0.75) frog.q.push(0,1); // blink
                else if (choice > 0.65) frog.q.push(2,2,2,9); // turn right
                else if (choice > 0.55) frog.q.push(10,10,10,17); // turn left
                break;
            case 2: // facing right
                if (choice > 0.9 || frog.pos > 95) frog.q.push(0,0,0,9) // turn middle
                else if (choice > 0.7) frog.q.push(2,8,7,6,5); // jump right
                else if (choice > 0.4) frog.q.push(2,3,4,4,4,3); // croak right
                break;
        }
    }
    update();
}, 200);
