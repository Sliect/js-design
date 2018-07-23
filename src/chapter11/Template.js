/* 模仿继承的实现 */
function inheritPrototype(subType, superType) {
  var proto = Object.create(superType.prototype)
  proto.constructor = subType
  subType.prototype = proto
}

var Beverage = function () {}

Beverage.prototype.boilWater = function () {
  console.log('把水煮沸')
}
Beverage.prototype.brew = function () {}
Beverage.prototype.pourInCup = function () {}
Beverage.prototype.addCondiments = function () {}

Beverage.prototype.init = function () {
  this.boilWater()
  this.brew()
  this.pourInCup()
  this.addCondiments()
}

var Coffee = function () {}
inheritPrototype(Coffee, Beverage)
Coffee.prototype.brew = function () {
  console.log('用沸水冲泡咖啡')
}
Coffee.prototype.pourInCup = function () {
  console.log('把咖啡倒入杯子')
}
Coffee.prototype.addCondiments = function () {
  console.log('向咖啡中加糖')
}

var Tea = function () {}
inheritPrototype(Tea, Beverage)
Tea.prototype.brew = function () {
  console.log('用沸水浸泡茶叶')
}
Tea.prototype.pourInCup = function () {
  console.log('把茶倒入杯子')
}
Tea.prototype.addCondiments = function () {
  console.log('向茶中添加柠檬')
}

var coffee = new Coffee()
var tea = new Tea()

coffee.init()
tea.init()

console.log(tea)


/* 高阶函数写法 */
var Beverage = function (funcObj) {
  var boilWater = function () {
    console.log('把水煮沸')
  }

  var brew = funcObj.brew || function () {
    throw new Error('必须传递brew 方法')
  }

  var pourInCup = funcObj.pourInCup || function () {
    throw new Error('必须传递pourInCup 方法')
  }

  var addCondiments = funcObj.addCondiments || function () {
    throw new Error('必须传递addCondiments 方法')
  }

  var F = function () {}

  F.prototype.init = function () {
    boilWater()
    brew()
    pourInCup()
    addCondiments()
  }

  return F
}

var Coffee = Beverage({
  brew: function () {
    console.log('用沸水冲泡咖啡')
  },
  pourInCup: function () {
    console.log('把咖啡倒入杯子')
  },
  addCondiments: function () {
    console.log('向咖啡中加糖')
  }
})

var Tea = Beverage({
  brew: function () {
    console.log('用沸水浸泡茶叶')
  },
  pourInCup: function () {
    console.log('把茶倒入杯子')
  },
  addCondiments: function () {
    console.log('向茶中添加柠檬')
  }
})

var coffee = new Coffee()
var tea = new Tea()
coffee.init()
tea.init()