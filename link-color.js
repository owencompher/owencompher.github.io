const colors = [
    '#78e098',
    '#849ad8',
    '#a776c1',
    '#d8828e',
    '#e8b382'
]
if(document.cookie.indexOf("color")==-1){
    document.cookie = `color=0; path=/; domain=owencompher.me`
}
let colori = document.cookie.substr(document.cookie.indexOf("color")+6, 1)
if(colori.length < 1) colori = 0;
let color = colors[colori]
if(!color) color = colors[0];
document.getElementById('link-color').innerHTML =
    `.link {color: ${color}}`
document.querySelector("link[rel='shortcut icon']").setAttribute('href', `https://owencompher.me/resources/heart/${colori}.png`)

function spinWheel() {
    cycleColors()
    const wheel = document.getElementById("wheel")
    var index = document.cookie.indexOf("color");
    let colori = document.cookie.substr(index + 6, 1)
    if (!colori && parseInt(wheel.src.substr(16,1))<=4) colori = parseInt(wheel.src.substr(16,1))+1
    else if (!colori) colori = 0
    document.getElementById("wheel").src = `https://owencompher.me/resources/wheel/${colori}.png`
}

function cycleColors() {
    var index = document.cookie.indexOf("color");
    if (index == -1) {
        document.cookie = `color=0; path=/; domain=owencompher.me`
        var index = document.cookie.indexOf("color");
    }
    if (parseInt(document.cookie.substr(index + 6, 1)) == 4) document.cookie = `color=0; path=/; domain=owencompher.me`
    else document.cookie = `color=${parseInt(document.cookie.substr(index + 6, 1)) + 1}; path=/; domain=owencompher.me`
    const colori = document.cookie.substr(index + 6, 1)
    let color = colors[colori]
    if (!color) color = colors[0];
    document.getElementById('link-color').innerHTML =
        `.link {color: ${color}}`
}
