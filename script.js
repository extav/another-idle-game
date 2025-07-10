"use strict";

console.log("script loaded successfully");

const gamebox = document.getElementById("gamebox");

function populateMap() {
  const zone1 = document.getElementById("zone1");

  //toggle the class to the map class
  removeClasses("zone1", zone1);
  zone1.classList.add("map");

  // add the title of the zone
  const htext = document.createElement("div");
  htext.classList.add("htext");
  htext.textContent = "Map";
  zone1.append(htext);

  // add the body of the zone
  const body = document.createElement("p");
  body.textContent =
    "This should eventually be a canvas but for " +
    "now its just text right here";
  zone1.appendChild(body);
}

function populateInventory() {
  const zone1 = document.getElementById("zone1");

  //toggle the class to the map class
  removeClasses("zone1", zone1);
  zone1.classList.add("inventory");

  // add the title of the zone
  const htext = document.createElement("div");
  htext.classList.add("htext");
  htext.textContent = "Inventory";
  zone1.append(htext);

  // add the body of the zone
  const body = document.createElement("p");
  body.textContent =
    "This should eventually be cards but for " + "now its just text right here";
  zone1.appendChild(body);
}

function removeClasses(zoneName, zone) {
  if (zoneName == "zone1") {
    zone.classList.remove("map");
    zone.classList.remove("inventory");
  } else {
    print("ERROR: Passed improper zone name to removeClasses");
  }
}

// -------------- Button Stuff ----------- //
function mapButton() {
  const zone2 = document.getElementById("zone1");
  if (!zone2.classList.contains("map")) {
    zone2.innerHTML = "";
    populateMap();
    console.log("populated map");
  }
}

function inventoryButton() {
  const zone2 = document.getElementById("zone1");
  if (!zone2.classList.contains("inventory")) {
    zone2.innerHTML = "";
    populateInventory();
    console.log("populated inventory");
  }
}

// ----------- page setup --------- //
document.getElementById("map-btn").onclick = mapButton;
document.getElementById("inventory-btn").onclick = inventoryButton;
