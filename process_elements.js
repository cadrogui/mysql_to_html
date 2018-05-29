module.exports = function(obj){
  var elements = []

  // console.log(obj);
  // process.exit()

  for(var attr in obj){
    var model = {}

    for(var i = 0; i < obj[attr].length; i++){
      // if(obj[attr][i].key != 'PRI'){
      if(obj[attr][i]){

        // model['model'] = attr,
        obj[attr][i]['view_type'] = (function(){

          var val = obj[attr][i].type.split('.')[1]

          switch (val){
            case 'STRING':
              return 'text'
            break;

            case 'TEXT':
              return 'text'
            break;

            case 'INTEGER':
              return 'number'
            break;

            case 'DATETIME':
              return 'date'
            break;

            case 'FK':
              return 'select'
            break;
          }
        })(),

        obj[attr][i]['attrs'] = [{ type: 'ng-model', value: attr + '.' + obj[attr][i].field }],
        obj[attr][i]['label'] = obj[attr][i].field

        // if(typeof obj.attributes[attr] == 'object'){
        //   model['type'] = 'FK'
        // }

        // elements.push(model)

      }
    }

    // elements.push(model)

  }

  return obj
}
