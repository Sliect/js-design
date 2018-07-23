var mult = function () {
  var res = 1
  for (var i = 0, item; item = arguments[i++];) {
    res *= item
  }

  return res
}

var plus = function () {
  var res = 0
  for (var i = 0, item; item = arguments[i++];) {
    res += item
  }

  return res
}

var createProxyFactory = function (fn) {
  var cache = {}
  return function () {
    var args = Array.prototype.join.call(arguments, ',')
    if (args in cache) {
      return cache[args]
    }
    return cache[args] = fn.apply(this, arguments)
  }
}

var proxyMult = createProxyFactory(mult),
  proxyPlus = createProxyFactory(plus)

console.log(proxyPlus(3, 4, 5))
console.log(proxyPlus(3, 4, 5, 6))