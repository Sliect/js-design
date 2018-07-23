// 享元模式
// 使用场景: 创建大量类似的对象
// 核心: 运用共享技术来有效支持大量细粒度的对象
// 重点在于区分内部对象和外部对象, 内部对象可以共享, 剥离外部状态
var Model = function (sex) {
  this.sex = sex
}
Model.prototype.takePhoto = function () {
  console.log('sex=' + this.sex + ', underwear=' + this.underwear)
}

var maleModel = new Model('male'),
  femaleModel = new Model('female')

for (var i = 0; i < 50; i++) {
  maleModel.underwear = 'underwear' + i
  femaleModel.underwear = 'underwear' + i
  maleModel.takePhoto()
  femaleModel.takePhoto()
}

/* 对象池 */
var objectPoolFactory = function (createObjFn) {
  var objectPool = []
  return {
    create: function () {
      var obj = objectPool.length === 0 ?
        createObjFn.apply(this, arguments) : objectPool.shift()

      return obj
    },
    recover: function (obj) {
      objectPool.push(obj)
    }
  }
}

var iframeFactory = objectPoolFactory(function () {
  var iframe = document.createElement('iframe');
  document.body.appendChild(iframe);
  iframe.onload = function () {
    iframe.onload = null; // 防止iframe重复加载的bug
    iframeFactory.recover(iframe); // iframe加载完成之后回收节点
  }
  return iframe;
});
var iframe1 = iframeFactory.create();
iframe1.src = 'http://baidu.com';
var iframe2 = iframeFactory.create();
iframe2.src = 'http://QQ.com';
setTimeout(function () {
  var iframe3 = iframeFactory.create();
  // var iframe4 = iframeFactory.create()
  // var iframe5 = iframeFactory.create()
  iframe3.src = 'http://163.com';
  // iframe4.src = 'https://caniuse.com/'
  // iframe5.src = 'https://codepen.io/'
}, 3000);