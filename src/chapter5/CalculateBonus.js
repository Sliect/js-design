/* JAVA 面向对象版本 */
var performanceS = function () {}
performanceS.prototype.calculate = function (salary) {
  return salary * 4
}

var performanceA = function () {}
performanceA.prototype.calculate = function (salary) {
  return salary * 3
}

var performanceB = function () {}
performanceB.prototype.calculate = function (salary) {
  return salary * 2
}

var Bonus = function (salary, strategry) {
  this.salary = salary
  this.strategry = strategry
}
Bonus.prototype.getBonus = function () {
  return this.strategry.calculate(this.salary)
}

// new performanceA() 把设置 strategry.prototype 为 performanceA.prototype
var bonus = new Bonus(8000, new performanceA())
bonus.getBonus()



/* JAVASCRIPT 版本 */
var strategies = {
  'S': function (salary) {
    return salary * 4
  },
  'A': function (salary) {
    return salary * 3
  },
  'B': function (salary) {
    return salary * 2
  }
}
var calculateBonus = function (level, salary) {
  return strategies[level](salary)
}