// 提取泛化的this

// Function.prototype.uncurrying = function () {
//   var self = this

//   return function () {
//     var obj = Array.prototype.shift.call(arguments)
//     return self.apply(obj, arguments)
//   }
// }

Function.prototype.uncurrying = function () {
  var self = this
  return function () {
    return Function.prototype.call.apply(self, arguments)
  }
}

var push = Array.prototype.push.uncurrying();
(function () {
  // Array.prototype.push.call(arguments, 4)
  push(arguments, 4)
  console.log(arguments)
})(1, 2, 3)