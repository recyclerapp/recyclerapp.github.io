
var mapOptions = {
  center: [35.3180305,25.1018764],
  zoom:15
}
var map = new L.map('map',mapOptions);
var layer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',maxZoom:20});
map.addLayer(layer);

var popup = L.popup();
var markers = L.markerClusterGroup();
function onMapClick(e) {
  var htmlPopup = `<a href="http://83.212.102.11:8081/setbins?xPos=`+e.latlng.lat+`&yPos=`+e.latlng.lng+`&binType=0&binEnabled=true">Add Garbage bin`
  popup
      .setLatLng(e.latlng)
      .setContent(`<input id="addGarbageBin" type="button" value="Add Garbage Bin"/>
      <br><input id="addRecyclingBin" type="button" value="Add Recycling Bin"/>
      <br><input id="addBothBin" type="button" value="Add Recycling and Gargabe Bin"/>`)
      .openOn(map);
  document.getElementById("addGarbageBin").onclick = function() {     
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.onreadystatechange= function (){
    if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            console.log("successfully added a bin to the database");
            
    }
    xmlHttp.open("GET",`http://83.212.102.11:8081/setbins?xPos=`+e.latlng.lat+`&yPos=`+e.latlng.lng+`&binType=0&binEnabled=true`,true);
    xmlHttp.send(null);
    var marker = L.marker([e.latlng.lat,e.latlng.lng],garbageBinInfo);
    marker.bindPopup("Garbage Bin");
    markers.addLayer(marker);
  };
  document.getElementById("addRecyclingBin").onclick = function() {     
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange= function (){
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
              console.log("successfully added a bin to the database");
              
      }
      xmlHttp.open("GET",`http://83.212.102.11:8081/setbins?xPos=`+e.latlng.lat+`&yPos=`+e.latlng.lng+`&binType=1&binEnabled=true`,true);
      xmlHttp.send(null);
      var marker = L.marker([e.latlng.lat,e.latlng.lng],recyclingBinInfo);
      marker.bindPopup("Recycling Bin");
      markers.addLayer(marker);
    };
    document.getElementById("addBothBin").onclick = function() {     
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange= function (){
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                console.log("successfully added a bin to the database");
                
        }
        xmlHttp.open("GET",`http://83.212.102.11:8081/setbins?xPos=`+e.latlng.lat+`&yPos=`+e.latlng.lng+`&binType=2&binEnabled=true`,true);
        xmlHttp.send(null);
        var marker = L.marker([e.latlng.lat,e.latlng.lng],bothInfo);
        marker.bindPopup("Recycling And Garbage Bin");
        markers.addLayer(marker);
      };
      console.log(e.latlng.lat + " "+ e.latlng.lng);
      
}

map.on('click', onMapClick);

var garbageBinInfo = {
    title: "Garbage Bin",
    icon:L.icon({iconUrl:'res/garbage-bin.png',iconSize:[35,40]})
}
var recyclingBinInfo = {
    title: "Recycling Bin",
    icon:L.icon({iconUrl:'res/recycling-bin.png',iconSize:[35,40]})
}
var bothInfo = {
    title: "Recycling and Garbage Bin",
    icon:L.icon({iconUrl:'res/both.png',iconSize:[35,40]})
}

var xmlΗttp = new XMLHttpRequest();
xmlΗttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myArr = JSON.parse(this.responseText);
    for(var i =0;i < myArr.length;i++){
      if (myArr[i].BinType == 0){
        var marker = L.marker([myArr[i].BinLocationX,myArr[i].BinLocationY],garbageBinInfo);
      }else if (myArr[i].BinType == 1){
        var marker = L.marker([myArr[i].BinLocationX,myArr[i].BinLocationY],recyclingBinInfo);
      }else {
        var marker = L.marker([myArr[i].BinLocationX,myArr[i].BinLocationY],bothInfo);
      }
      
      markers.addLayer(marker);
    }
  }
};
xmlΗttp.open("GET", "http://83.212.102.11:8081/getbins", true);
xmlΗttp.send();

var marker = L.marker([35.316201,25.101393],bothInfo);
marker.bindPopup("Recycling and Garbage Bin");
markers.addLayer(marker);

var marker = L.marker([35.317013,25.101373],garbageBinInfo);
marker.bindPopup("Garbage Bin");
markers.addLayer(marker);
var marker = L.marker([35.318307 ,25.101186],garbageBinInfo);
marker.bindPopup("Garbage Bin");
markers.addLayer(marker);
var marker = L.marker([35.320021 ,25.102349],garbageBinInfo);
marker.bindPopup("Garbage Bin");
markers.addLayer(marker);
var marker = L.marker([35.319647 ,25.101875],bothInfo);
marker.bindPopup("Recycling and Garbage Bin");
markers.addLayer(marker);
map.addLayer(markers);
