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

  const actbtn = document.createElement("button");
  actbtn.textContent = "activate nearby nodes";
  actbtn.onclick = activateNearbyNodes;
  buttondiv.appendChild(actbtn);
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
  zone1.appendChild(htext);

  // add the body of the zone
  const body = document.createElement("p");
  body.textContent =
    "This should eventually be cards but for " + "now its just text right here";
  zone1.appendChild(body);
}

function populateActivity() {
  const zone = document.getElementById("zone2");

  //toggle the class to the map class
  removeClasses("zone2", zone);
  zone.classList.add("activity");

  // add the stats section
  const d1 = document.createElement("div");
  d1.id = "activity-stats";
  zone.appendChild(d1);

  const gtxt = document.createElement("p");
  gtxt.textContent = "Gold";
  gtxt.classList.add("activity-label");
  d1.appendChild(gtxt);

  const gval = document.createElement("p");
  gval.textContent = "0";
  gval.id = "gold-text";
  gval.classList.add("activity-number");
  d1.appendChild(gval);

  const dtxt = document.createElement("p");
  dtxt.textContent = "DPS";
  dtxt.classList.add("activity-label");
  d1.appendChild(dtxt);

  const dval = document.createElement("p");
  dval.textContent = "10";
  dval.id = "dps-text";
  dval.classList.add("activity-number");
  d1.appendChild(dval);

  const upgbtn = document.createElement("button");
  upgbtn.textContent = "Upgrade 10 gold";
  upgbtn.id = "upgrade-button";
  upgbtn.onclick = upgradeButton;
  d1.appendChild(upgbtn);

  // add the activity section
  const d2 = document.createElement("div");
  d2.id = "activity-main";
  zone.appendChild(d2);

  const htext = document.createElement("div");
  htext.classList.add("htext");
  htext.id = "activity-name";
  htext.textContent = "Activity";
  d2.appendChild(htext);

  const enemyHPtxt = document.createElement("p");
  enemyHPtxt.textContent = "Enemy HP: 50";
  enemyHPtxt.id = "hp-text";
  d2.appendChild(enemyHPtxt);

  const pbar = document.createElement("div");
  pbar.id = "activity-progress";
  d2.appendChild(pbar);

  const pfill = document.createElement("div");
  pfill.id = "activity-fill";
  pbar.appendChild(pfill);

  // add the zone progress section

  const d3 = document.createElement("div");
  d3.id = "activity-zoneprog";
  zone.append(d3);

  const ztxt = document.createElement("p");
  ztxt.id = "activity-zoneinfo";
  d3.appendChild(ztxt);

  const k2p = document.createElement("p");
  k2p.textContent = "Kills to progress";
  k2p.classList.add("activity-label");
  d3.appendChild(k2p);

  const k2pnum = document.createElement("p");
  k2pnum.textContent = "10";
  k2pnum.id = "killstoprog-text";
  k2pnum.classList.add("activity-number");
  d3.appendChild(k2pnum);

  const killslabel = document.createElement("p");
  killslabel.textContent = "Zone Kills";
  killslabel.classList.add("activity-label");
  d3.appendChild(killslabel);

  const killsnum = document.createElement("p");
  killsnum.textContent = "0";
  killsnum.classList.add("activity-number");
  killsnum.id = "kill-text";
  d3.appendChild(killsnum);
}

function populateAbout() {
  const zone = document.getElementById("zone1");

  //toggle the class to the map class
  removeClasses("zone1", zone);
  zone.classList.add("about");

  // add the title of the zone
  const htext = document.createElement("div");
  htext.classList.add("htext");
  htext.textContent = "About";
  zone.appendChild(htext);

  // add the body of the zone

  const txt1 = document.createElement("p");
  let str =
    "Try to get as far away from the center" +
    " as you can. Nodes get more rewarding as you travel" +
    " outward. Blue nodes give WAY more gold! Try to find them to get further!";
  txt1.textContent = str;
  zone.appendChild(txt1);
}

