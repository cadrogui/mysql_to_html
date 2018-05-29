module.exports = function(_type){
  _type = _type.match(/([A-Za-z])\w+/g)[0]

  switch(_type){
    case 'varchar':
      type = "STRING"
    break;

    case 'text':
      type = 'TEXT'
    break;

    case 'int':
      type = "INTEGER"
    break;

    case 'tinyint':
      type = 'TINYINT'
    break;

    case 'date':
      type = "DATE"
    break;

    case 'time':
      type = "TIME"
    break;

    case 'datetime':
      type = "DATE"
    break;

    case 'boolean':
      type = "BOOLEAN"
    break;

    case 'binary':
      type = "BINARY"
    break;

    case 'aray':
      type = "ARRAY"
    break;

    case 'json':
      type = "JSON"
    break;
  }

  return type
}
