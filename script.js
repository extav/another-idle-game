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

  const canv = document.createElement("canvas");
  canv.id = "mapcanvas";
  canv.height = MAPSIZE;
  canv.width = MAPSIZE;
  zone1.appendChild(canv);

  const buttondiv = document.createElement("div");
  buttondiv.id = "map-navigation";

  const upbtn = document.createElement("button");
  upbtn.textContent = "↑";
  upbtn.onclick = genMapMoveFn(0, -1);
  buttondiv.appendChild(upbtn);

  const downbtn = document.createElement("button");
  downbtn.textContent = "↓";
  downbtn.onclick = genMapMoveFn(0, 1);
  buttondiv.appendChild(downbtn);

  const leftbtn = document.createElement("button");
  leftbtn.textContent = "←";
  leftbtn.onclick = genMapMoveFn(-1, 0);
  buttondiv.appendChild(leftbtn);

  const rightbtn = document.createElement("button");
  rightbtn.textContent = "→";
  rightbtn.onclick = genMapMoveFn(1, 0);
  buttondiv.appendChild(rightbtn);

  zone1.appendChild(buttondiv);
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
  context.clearRect(0, 0, MAPSIZE, MAPSIZE);
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
  context.moveTo(x - 6, y - 3);
  context.lineTo(x + 3 + MAPNODESIZE, y - 3);
  context.lineTo(x + 3 + MAPNODESIZE, y + 3 + MAPNODESIZE);
  context.lineTo(x - 3, y + 3 + MAPNODESIZE);
  context.lineTo(x - 3, y - 3);
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

function genMapMoveFn(delX, delY) {
  return function () {
    // remove selected from the current map node
    for (const mn of mapnodes) {
      if (mn.isSelected) {
        mn.isSelected = false;
      }
    }

    map_position_x += delX;
    map_position_y += delY;

    // add selected to the new center node
    for (const mn of mapnodes) {
      if (mn.isAtLocation(map_position_x + 1.5, map_position_y + 1.5)) {
        mn.isSelected = true;
      }
    }

    drawMap();
  };
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
