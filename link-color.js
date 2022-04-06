const colors = [
    '#78e098',
    '#849ad8',
    '#a776c1',
    '#d8828e',
    '#e8b382'
]
if(document.cookie.indexOf("color")==-1){
    document.cookie = `color=0; path=/`
}
const color = document.cookie.substr(document.cookie.indexOf("color")+6, 1)
document.getElementById('link-color').innerHTML =
    `.link {color: ${colors[color]}}`
