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
  zone1.appendChild(htext);

  // add the body of the zone
  const body = document.createElement("p");
  body.textContent =
    "This should eventually be a canvas but for " +
    "now its just text right here";
  zone1.appendChild(body);

  const canv = document.createElement("canvas");
  canv.id = "mapcanvas";
  canv.height = MAPSIZE;
  canv.width = MAPSIZE;
  zone1.appendChild(canv);
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
    drawMap();
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

// ----------- Map stuff --------- //

let map_position_x = -1.5;
let map_position_y = -1.5;
const MAPSIZE = 350;
const MAPNODESIZE = 50;
const mapnodes = new Set();

class Mapnode {
  constructor(type, mapx, mapy, isUnlocked, isSelected) {
    this.type = type;
    this.mapx = mapx;
    this.mapy = mapy;
    this.isUnlocked = isUnlocked;
    this.isSelected = isSelected;
  }

  isAtLocation(x, y) {
    // console.log("comparing " + this.mapx + " to " + x)
    return this.mapx == x && this.mapy == y;
  }
}

function drawMap() {
  const canv = document.getElementById("mapcanvas");
  console.log(canv);
  const context = canv.getContext("2d");
  console.log(context);
  // context.arc(75, 75, 10, 0, 2 * Math.PI, 1);
  const ntd = getNodesToDraw();

  console.log(ntd);
  console.log(mapnodes);
  for (let mn of ntd.values()) {
    if (mn.type == 1) {
      context.fillStyle = "green";
    } else if (mn.type == 2) {
      context.fillStyle = "blue";
    } else {
      context.fillStyle = "grey";
    }

    const mn_pixelx = (mn.mapx - map_position_x) * 100;
    const mn_pixely = (mn.mapy - map_position_y) * 100;

    context.fillRect(mn_pixelx, mn_pixely, MAPNODESIZE, MAPNODESIZE);
    context.fillStyle = "white";
    const str = "(" + mn.mapx + "," + mn.mapy + ")";
    context.fillText(str, mn_pixelx + 13, mn_pixely + 10);
    console.log("filled rect");
    if (mn.isSelected) {
      outlineSelected(context, mn_pixelx, mn_pixely);
    }
  }
}

function outlineSelected(context, x, y) {
  context.strokeStyle = "gold";
  context.lineWidth = 6;
  context.beginPath();
  context.moveTo(x-6, y-3);
  context.lineTo(x+3 + MAPNODESIZE, y-3);
  context.lineTo(x+3 + MAPNODESIZE, y+3 + MAPNODESIZE);
  context.lineTo(x-3, y+3 + MAPNODESIZE);
  context.lineTo(x-3, y-3);
  context.stroke();
  context.closePath();
}

function getNodesToDraw() {
  const xvals = [];
  const yvals = [];
  for (let i = 1; i < 4; i++) {
    xvals.push(Math.floor(map_position_x + i));
    yvals.push(Math.floor(map_position_y + i));
  }

  const nodes = new Set();
  for (let x of xvals) {
    for (let y of yvals) {
      let foundOne = false;
      for (let mn of mapnodes) {
        if (mn.isAtLocation(x, y)) {
          nodes.add(mn);
          foundOne = true;
          console.log("found one!");
        }
      }
      if (!foundOne) {
        const newNode = new Mapnode(0, x, y);
        mapnodes.add(newNode);
        nodes.add(newNode);
      }
    }
  }
  return nodes;
}
// ----------- page setup --------- //
window.onload = function () {
  document.getElementById("map-btn").onclick = mapButton;
  document.getElementById("inventory-btn").onclick = inventoryButton;

  const m1 = new Mapnode(1, 0, 0, true, true);
  mapnodes.add(m1);
  const m2 = new Mapnode(2, 1, 0, true, false);
  mapnodes.add(m2);

  populateMap();
  drawMap();
};
