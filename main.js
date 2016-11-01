var app = {};

app.cell = function Cell(){
  this.status = false;
  this.x = null;
  this.y = null;
  this.livingNeighbors = null
}

app.map = function Map(){
  let currentMap=[];

  this.generateMap = function(random){
    currentMap =[];
    for (var i = 0; i < 100; i++) {
      currentMap.push([])
      for (var j = 0; j < 100; j++) {
        let newCell = new app.cell()
        if (random) {
          if(Math.floor(Math.random()*2)<1){
            newCell.status = true;
          }
        }
        newCell.x = j;
        newCell.y = i;
        currentMap[i].push(newCell)
      }
    }
  }
  this.getMap = function(){
    return currentMap
  }
}

app.run = function(num){
  let iteration = 0;
  var map = new app.map()
  map.generateMap()
  var currentMap = map.getMap()

  for (var i = 0; i < num; i++) {
    app.newState(currentMap)
    app.checkStatus(currentMap)
    iteration += 1
  }
  return iteration
}
app.checkNeighbors = function(arr){
  let newState = []
  for (var i = 0; i < arr.length; i++) {
    newState.push([])
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j].livingNeighbors = 0
      checkRight(arr[i][j], arr)
      checkLeft(arr[i][j], arr)
      checkTop(arr[i][j], arr)
      checkBottom(arr[i][j], arr)
      checkTopLeft(arr[i][j], arr)
      checkTopRight(arr[i][j], arr)
      checkBottomRight(arr[i][j], arr)
      checkBottomLeft(arr[i][j], arr)
    }
  }
  return arr
}

function checkRight(cell,map){
  var x = cell.x
  var y = cell.y
  if(map[y][x+1]){
    if(map[y][x+1].status === true)
    cell.livingNeighbors +=1
  }
}
function checkLeft(cell,map){
  var x = cell.x
  var y = cell.y
  if(map[y][x-1]){
    if(map[y][x-1].status === true)
    cell.livingNeighbors +=1
  }
}
function checkTop(cell,map){
  var x = cell.x
  var y = cell.y
  if(map[y-1]){
    if(map[y-1][x].status === true)
    cell.livingNeighbors +=1
  }
}
function checkBottom(cell,map){
  var x = cell.x
  var y = cell.y
  if(map[y+1]){
    if(map[y+1][x].status === true)
    cell.livingNeighbors +=1
  }
}
function checkTopLeft(cell,map){
  var x = cell.x
  var y = cell.y
  if(map[y-1] &&map[y-1][x-1]){
    if(map[y-1][x-1].status === true)
    cell.livingNeighbors +=1
  }
}
function checkTopRight(cell,map){
  var x = cell.x
  var y = cell.y
  if(map[y-1] &&map[y-1][x+1]){
    if(map[y-1][x+1].status === true)
    cell.livingNeighbors +=1
  }
}
function checkBottomLeft(cell,map){
  var x = cell.x
  var y = cell.y
  if(map[y+1] &&map[y+1][x-1]){
    if(map[y+1][x-1].status === true)
    cell.livingNeighbors +=1
  }
}
function checkBottomRight(cell,map){
  var x = cell.x
  var y = cell.y
  if(map[y+1] &&map[y+1][x+1]){
    if(map[y+1][x+1].status === true)
    cell.livingNeighbors +=1
  }
}

app.checkStatus = function(map){
  for (var i = 0; i < map.length; i++) {
    for (var j = 0; j < map.length; j++) {
      let cell = map[i][j]
      if(cell.status){
        if(cell.livingNeighbors >3 ||cell.livingNeighbors<2){
          cell.status = false;
        }
      }else{
        if(cell.livingNeighbors ===3){
          cell.status = true
        }
      }
    }
  }
}

function populate(){
  main.innerHTML =""
  for (var i = 0; i < currentMap.length; i++) {
    var row = document.createElement('div')
    row.setAttribute('class', 'row')
    for (var j = 0; j < currentMap[i].length; j++) {
      var div = document.createElement('div')
      div.onclick = function(){
        resetMap(this.id)
      }
      div.setAttribute('id', i+'.'+j)
      if(currentMap[i][j].status){
        div.style.backgroundColor = "blue"
      }
      div.setAttribute('class','inner')
      row.appendChild(div)
    }
    main.appendChild(row)
  }
}

function resetMap(id){
  var arr = id.split('.')
  var i = arr[0]
  var j = arr[1]
  console.log(currentMap[i][j].status);

  currentMap[i][j].status = !currentMap[i][j].status
  console.log(currentMap[i][j].status);
  populate()
}

function iterate(){
  app.checkNeighbors(currentMap)
  app.checkStatus(currentMap)
  populate()
}

var main = document.getElementById('main')
var randomButton = document.getElementById('randomButton')
var startButton = document.getElementById('startButton')
var generateButton = document.getElementById('generateButton')
var stopButton = document.getElementById('stopButton')
var text = document.createElement('h1')

var map = new app.map()
var currentMap = map.getMap()

var nIntervId;

function go(){
  nIntervId = setInterval(iterate,250)
}

randomButton.onclick = function(){
  map.generateMap(true)
  currentMap = map.getMap()
  go()
}
stopButton.onclick = function(){
   clearInterval(nIntervId);
}
startButton.onclick = function(){
  go()
}
generateButton.onclick = function(){
  clearInterval(nIntervId);
  map.generateMap()
  currentMap = map.getMap()
  populate()
}



//module.exports = app;
