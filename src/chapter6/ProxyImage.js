// 单一职责 新增图片
var myImage = (function () {
  var imgNode = document.createElement('img')
  document.body.appendChild(imgNode)

  return function (src) {
    imgNode.src = src
  }
})()

// 代理层 新增逻辑 如果图片没有加载前使用本地图片
var proxyImage = (function () {
  var img = new Image

  img.onload = function () {
    myImage(this.src)
  }

  return function (src) {
    myImage('./static/logo.png')
    // 请求图片
    img.src = src
  }
})()

proxyImage('https://www.baidu.com/img/bd_logo1.png')