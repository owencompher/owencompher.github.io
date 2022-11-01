let coll;
for (coll of document.getElementsByClassName("collapsible")) {
    coll.addEventListener("click", function() {
        const content = this.nextElementSibling;
        if (content.style.display === "block") {
            this.innerHTML = this.innerHTML.replace("-", "+")
            content.style.display = "none";
        } else {
            this.innerHTML = this.innerHTML.replace("+", "-")
            content.style.display = "block";
        }
    });
}