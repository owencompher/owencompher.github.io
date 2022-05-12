var style = document.createElement("link");
style.rel = "stylesheet";
style.href = "dark.css";
style.id = "darkStyle"

if(document.cookie.indexOf("dark")==-1){
    document.cookie = `dark=1; path=/; domain=owencompher.me`
}
let theme = parseInt(document.cookie.substr(document.cookie.indexOf("dark")+5, 1));
if(theme!=0 && theme!=1) theme = 1;

if(theme==0) document.head.appendChild(style);
if(theme==1) {
    if(document.getElementById("darkStyle")) document.getElementById("darkStyle").remove();
}

function toggleTheme() {
    let theme = parseInt(document.cookie.substr(document.cookie.indexOf("dark")+5, 1));
    console.log(theme);
    if(theme!=0 && theme!=1) theme = 1;
    console.log(theme);
    if(theme==0) {
        document.cookie = `dark=1; path=/; domain=owencompher.me`;
        if(document.getElementById("darkStyle")) {
            document.getElementById("darkStyle").remove();
        }
    }
    else if(theme==1) {
        document.cookie = `dark=0; path=/; domain=owencompher.me`;
        document.head.appendChild(style);
    }
}
