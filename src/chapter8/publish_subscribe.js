var Event = (function () {
  var clientList = {}

  var listen = function (key, fn) {
    if (!clientList[key]) clientList[key] = []

    clientList[key].push(fn)
  }

  var remove = function (key, fn) {
    var fns = clientList[key]

    if (!fns) return false

    if (!fn) {
      fns && (fns.length = 0)
    } else {
      for (var i = fns.length - 1, _fn; _fn = fns[i--];) {
        if (_fn === fn) fns.splice(i + 1, 1)
      }
    }
  }

  var trigger = function () {
    var key = Array.prototype.shift.call(arguments),
      fns = clientList[key]

    if (!fns || fns.listen === 0) return false

    fns.forEach(item => {
      item.apply(null, arguments)
    });
  }

  return {
    listen,
    remove,
    trigger
  }
})();

var fn1 = function (arg1, arg2) {
  console.log('f1', arg1, arg2)
  console.log(arguments)
}
var fn2 = function (name) {
  console.log('f2', name)
  console.log(arguments)
}

Event.listen('fn1', fn1)
Event.listen('fn1', fn2)
Event.listen('fn2', fn2)
Event.remove('fn1', fn2)

Event.trigger('fn1', 'fei', 1, 2)

  // 订阅
  !(function () {
    var show = document.getElementById('show')

    Event.listen('addCount', function (count) {
      show.innerHTML = count
    })
  })()

  // 发布
  !(function () {
    var btn = document.getElementById('btn')
    var count = 0

    btn.onclick = function () {
      Event.trigger('addCount', ++count)
    }
  })()