function removeClasses(zoneName, zone) {
  if (zoneName == "zone1") {
    zone.classList.remove("map");
    zone.classList.remove("inventory");
    zone.classList.remove("about");
  } else if (zoneName == "zone2") {
    zone.classList.remove("activity");
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

function upgradeButton() {
  if (gameData.gold > gameData.upgradeCost) {
    gameData.gold -= gameData.upgradeCost;
    gameData.upgradeCost = gameData.upgradeCost ** 1.1;
    document.getElementById("upgrade-button").textContent =
      "Upgrade " + Math.round(gameData.upgradeCost) + " gold";
    gameData.strength += gameData.upgradePower;
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

function aboutButton() {
  const zone = document.getElementById("zone1");
  if (!zone.classList.contains("about")) {
    zone.innerHTML = "";
    populateAbout();
    console.log("populated about");
  }
}

// ----------- page setup --------- //

// ----------- Map stuff --------- //

let map_position_x = -1.5;
let map_position_y = -1.5;
const MAPSIZE = 350;
const MAPNODESIZE = 50;
const mapnodes = new Set();
const BASEGOLDVALUE = 10;
const BASETOUGHNESS = 50;

class Mapnode {
  constructor(type, mapx, mapy, isUnlocked, isSelected) {
    this.type = type;
    this.mapx = mapx;
    this.mapy = mapy;
    this.isUnlocked = isUnlocked;
    this.isSelected = isSelected;
    this.kills = 0;
    this.goldValue = this.calcGoldValue();
    this.toughness = this.calcToughness();
  }

  isAtLocation(x, y) {
    // console.log("comparing " + this.mapx + " to " + x)
    return this.mapx == x && this.mapy == y;
  }

  calcDistanceFromOrigin() {
    return Math.sqrt(this.mapx ** 2 + this.mapy ** 2);
  }

  calcGoldValue() {
    // console.log(" gold value")
    return 1.2 ** this.calcDistanceFromOrigin() * BASEGOLDVALUE;
  }

  calcToughness() {
    return 1.3 ** this.calcDistanceFromOrigin() * BASETOUGHNESS;
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
    // first check if the new move is legal
    if (!checkLegalMove(delX, delY)) {
      return;
    }
    // remove selected from the current map node
    for (const mn of mapnodes) {
      if (mn.isSelected) {
        mn.isSelected = false;
      }
    }

    map_position_x += delX;
    map_position_y += delY;
    gameData.damageDealt = 0;

    // add selected to the new center node
    for (const mn of mapnodes) {
      if (mn.isAtLocation(map_position_x + 1.5, map_position_y + 1.5)) {
        mn.isSelected = true;
        gameData.currentNode = mn;
      }
    }

    drawMap();
  };
}

function checkLegalMove(delX, delY) {
  const newx = map_position_x + 1.5 + delX;
  const newy = map_position_y + 1.5 + delY;
  let newNode;
  for (const mn of mapnodes) {
    if (mn.isAtLocation(newx, newy)) {
      newNode = mn;
    }
  }
  return newNode.isUnlocked;
}

function activateNearbyNodes() {
  // activate the top
  for (const mn of mapnodes) {
    if (
      mn.isAtLocation(map_position_x + 1.5, map_position_y + 0.5) ||
      mn.isAtLocation(map_position_x + 0.5, map_position_y + 1.5) ||
      mn.isAtLocation(map_position_x + 2.5, map_position_y + 1.5) ||
      mn.isAtLocation(map_position_x + 1.5, map_position_y + 2.5)
    ) {
      if (!mn.isUnlocked) {
        assignNodeType(mn);
        mn.isUnlocked = true;
      }
    }
  }
  drawMap();
}

function assignNodeType(node) {
  const num = Math.floor(Math.random() * 100);
  if (num < 95) {
    node.type = 1;
  } else {
    node.type = 2;
  }
}

// ----------- activity stuff --------- //

const gameData = {
  killsToProg: 10,
  currentNode: undefined,
  gold: 0,
  strength: 10,
  activity: "fighting",
  lastFightUpdate: undefined,
  genCost: 5,
  upgradeCost: 10,
  upgradePower: 10,
  damageDealt: 0,
  blueNodeMultiplier: 3,
};

function update(timestamp) {
  fight(timestamp);
  // console.log("going!");
  updateActivityZone();
  if (gameData.activity == "fighting") {
    requestAnimationFrame(update);
  }
}
function fight(timestamp) {
  if (
    gameData.lastFightUpdate == undefined ||
    timestamp - gameData.lastFightUpdate > 30000
  ) {
    gameData.lastFightUpdate = timestamp;
  }
  const elapsed = timestamp - gameData.lastFightUpdate;
  gameData.lastFightUpdate = timestamp;
  gameData.damageDealt += (gameData.strength * elapsed) / 1000;
  if (gameData.damageDealt > gameData.currentNode.toughness) {
    gameData.damageDealt = 0;
    barFill();
  }

  updateActivityBar(gameData.damageDealt / gameData.currentNode.toughness);
}

function updateActivityZone() {
  document.getElementById("kill-text").textContent = gameData.currentNode.kills;
  document.getElementById("killstoprog-text").textContent =
    gameData.killsToProg;
  document.getElementById("gold-text").textContent = Math.round(gameData.gold);
  document.getElementById("dps-text").textContent = Math.round(
    gameData.strength
  );
  document.getElementById("hp-text").textContent =
    "Enemy HP: " + Math.round(gameData.currentNode.toughness);
  document.getElementById("activity-name").textContent = gameData.activity;
}

function updateActivityBar(ratio) {
  const fill = document.getElementById("activity-fill");
  fill.style.width = Math.round(ratio * 10000) / 100 + "%";
}

function barFill() {
  gameData.currentNode.kills += 1;
  let newGold = gameData.currentNode.goldValue;
  if (gameData.currentNode.type == 2) {
    newGold *=
      gameData.blueNodeMultiplier **
      gameData.currentNode.calcDistanceFromOrigin();
  }
  gameData.gold += newGold;
  if (gameData.currentNode.kills == gameData.killsToProg) {
    activateNearbyNodes();
  }
}
// ----------- page setup --------- //
window.onload = function () {
  document.getElementById("map-btn").onclick = mapButton;
  document.getElementById("inventory-btn").onclick = inventoryButton;
  document.getElementById("about-btn").onclick = aboutButton;

  const m1 = new Mapnode(1, 0, 0, true, true);
  gameData.currentNode = m1;
  console.log(gameData.currentNode);
  mapnodes.add(m1);
  const m2 = new Mapnode(2, 1, 0, true, false);
  mapnodes.add(m2);

  populateMap();
  drawMap();
  populateActivity();
  requestAnimationFrame(update);
};
