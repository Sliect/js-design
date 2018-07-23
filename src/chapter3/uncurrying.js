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
    // callFunc的this指向self                   callFunc.apply(self, arguments)
    // Object.prototyp.toString.call(null)     this指向toString
    // 同理 相当于 self.call(arguments)
    // return Function.prototype.call.apply(self, arguments)

    // 最最简洁写法
    // 结构后参数相当于 类数组[1,2,3] 和 4 self表示Array.prototype.push
    return self.call(...arguments)
  }
}

var push = Array.prototype.push.uncurrying();
(function () {
  // Array.prototype.push.call(arguments, 4)
  push(arguments, 4)
  console.log(arguments)
})(1, 2, 3)