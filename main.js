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


app.checkNeighbors = function(arr){
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr[i].length; j++) {
      arr[i][j].livingNeighbors = 0
      check(arr[i][j], arr,0,1)
      check(arr[i][j], arr,0,-1)
      check(arr[i][j], arr,1,1)
      check(arr[i][j], arr,1,-1)
      check(arr[i][j], arr,1,0)
      check(arr[i][j], arr,-1,0)
      check(arr[i][j], arr,-1,-1)
      check(arr[i][j], arr,-1,1)
    }
  }
  return arr
}

function check(cell,map,xChange,yChange){
  var x = cell.x
  var y = cell.y
  if(map[y+yChange] && map[y+yChange][x+xChange]){
    if(map[y+yChange][x+xChange].status === true)
    cell.livingNeighbors += 1
  }
}


app.checkStatusAndPopulate = function(map){
  main.innerHTML = ''
  for (var i = 0; i < map.length; i++) {
    var row = document.createElement('div')
    row.setAttribute('class', 'row')
    for (var j = 0; j < map.length; j++) {
      var div = document.createElement('div')
      div.onclick = function(){
        resetMap(this.id)
      }
      div.setAttribute('id', i+'.'+j)
      div.setAttribute('class','inner')
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
      if(cell.status){
        div.style.backgroundColor = "blue"
      }
      row.appendChild(div)
    }
    main.appendChild(row)
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
  currentMap[i][j].status = !currentMap[i][j].status
  populate()
}

function iterate(){
  app.checkNeighbors(currentMap)
  app.checkStatusAndPopulate(currentMap)
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
  clearInterval(nIntervId);
  nIntervId = setInterval(iterate,500)
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
