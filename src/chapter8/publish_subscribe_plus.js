// 增加命名空间 和 先发布后订阅 功能
var Event = (function () {

  var Event = function () {
    var _listen,
      _remove,
      _trigger,
      _create,
      _default = 'default',
      _shift = Array.prototype.shift,
      _unshift = Array.prototype.unshift,
      namespaceCache = {}

    var spliceFn = function (fnList, fn) {
      for (var i = fnList.length - 1; i >= 0; i--) {
        if (fnList[i] === fn) {
          fnList.splice(i, 1)
        }
      }
    }

    _listen = function (key, fn, cache) {
      if (!cache[key]) cache[key] = []
      cache[key].push(fn)
    }

    _remove = function (key, cache, fn) {
      if (cache[key]) {
        if (fn) {
          spliceFn(cache[key], fn)
        } else {
          cache[key] = []
        }
      }
    }

    _trigger = function () {
      var cache = _shift.call(arguments),
        key = _shift.call(arguments),
        args = arguments,
        _self = this,
        stack = cache[key]

      if (!stack || !stack.length) {
        return false
      }

      return stack.forEach(item => {
        return item.apply(_self, args)
      });
    }

    _create = function (namespace = _default) {
      var cache = {},
        // 离线栈
        offlineStack = [],
        // 用来复用命名空间的对象
        ret = {
          listen: function (key, fn, last) {
            // 监听
            _listen(key, fn, cache)
            // 如果离线栈为null 退出
            if (offlineStack === null) return false
            // 执行离线栈的最后一个方法
            if (last === 'last') offlineStack.length && offlineStack.pop()()
            // 依次执行离线栈的方法
            else offlineStack.forEach(item => {
              item()
            })
            // 设置离线栈为null
            offlineStack = null
          },
          one: function (key, fn, last) {
            // 删除缓存中指定关键字的所有方法
            _remove(key, cache)
            // 监听
            this.listen(key, fn, last)
          },
          remove: function () {
            // 删除缓存中制定关键字的指定方法
            _remove(key, cache, fn)
          },
          trigger: function () {
            var fn,
              args,
              _self = this

            _unshift.call(arguments, cache)
            args = arguments
            fn = function () {
              return _trigger.apply(_self, args)
            }

            if (offlineStack) return offlineStack.push(fn)

            return fn()
          }
        }

      return namespace ?
        (namespaceCache[namespace] ? namespaceCache[namespace] :
          namespaceCache[namespace] = ret) : ret
    }

    return {
      create: _create,
      one: function (key, fn, last) {
        var event = this.create()
        event.one(key, fn, last)
      },
      remove: function (key, fn) {
        var event = this.create()
        event.remove(key, fn)
      },
      listen: function (key, fn, last) {
        var event = this.create()
        event.listen(key, fn, last)
      },
      trigger: function () {
        var event = this.create()
        event.trigger.apply(this, arguments)
      }
    }

  }()

  return Event
})()

Event.trigger('click', 1)
Event.listen('click', function (a) {
  console.log(a)
})

Event.create('namespace1').listen('click', function (a) {
  console.log(a)
})
Event.create('namespace1').trigger('click', 1)

Event.create('namespace2').listen('click', function (a) {
  console.log(2)
})
Event.create('namespace2').trigger('click', 2)