illionNames = [
    "",
    "thousand ",
    "million ",
    "billion ",
    "trillion ",
    "quadrillion ",
    "quintillion ",
    "sextillion ",
    "septillion ",
    "octillion ",
    "nonillion",
    "decillion"
]
names = [
    "",
    "one ",
    "two ",
    "three ",
    "four ",
    "five ",
    "six ",
    "seven ",
    "eight ",
    "nine "
]
teens = [
    "ten ",
    "eleven ",
    "twelve ",
    "thirteen ",
    "fourteen ",
    "fifteen ",
    "sixteen ",
    "seventeen ",
    "eighteen ",
    "nineteen "
]
tensNames = [
    "",
    "ten ",
    "twenty ",
    "thirty ",
    "fourty ",
    "fifty ",
    "sixty ",
    "seventy ",
    "eighty ",
    "ninety "
]
exianNames = [
    "",
    "unexian ",
    "biexian ",
    "triexian ",
    "quadexian ",
    "pentexian ",
    "unnilexian ",
    "ununexian ",
    "umbiexian ",
    "untriexian ",
    "unquadrexian ",
    "umpentexian ",
    "binilexian "
]
sixteenNames = [
    "six ",
    "seven ",
    "eight ",
    "nine ",
    "ten ",
    "eleven "
]
sexes = [
    "",
    "six ",
    "dozen ",
    "thirsy ",
    "foursy ",
    "fifsy "
]

function numToText(number) {
    text = "";
    digits = [];
    for(place=Math.floor(Math.log10(number)); place>=0; place--) {
        digit = Math.floor(number / Math.pow(10, place))
            - Math.floor(number / Math.pow(10, place+1)) * 10;
        digits[place] = digit;
    }
    for(i=0; i<digits.length; i++) {
        digit = digits[i];
        illion = Math.floor(i/3);
        local = i%3;
        if(local == 0)
        {
            if(digit+digits[i+1]+digits[i+2] != 0) text = illionNames[illion] + text;
            if(digits[i+1] == 1) {
                text = teens[digit] + text;
            } else {
                text = names[digit] + text;
            }
        }
        if(local == 1 && digit != 1)
        {
            text = tensNames[digit] + text;
        }
        if(local == 2 && digit != 0) text = names[digit] + "hundred " + text;
    }
    return(text);
}
function seximalToNom(number) {
    text = "";
    digits = [];
    for(place=Math.floor(Math.log10(number)); place>=0; place--) {
        digit = Math.floor(number / Math.pow(10, place))
            - Math.floor(number / Math.pow(10, place+1)) * 10;
        digits[place] = digit;
    }
    for(i=0; i<digits.length; i++) {
        digit = digits[i];
        exian = Math.floor(i/4);
        local = i%4;
        /*
          all of these if and else-ifs have a tone of logic which is hard to follow
          but i promise that i did the truth-tables and tested all the cases
          so trust me please
        */
        if(local == 0) {
            if(digit+digits[i+1]+digits[i+2]+digits[i+3] != 0) text = exianNames[exian] + text;
            if(digits[i+1] == 1) {
                text = sixteenNames[digit] + text;
            } else {
                text = names[digit] + text;
            }
        }
        else if(local == 1 && digit != 1) {
            if(digit == 2 && digits[i-1] == 0) text = "twelve " + text;
            else text = sexes[digit] + text;
        }
        else if(local == 2  && (digit != 0 || digits[i+1] != 0)) {
            text = "nif " + text;
            if(digits[i+1] == 1) {
                text = sixteenNames[digit] + text;
            } else {
                text = names[digit] + text;
            }
        }
        else if(local ==3 && digit != 1) {
            if(digit == 2 && digits[i-1] == 0) text = "twelve " + text;
            else text = sexes[digit] + text;
        }
    }
    return text;
}
function changeBase(number, base, newBase) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let i=0;i<number.length;i++) {
        if(chars.indexOf(number.substr(i,1))>=base) return number + " is not valid base " + base;
    }
    var value = 0;
    for(let i=0; i<number.length; i++) {
        value += chars.indexOf(number.substr(-i-1, 1))*(Math.pow(base, i));
    }

    var output = "";
    const length = Math.floor(Math.log(value)/Math.log(newBase)+1);
    for(let i=length-1; i>=0; i--) {
        let place = Math.pow(newBase, i);
        output += chars.substr(Math.floor(value/place), 1);
        value -= place*Math.floor(value/place);
    }
    return number=='0'?'0':output;
}
function normToSexTime(hours, minutes, seconds) {
    let secs = (hours * 3600 + minutes * 60 + seconds) / (86400 / 46656)
    return "is " + (((secs/1296)%36==0)?'0':changeBase((parseInt(secs/1296)%36).toString(), 10, 6)) + ":" +
        (((secs/36)%36==0)?'0':changeBase((parseInt(secs/36)%36).toString(), 10, 6)) + ":" +
        (((secs)%36==0)?'0':changeBase((parseInt(secs)%36).toString(), 10, 6))
}
function getSexTime(date, tz) {
    let secs;
    if(tz == "UTC") {
        secs = (date.getUTCHours() * 3600 + date.getUTCMinutes() * 60 + date.getUTCSeconds()) / (86400 / 46656)
    } else {
        secs = (date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds()) / (86400 / 46656)
    }
    return [(secs/1296|0)%36, (secs/36|0)%36, (secs|0)%36]
}
function byId(elementId) {return document.getElementById(elementId)}
