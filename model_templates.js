var fs = require('fs')

module.exports = {
  get: function(name){
    return fs.readFileSync(__dirname + '/templates/' + name + '.js').toString()
  },
}
