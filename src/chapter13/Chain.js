// 职责链
var Type = {}
for (var i = 0, type; type = ['Array', 'String', 'Number', 'Function'][i++];) {
  (function (type) {
    Type['is' + type] = function (obj) {
      return Object.prototype.toString.call(obj).slice(8, -1) === type
    }
  })(type)
}

function Handler(s) {
  this.successor = s || null;
}

Handler.prototype = {
  handle: function () {
    if (this.successor && Type.isFunction(this.successor.handle)) {
      this.successor.handle()
    } else {
      throw new Error('必须有一个handle函数')
    }
  }
};

var app = new Handler({
  handle: function () {
    console.log('app handle');
  }
});

var dialog = new Handler(app);
dialog.handle = function () {
  console.log('dialog before ...')
  // 这里做具体的处理操作
  Handler.prototype.handle.call(this); //继续往上走
  console.log('dialog after ...')
};

var button = new Handler(dialog);
button.handle = function () {
  console.log('button before ...')
  // 这里做具体的处理操作
  Handler.prototype.handle.call(this);
  console.log('button after ...')
};

button.handle();