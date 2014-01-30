
// create a new pmf
// the probability that a discrete random variable is exactly equal to some value.
module.exports = function pmf(){
  var pmf = function(){ }
  // see: http://www.devthought.com/2012/01/18/an-object-is-not-a-hash/
  // for why we're not just doing `hash = {}`
  var hash = Object.create(null)
  pmf.prob = function(key, val){
    // set the value
    if(val !== undefined){ hash[key] = val; return pmf }
    // get the value
    else return hash[key]
  }
  // increment the probability of some outcome
  pmf.inc = function(key, val){
    if(!hash[key]) hash[key] = 0
    hash[key] += val
    return pmf
  }
  pmf.multi = function(key, multiplier){
    pmf.prob(key, pmf.prob(key) * multiplier)
    return pmf
  }
  pmf.keys = function(keys){
    // get
    if(keys === undefined) return Object.keys(hash) 
    // set
    pmf.empty()
    keys.forEach(function(key){ hash[key] = 1 / keys.length })
    return pmf
  }
  pmf.empty = function(){ hash = Object.create(null); return pmf }
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
  pmf.toJSON = function(){
    return hash
  }
  pmf.toString = function(){
    return '' + JSON.stringify(hash)
  }
  return pmf
}