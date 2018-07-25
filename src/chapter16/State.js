// 状态模式 允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类
// var Light = function () {
//   this.currState = FSM.off; // 设置当前状态
//   this.button = null;
// };

// Light.prototype.init = function () {
//   var button = document.createElement('button'),
//     self = this;
//   button.innerHTML = '已关灯';
//   this.button = document.body.appendChild(button);

//   this.button.onclick = function () {
//     self.currState.buttonWasPressed.call(self); // 把请求委托给FSM状态机
//   }
// };

// // 有限状态机
// var FSM = {
//   // 关闭状态
//   off: {
//     buttonWasPressed: function () {
//       console.log('关灯');
//       this.button.innerHTML = '下一次按我是开灯';
//       this.currState = FSM.on;
//     }
//   },
//   // 启动状态
//   on: {
//     buttonWasPressed: function () {
//       console.log('开灯');
//       this.button.innerHTML = '下一次按我是关灯';
//       this.currState = FSM.off;
//     }
//   }
// };

// var light = new Light();
// light.init();

/* 运用有限状态机库 */
// 有三个库 标准库 历史库 可视化库
var StateMachine = require('javascript-state-machine')

var fsm = new StateMachine({
  init: 'solid',
  transitions: [{
      name: 'melt',
      from: 'solid',
      to: 'liquid'
    },
    {
      name: 'freeze',
      from: 'liquid',
      to: 'solid'
    },
    {
      name: 'vaporize',
      from: 'liquid',
      to: 'gas'
    },
    {
      name: 'condense',
      from: 'gas',
      to: 'liquid'
    }
  ],
  methods: {
    onMelt: function () {
      console.log('I melted')
    },
    onFreeze: function () {
      console.log('I froze')
    },
    onVaporize: function () {
      console.log('I vaporized')
    },
    onCondense: function () {
      console.log('I condensed')
    }
  }
});

console.log(fsm.state)
console.log(fsm.allStates())