function getFeed(callback) {
   var xhttp = new XMLHttpRequest();
   xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
         callback(this.responseXML);
      }
   };
   xhttp.open("GET", "http://owencompher.me/feed.xml", true);
   xhttp.send();
}

function getRecent(callback) {
   getFeed(function (data) {
      callback(data.getElementsByTagName('entry')[0]);
   });
}

function buildEntryElement(entry) {
   document.getElementById("status-date").innerHTML = entry.getElementsByTagName("updated")[0].childNodes[0].data.substr(0, 10);
   document.getElementById("status-title").innerHTML = entry.getElementsByTagName("title")[0].childNodes[0].data;
   document.getElementById("status-title").setAttribute('href', entry.getElementsByTagName("link")[0].getAttribute('href'));
   document.getElementById("status-summary").innerHTML = entry.getElementsByTagName("summary")[0].childNodes[0].data;
}

