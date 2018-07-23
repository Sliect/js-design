Array.prototype.each = function (fn) {
  for (var i = 0; i < this.length; i++) {
    var item = this[i]
    fn.call(null, item, i, this)
  }
}

var arr = [1, 2, 3]

arr.each((item, i, list) => {
  console.log(item, i, list)
})