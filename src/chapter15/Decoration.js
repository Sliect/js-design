Function.prototype.before = function (beforefn) {
  var self = this
  return function () {
    beforefn.apply(this, arguments)
    return self.apply(this, arguments)
  }
}

Function.prototype.after = function (afterfn) {
  var self = this
  return function () {
    var res = self.apply(this, arguments)
    afterfn.apply(this, arguments)
    return res
  }
}

// 原型链实现装饰者模式
// 缺点：污染原型链, fn上的属性经过after或before后会丢失, 因为返回的是一个新函数
var fn = function () {
  console.log('click handle')
}
fn = fn.after(function () {
  console.log('before click')
})
btn.onclick = fn

// 高阶函数写法
var before = function (fn, beforefn) {
  return function () {
    beforefn.apply(this, arguments)
    return fn.apply(this, arguments)
  }
}

var after = function (fn, afterfn) {
  return function () {
    var res = fn.apply(this, arguments)
    afterfn.apply(this, arguments)
    return res
  }
}

var func = function () {
  console.log('fn')
}
func = before(func, function () {
  console.log('before')
})

func()