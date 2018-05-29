var _ = require('underscore')
var _connection = require('./connection')
var dataType = require('./dataTypes')

module.exports = function(tables){
  return new Promise(function(resolve, reject){
    var promises = []
    var connection = _connection.get()
    var _tables = {}

    for (var i = 0; i < tables.length; i++) {
      promises.push(getFields(tables[i].name))
    }

    Promise.all(promises)
    .then((d) => {
      for(var key in d){
        var props = d[key]
        var name = Object.keys(d[key])[0]

        _tables[name] = props[name]
      }

      resolve(_tables)
    })
    .catch((err) => {
      reject(err)
    })

  })
}

function getFields(table){
  return new Promise(function(resolve, reject){
    var _fields = []
    var _key = {}

    connection.fields(table, function(err, fields){

      if(!err){
        _.chain(fields)
        .map(function(k, v){

          _fields.push({
            field: v,
            type: 'Sequelize.' + dataType(k.Type).toUpperCase(),
            key: k.Key,
            extra: k.Extra,
            canBeNull: k.Null
          })

          _key[table] = _fields
        })

        resolve(_key)

      }else{
        reject(err)
      }
    })
  })
}
