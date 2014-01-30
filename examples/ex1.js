var PMF = require('../index.js')

var prob = PMF()
  .prob('Bowl 1', 0.5)
  .prob('Bowl 2', 0.5)
  .multi('Bowl 1', 0.75)
  .multi('Bowl 2', 0.5)
  .normalize()

console.log('probability', prob)