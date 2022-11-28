const colors = [
    '#78e098',
    '#849ad8',
    '#a776c1',
    '#d8828e',
    '#e8b382'
]

let cookie;
try {
    if (document.cookie.split(";")[0].charAt(5) !== '{') {
        // convert cookie from old format
        cookie = {color: parseInt(document.cookie.charAt(document.cookie.indexOf("color")+6))}
        setCookie()
    } else cookie = JSON.parse(document.cookie.split(";")[0].substring(5));
} catch(error) {
    cookie = {color: 0}
    setCookie()
}

updatePage()

function setCookie() { document.cookie = "JSON=" + JSON.stringify(cookie) + "; path=/; domain=owencompher.me" }

function spinWheel() {
    cookie.color = (cookie.color + 1) % 5
    updatePage()
    setCookie()
}

function updatePage() {
    document.getElementById('link-color').innerHTML = `.link {color: ${colors[cookie.color]}}`
    document.querySelector("link[rel='shortcut icon']")
        .setAttribute('href', `https://owencompher.me/resources/heart/${cookie.color}.png`)
    document.getElementById('wheel').src = `https://owencompher.me/resources/wheel/${cookie.color}.png`
}
