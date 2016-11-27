var app = {};

app.map = {}
app.generate = function(size){
  for (var i = 0; i < size; i++) {
    app.map[i] = {}
    for (var j = 0; j < size; j++) {
      app.map[i][j] = {
        status:false,
        livingNeighbors:0
      }
    }
  }
}

app.checkNeighbors = function(map){
  console.log(map);
  var minX= Math.min(parseInt(Object.keys(map)))
  var xLength = Object.keys(map).length
  for (var i = minX; i < xLength; i++) {
    var minY= Math.min(parseInt(Object.keys(map[i])))
    for (var j = minY; j < Object.keys(map[i]).length; j++) {

      map[i][j].livingNeighbors = 0
      check(i,j, map,0,1)
      check(i,j, map,0,-1)
      check(i,j, map,1,1)
      check(i,j, map,1,-1)
      check(i,j, map,1,0)
      check(i,j, map,-1,0)
      check(i,j, map,-1,-1)
      check(i,j, map,-1,1)
    }
  }
  return map
}

function check(x,y,map,xChange,yChange){
  if(map[x+xChange] && map[x+xChange][y+yChange]){
    if(map[x+xChange][y+yChange].status === true){
      map[x][y].livingNeighbors += 1
    }
  }else if(map[x][y].status === true){
    if(!map[x+xChange]){
      map[x+xChange]={}
    }
    map[x+xChange][y+yChange] = {
      status:false,
      livingNeighbors:0
    }
  }
}
app.update = function(map){
  var minX= Math.min.apply(Math, Object.keys(map) )
  var xLength = Object.keys(map).length + minX
  for (var i = minX; i < xLength+minX; i++){
    var minY= Math.min(parseInt(Object.keys(map)[i]))
    for (var j = minY; j < Object.keys(map[i]).length; j++) {
      if(map[i][j].status){
        if(map[i][j].livingNeighbors >3 || map[i][j].livingNeighbors<2){
          map[i][j].status = false;
        }
      }else{
        if(map[i][j].livingNeighbors ===3){
          map[i][j].status = true
        }
      }
    }
  }
}




app.populate = function(map){
  main.innerHTML = ''
  var minX= Math.min.apply(Math, Object.keys(map) )
  var xLength = Object.keys(map).length + minX
  for (var i = minX; i < xLength; i++) {
    var minY= Math.min.apply(Math, Object.keys(map[i]) )
    var yLength = Object.keys(map).length + minY
    var row = document.createElement('div')
    row.setAttribute('class', 'row')
    for (var j = 0; j < Object.keys(map[i]).length; j++) {
      var div = document.createElement('div')
      div.onclick = function(){
        resetMap(this.id)
      }
      div.setAttribute('id', i+'.'+j)
      div.setAttribute('class','inner')
      if(map[i][j].status){
        div.style.backgroundColor = "blue"
      }
      row.appendChild(div)
    }
    main.appendChild(row)
  }
}

app.generate(4)
app.map[0][1].status = true
app.map[1][1].status = true
app.map[1][2].status = true

app.run = function(map){
  app.checkNeighbors(map)
  app.update(map)
  app.populate(map)
}

var nIntervId;

function go(map){
  console.log(map);
  clearInterval(nIntervId);
  nIntervId = setInterval(app.run(map),500)
}

go(app.map)
// app.checkNeighbors(app.map)
// app.update(app.map)
// app.populate(app.map)
