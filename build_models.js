var template = require('./model_templates')
var _ = require('underscore')
var fs = require('fs')
var async = require('async')

module.exports = function(obj){
   var tpl = _.template(template.get('sequelize'))

   async.waterfall([
     function(next){
       var modelPromises = []

       for(var key in obj){
         modelPromises.push(tpl({
           model: obj[key],
           modelName: key,
           referencedModel: key
         }))
       }

       Promise
       .all(modelPromises)
       .then((d) => {
         next(null, d)
       })
     },
     function(models, next){
       var filesPromises = []

       for(var key in obj){
         var i = Object.keys(obj).indexOf(key);
         var _text = models[i].replace(/^(?:[\t ]*(?:\r?\n|\r))+/gim, '')
         _text.replace(/    /gim, '')

         filesPromises.push(fs.writeFile(__dirname + '/models/' + key + '.js', _text, function(){}))
       }

       Promise
       .all(filesPromises)
       .then((d) => {
         next(null, d)
       })

     }
   ], function(err, res){
     console.log(err);
     console.log(res);
   })

   // var _text = JSON.stringify(model, null, 4)
   // fs.writeFile(__dirname + '/test.js', model, function(){})
}
