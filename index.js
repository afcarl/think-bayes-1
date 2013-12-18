var PMF = require('./pmf')

var prob = PMF()
  .set('Bowl 1', 0.5).set('Bowl 2', 0.5)
  .multi('Bowl 1', 0.75).multi('Bowl 2', 0.5)
  .normalize().prob('Bowl 1')

console.log('probability', prob)