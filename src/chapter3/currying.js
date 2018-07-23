// var cost = (function () {
//   var args = []

//   return function () {
//     if (arguments.length === 0) {
//       var money = 0
//       for (var i = 0, monthlyCost; monthlyCost = args[i++];) {
//         money += monthlyCost
//       }
//       return money
//     }

//     [].push.apply(args, arguments)
//   }
// })()

// cost(100)
// cost(200)
// cost(300)
// console.log(cost())


var currying = function (fn) {
  var args = []

  return function () {
    if (arguments.length === 0) {
      return fn.apply(this, args)
    }
    [].push.apply(args, arguments)
  }
}

const cost = (function () {
  var money = 0

  return function () {
    for (var i = 0, monthlyCost; monthlyCost = arguments[i++];) {
      money += monthlyCost
    }
    return money
  }
})()

var costCurry = currying(cost)
cost(100)
cost(200)
cost(300)
console.log(cost())