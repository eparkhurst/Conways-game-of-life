var app = {};

app.map = {}
app.generate = function(size){
  for (var i = 0; i < size; i++) {
    app.map[i] = {}
    for (var j = 0; j < size; j++) {
      app.map[i][j] = false
    }
  }
}

app.generate(3)
console.log(app.map);


//module.exports = app;
