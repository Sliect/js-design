// let createLoginLayer = (function () {
//   var div

//   return function () {
//     if (!div) {
//       div = document.createElement('div')
//       div.innerHTML = '我是登陆窗口'
//       div.style.display = 'none'
//       document.body.appendChild(div)
//     }

//     return div
//   }
// })()

// document.getElementById('login').onclick = function () {
//   var loginLayer = createLoginLayer()
//   loginLayer.style.display = 'block'
// }

let createIframe = (function () {
  var iframe

  return function () {
    if (!iframe) {
      iframe = document.createElement('iframe')
      document.body.appendChild(iframe)
    }

    return iframe
  }
})()
let getSingleton = function (fn) {
  var result
  return function () {
    return result || (result = fn.call(this, arguments))
  }
}