function toggle(button, content, show, hide) {
    if (content.style.display == 'none') {
        button.innerHTML = hide;
        content.style.display = 'initial';
    } else {
        button.innerHTML = show;
        content.style.display = 'none';
    }
}