var assert = require("assert")
var code = require("./main")

describe('The Game', function(){
  describe("is a cell", function(){
    it('has a property', function(){
      const cell =  new code.cell()
      assert.deepEqual(false, cell.status)
    })
    it('is an object',function(){
      const cell =  new code.cell()
      assert.deepEqual('object', typeof cell)
    })
  })
  describe("the Map", function(){
    it('getMap returns an array', function(){
      const map = new code.map()
      assert.deepEqual(true, Array.isArray(map.getMap()))
    })
    it('generates a map',function(){
      const map = new code.map()
      map.generateMap()
      currentMap = map.getMap()
      assert.deepEqual(false, currentMap[0][0].status)
    })
  })
  describe('run', function(){
    it('iterates through x number of times', function(){
      assert.deepEqual(3, code.run(3))
    })
  })
  describe('reverses status', function(){
    const map = new code.map()
    map.generateMap()
    currentMap = map.getMap()
    newMap = code.newState(currentMap)
    it('returns an array of arrays', function(){
      assert.deepEqual(true, Array.isArray(newMap[0]))
    })
    it('returns an array of array of cells', function(){
      assert.deepEqual('object', typeof newMap[0][0])
    })
    it('flips states', function(){
      assert.deepEqual(true, newMap[0][0].status)
    })
  })
})
