module.exports = {
  set: function(_conn){
    this.conn = _conn
  },
  get: function(){
    return this.conn
  }
}
