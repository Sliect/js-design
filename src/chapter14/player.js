// function Player(name, teamColor) {
//   this.name = name
//   this.enemies = []
//   this.partners = []
//   this.state = 'alive'
//   this.teamColor = teamColor
// }

// Player.prototype.win = function () {
//   console.log(this.name + ' win!')
// }

// Player.prototype.lose = function () {
//   console.log(this.name + ' lose!')
// }

// /**
//  * 自己死了后判断队友是否全灭
//  * @param {Player} myself
//  */
// function gameOver(myself) {
//   var all_dead = true
//   for (var i = 0, partner; partner = myself.partners[i++];) {
//     if (partner.state === 'alive') {
//       all_dead = false
//       break
//     }
//   }

//   return all_dead
// }

// /**
//  * 显示胜者
//  * @param {Player} myself
//  */
// function showLosers(myself) {
//   myself.lose()
//   for (var i = 0, partner; partner = myself.partners[i++];) {
//     partner.lose()
//   }
// }

// /**
//  * 显示败者
//  * @param {Player} myself
//  */
// function showWinners(myself) {
//   for (var i = 0, enemy; enemy = myself.enemies[i++];) {
//     enemy.win()
//   }
// }

// Player.prototype.die = function () {
//   this.state = 'dead'

//   if (gameOver(this)) {
//     showLosers(this)
//     showWinners(this)
//   }
// }

// var players = []
// var playFactory = function (name, teamColor) {
//   var newPlayer = new Player(name, teamColor)

//   for (var i = 0, player; player = players[i++];) {
//     if (player.teamColor === newPlayer.teamColor) {
//       player.partners.push(newPlayer)
//       newPlayer.partners.push(player)
//     } else {
//       player.enemies.push(newPlayer)
//       newPlayer.enemies.push(player)
//     }
//   }
//   players.push(newPlayer)

//   return newPlayer
// }


/* 中介者模式 */
function Player(name, teamColor) {
  this.name = name
  this.teamColor = teamColor
  this.state = 'alive'
}

Player.prototype.win = function () {
  console.log(this.name + ' win!')
}

Player.prototype.lose = function () {
  console.log(this.name + ' lose!')
}

Player.prototype.die = function () {
  this.state = 'dead'
  playerDirector.reciveMessage('playerDead', this)
}

Player.prototype.remove = function () {
  playerDirector.reciveMessage('removePlayer', this)
}

Player.prototype.changeTeam = function (color) {
  playerDirector.reciveMessage('changeTeam', this, color)
}

var playFactory = function (name, teamColor) {
  var newPlayer = new Player(name, teamColor)
  playerDirector.reciveMessage('addPlayer', newPlayer)

  return newPlayer
}

var playerDirector = (function () {
  var players = {},
    operations = {}

  function removePlayer(teamPlayers, player) {
    for (var i = teamPlayers.length - 1; i >= 0; i--) {
      if (teamPlayers[i] === player) {
        teamPlayers.splice(i, 1)
      }
    }
  }

  function isGameOver(teamPlayers) {
    var all_dead = true

    for (var i = 0, player; player = teamPlayers[i++];) {
      if (player.state === 'alive') {
        all_dead = false
        break
      }
    }

    return all_dead
  }

  function showLosers(teamPlayers) {
    for (var i = 0, player; player = teamPlayers[i++];) {
      player.lose()
    }
  }

  function showWinners(loseColor) {
    for (var color in players) {
      if (color !== loseColor) {
        var teamPlayers = players[color]
        for (var i = 0, player; player = teamPlayers[i++];) {
          player.win()
        }
      }
    }
  }

  operations.addPlayer = function (player) {
    var teamColor = player.teamColor
    players[teamColor] = players[teamColor] || []

    players[teamColor].push(player)
  }

  operations.removePlayer = function (player) {
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor] || []

    removePlayer(teamPlayers, player)
  }

  operations.changeTeam = function (player, newTeamColor) {
    operations.removePlayer(player)
    player.teamColor = newTeamColor
    operations.addPlayer(player)
  }

  operations.playerDead = function (player) {
    var teamColor = player.teamColor,
      teamPlayers = players[teamColor] || []

    if (isGameOver(teamPlayers)) {
      showLosers(teamPlayers)
      showWinners(teamColor)
    }
  }

  var reciveMessage = function () {
    var message = Array.prototype.shift.call(arguments)
    operations[message].apply(this, arguments)
  }

  return {
    reciveMessage
  }

})()

/* 测试结果 */
// 红队
var player1 = new playFactory('皮蛋', 'red'),
  player2 = new playFactory('小乖', 'red'),
  player3 = new playFactory('小强', 'red'),
  player4 = new playFactory('小聪', 'red'),
  // 蓝队
  player5 = new playFactory('胖墩', 'blue'),
  player6 = new playFactory('葱头', 'blue'),
  player7 = new playFactory('小艾', 'blue'),
  player8 = new playFactory('阿飞', 'blue')

player2.remove()
player1.changeTeam('blue')

player1.die()
player5.die()
player3.die()
player2.die()
player4.die()