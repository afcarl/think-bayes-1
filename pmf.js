
// create a new pmf
module.exports = function pmf(){
  var pmf = function(){ }
  // see: http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/
  var hash = Object.create(null)
  pmf.set = function(key, val){ 
    hash[key] = val
    return pmf 
  }
  pmf.prob = function(key){ return hash[key] }
  pmf.inc = function(key, val){
    if(!hash[key]) hash[key] = 0
    hash[key] += val
    return pmf
  }
  pmf.multi = function(key, multiplier){
    pmf.set(key, pmf.prob(key) * multiplier)
    return pmf
  }
  pmf.keys = function(){ return Object.keys(hash) }
  pmf.map = function(func){
    pmf.keys().forEach(function(key){
      hash[key] = func(key, hash[key])
    })
    return pmf
  }
  pmf.each = function(func){
    pmf.keys().forEach(function(key){ func(key, hash[key]) })
  }
  pmf.total = function(){
    var total = 0
    pmf.each(function(key, val){ total += val })
    return total
  }
  pmf.normalize = function(){
    var total = pmf.total()
    pmf.map(function(key, val){ return val / total })
    return pmf
  }
  return pmf
}