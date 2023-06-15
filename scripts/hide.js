function toggle(button, content, show, hide) {
    if (content.hasAttribute('hidden')) {
        button.innerHTML = hide;
        content.removeAttribute('hidden');
    } else {
        button.innerHTML = show;
        content.setAttribute('hidden', '');
    }
}