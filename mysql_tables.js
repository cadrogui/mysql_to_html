var _ = require('underscore')
var _connection = require('./connection')

module.exports = function(connection){
  return new Promise(function(resolve, reject){
    var _tables = []
    var connection = _connection.get()

    connection.tables(function(err, tables){
      if(!err){
        _.chain(tables)
        .map(function(k, v){
          _tables.push({ name: v})
        })

        resolve(_tables)
      }else{
        reject(err)
      }
    })
  })
}
