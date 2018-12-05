### 单一职责原则
```
 一个对象(方法)只做一件事
```

### 最少知识原则
```
  减少对象之间的依赖
```

### 开放封闭原则
```
 通过增加代码而不是修改代码来满足新需求
 找到稳定不变的地方和容易变化的部分, 隔离开来
```

### 模拟call apply bind
```
  // call 模拟实现
  // this指向null时 默认指向window 注意函数有返回值
  Function.prototype.call = function (context, ...args) {
    context = context || window
    var hasAttr = false
    if (context.__fn__) {
      hasAttr = true
      var tmp = context.__fn__
    }
    context.__fn__ = this
    var res = context.__fn__(...args)
    delete context.__fn__
    if (hasAttr) {
      context.__fn__ = tmp
    }
    return res
  }

  Function.prototype.apply = function(context, arr) {
    context = context || window
    var hasAttr = false
    if (context.__fn__) {
      hasAttr = true
      var tmp = context.__fn__
    }
    context.__fn__ = this
    var res = arr ? context.__fn__(...arr) : context.__fn__()
    delete context.__fn__
    if (hasAttr) {
      context.__fn__ = tmp
    }
    return res
  }

  // bind模拟实现
  // new 一个bind绑定的函数, this指向构造实例, 修改绑定函数的原型链不能影响被绑定的函数原型链
  Function.prototype.bind = function(context) {

    if (typeof this !== 'function') {
      throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable')
    }

    var self = this
    var args = [].slice.call(arguments, 1)

    var tmpFn = function() {}

    var bindFn = function () {
      var laterArgs = [].slice.call(arguments)
      return self.apply(this instanceof bindFn ? this : context, args.concat(laterArgs))
    }

    tmpFn.prototype = this.prototype
    bindFn.prototype = new tmpFn()
    return bindFn
  }

  // new 模拟实现 参数1为构造函数 参数2为构造函数的参数列
  // 1.创建一个新对象
  // 2.设置新对象的 __proto__ 指向构造函数的prototype
  // 3.调用构造函数 将this指向新对象
  // 4.返回新对象 如果构造函数返回的是基本类型，则将返回新对象
  function createObject(fn, args) {
    var obj = new Object()
    obj.__proto__ = fn.prototype
    var res = fn.apply(obj, args)

    return typeof res === 'object' ? res : obj
  }
```
