// 构建函数
var CreateDiv = function (html) {
  this.html = html
  this.init()
}

CreateDiv.prototype.init = function () {
  var div = document.createElement('div')
  div.innerHTML = this.html
  document.body.appendChild(div)
}

// 区分逻辑放在代理里
var ProxySingletonCreateDiv = (function () {

  var instance
  return function (html) {
    if (!instance) {
      instance = new CreateDiv(html)
    }

    return instance
  }
})()

var a = new ProxySingletonCreateDiv('a')
var b = new ProxySingletonCreateDiv('b')

console.log(a === b)