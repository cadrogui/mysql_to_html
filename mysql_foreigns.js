var _ = require('underscore')
var _s = require('underscore.string')
var prompt = require('prompt')
var _connection = require('./connection')

module.exports = function(table){
  return new Promise(function(resolve, reject){
    var promises = []

    for (var i = 0; i < table.length; i++) {
      var _tableName = table[i].name
      promises.push(foreign(_tableName))
    }

    Promise.all(promises)
    .then((d) => {
      console.log(d);
      // resolve(d)
    })
    .catch((err) => {
      reject(err)
    })

  })
}

function foreign(table){
  return new Promise(function(resolve, reject){
    var _foreigns = []
    var _key = {}
    var connection = _connection.get()

    connection.foreign(table, function(err, fields){
      if(!err){
        _.chain(fields)
        .map(function(k, v){

          _foreigns.push({
            model: _s.capitalize(k.REFERENCED_TABLE_NAME),
            columnName: k.COLUMN_NAME,
            type: 'FK',
          })

          _key[table] = _foreigns

          // var _br = buildRelations({
          //   tableName: table,
          //   referencedTableName: _s.capitalize(k.REFERENCED_TABLE_NAME),
          //   columnName: _s.capitalize(k.REFERENCED_COLUMN_NAME)
          // })
          //
          // _br.next()

          // console.log(table);
          // console.log(k);
          // console.log('');

          // prompt.get([
          //   table.name + ' hasOne ' + _s.capitalize(k.REFERENCED_TABLE_NAME),
          //   table.name + ' belongsTo ' + _s.capitalize(k.REFERENCED_TABLE_NAME),
          //   table.name + ' hasMany ' + _s.capitalize(k.REFERENCED_TABLE_NAME)
          // ], function(err, res){
          //
          //   if(!err){
          //     _foreigns.push({
          //       model: _s.capitalize(k.REFERENCED_TABLE_NAME),
          //       columnName: k.COLUMN_NAME,
          //       type: 'FK',
          //       associations: res
          //     })
          //     _key[table] = _foreigns
          //
          //     resolve(_key)
          //
          //   }else{
          //     reject(err)
          //   }
          //
          // })
        })

        // console.log(_key);
        resolve(_key)

      }else{
        reject(err)
      }
    })

  })
}

// function* buildRelations(obj){
//   var relations = [
//     'hasOne',
//     'belongsTo',
//     'hasMany'
//   ]
//
//   prompt.start()
//
//   for (var i = 0; i < relations.length; i++) {
//
//     prompt.get([
//       obj.tableName + ' ' + relations[i] + ' ' + obj.referencedTableName
//     ], function(err, res){
//       return res
//     })
//
//   }
//
// }
