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
  for (var i = 0; i < Object.keys(map).length; i++) {
    for (var j = 0; j < Object.keys(map[i]).length; j++) {
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
    console.log("hit");
    if(!map[x+xChange]){
      map[x+xChange]={}
    }
    map[x+xChange][y+yChange] = {
      status:false,
      livingNeighbors:0
    }
  }
}

app.generate(3)
app.map[1][1].status = true
app.map[1][2].status = true
app.checkNeighbors(app.map)


//module.exports = app;
