var compose = function() {
  var args = arguments
  var start = args.length - 1

  return function() {
    var i = start
    var res = args[start].apply(this, arguments)
    while(i--) {
      res = args[i].call(this, res)
    }
    return res
  }
}

function addOne(val) {
  return val + 1
}

function double(val) {
  return val * 2
}

function square(val) {
  return val * val
}

let operator = compose(addOne, double, square)
console.log(operator(3))