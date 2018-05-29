var mysql = require('mysql')
var mysqlUtilities = require('mysql-utilities')
var Promise = require('bluebird')
var prompt = require('prompt')
var _connection = require('./connection')

module.exports = function(obj){
  return new Promise(function(resolve, reject){
    prompt.start();

    prompt.get([{
      name: 'host',
      default: 'localhost'
    }, {
      name: 'user',
      default: 'root'
    }, {
      name: 'password',
      default: 'root',
      hidden: true,
      replace: '*'
    }, {
      name: 'database',
      default: obj.database
    }], function (err, result) {

      if(!err){
        for(var key in result){

          if(result[key] == ''){
            reject(new TypeError('The field ' + key + ' cannot be empty'))
          }else{
            connection = mysql.createConnection({
              host:     result.host,
              user:     result.user,
              password: result.password,
              database: result.database
            });

            mysqlUtilities.upgrade(connection)
            mysqlUtilities.introspection(connection)

            connection.connect(function(err){
              if(err){
                reject(err.message)
              }else{
                _connection.set(connection)
                resolve()
              }
            })
          }

        }
      }else{
        reject(err)
      }

    });
  })
}
