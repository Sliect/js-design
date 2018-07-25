//
var googleMap = {
  show: function () {
    console.log('google map')
  }
}

var baiduMap = {
  display: function () {
    console.log('baidu map')
  }
}

var baiduMapAdapter = {
  show: function () {
    return baiduMap.display()
  }
}