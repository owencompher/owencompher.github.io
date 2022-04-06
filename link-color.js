const colors = [
    '#78e098',
    '#849ad8',
    '#a776c1',
    '#d8828e',
    '#e8b382'
]
document.getElementById('link-color').innerHTML =
    `.link {color: ${colors[Math.floor(Math.random() * 5)]}}`
