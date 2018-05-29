var async = require('async')
var fs = require('fs')
var _ = require('underscore')
var _s = require('underscore.string')

module.exports = function(obj){
  return new Promise(function(resolve, reject){

    var FildersPromises = []
    var listsPromises = []
    var viewPromises = []
    var Folders = []
    var noo = function(){}
    var matainer_html, list_html

    function iterate(array, cb){
      for (var i = 0; i < array.length; i++) {
        cb(i)
      }
    }

    async.waterfall([
      function(next){
        _template = fs.readFileSync(__dirname + '/templates/template.html')
        _templateList = fs.readFileSync(__dirname + '/templates/template.list.html')
        _templateView = fs.readFileSync(__dirname + '/templates/template.view.html')

        var tpl = _.template(_template.toString())
        var tplList = _.template(_templateList.toString())
        var tplView = _.template(_templateView.toString())

        next(null, {
          tpl: tpl,
          tplList: tplList,
          tplView: tplView,
        })
      },
      function(templates, next){
        for(var key in obj){
            var dir = process.cwd() + '/' + key

            Folders.push(dir)

            if(!fs.existsSync(dir)){
              FildersPromises.push(fs.mkdirSync(dir))
            }else{
              // next(new Error('Folder Exists ' + dir), null)
            }
        }

        Promise.all(FildersPromises)
        .then((f) => {
          next(null, Folders, templates)
        })
      },
      function(folders, templates, next){
        for(var key in obj){

          console.log({
            data: obj[key],
            model: key
          });

          fs.writeFile(key + '/mantenedor.html', templates.tpl({
            data: obj[key],
            model: key
          }), noo)

          fs.writeFile(key + '/list.html', templates.tplList({
            data: obj[key],
            model: key
          }), noo)

          fs.writeFile(key + '/view.html', templates.tplView({
            data: obj[key],
            model: key
          }), noo)
        }

        next(null, { status: 'done' })
      },
      // function(templates, next){
      //   iterate(array, function(i){
      //     fs.writeFile(folders[i] + '/list.html', templates.tplList({
      //       data: array[i]
      //     }), noo)
      //
      //     if(array.length -1 == i){
      //       next(null, null)
      //     }
      //   })
      // }
    ], function(err, res){
      if(!err){
        console.log('Views Files Created');
      }else{
        console.log(err);
      }
    })

  })
}
