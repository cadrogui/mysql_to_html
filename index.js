var _mysql_db = require('./mysql_connection')({
  database: 'agroprim'
})
var _mysql_tables = require('./mysql_tables')
var _mysql_fields = require('./mysql_fields')
var _mysql_foreigns = require('./mysql_foreigns')
var _build_models = require('./build_models')
var _process_elements = require('./process_elements')
var _write_html = require('./write_html')

var _ = require('underscore')

_mysql_db
.then(_mysql_tables)
.then(_mysql_fields)
.then(_process_elements)
// .then((obj) => {
//   console.log(obj.abonos[1]);
//   process.exit()
//   // var group = _.groupBy(obj, 'model')
//   // console.log(group);
// })
.then(_write_html)
.then(t => console.log(t))
.then((d) => {

  // var tt = _.groupBy(d, 'model')
  //
  // console.log(tt);

  // var promises = []
  //
  // for (var i = 0; i < d.length; i++) {
  //   promises.push(_write_html(d[i]))
  // }
  //
  // Promise.all(promises)
  // .then((value) => {
  //   console.log(value);
  // })
  // .catch((err) => {
  //   console.log(err);
  // })
})
.catch(e => console.log(e))
