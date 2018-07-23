var salesOffices = {}

salesOffices.clientList = []

salesOffices.listen = function (key, fn) {
  if (!this.clientList[key]) this.clientList[key] = []

  this.clientList[key].push(fn)
}

salesOffices.trigger = function () {
  var key = Array.prototype.shift.call(arguments)
  var fns = this.clientList[key]
  if (!fns || fns.length === 0) {
    return false
  }
  fns.forEach(item => {
    item.apply(null, arguments)
  })
}

salesOffices.listen('squareMeter88', function (price) {
  console.log('custom1', 'squareMeter88', price)
})
salesOffices.listen('squareMeter88', function (price) {
  console.log('custom2', 'squareMeter88', price)
})
salesOffices.listen('squareMeter110', function (price) {
  console.log('squareMeter110', price)
})

salesOffices.trigger('squareMeter88', 20000)
salesOffices.trigger('squareMeter110', 30000)