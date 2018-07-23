var macroCommand = function () {
  return {
    commandList: [],
    add: function (command) {
      this.commandList.push(command)
    },
    execute: function () {
      for (var i = 0, command; command = this.commandList[i++];) {
        command.execute()
      }
    }
  }
}

var openTvCommand = {
  execute: function () {
    console.log('打开电视')
  }
}

var openAcCommand = {
  execute: function () {
    console.log('打开空调')
  }
}

var openSoundCommand = {
  execute: function () {
    console.log('打开音响')
  }
}

var closeDoorCommand = {
  execute: function () {
    console.log('关上大门')
  }
}

var openPcCommand = {
  execute: function () {
    console.log('打开电脑')
  }
}

var allCommand = macroCommand(),
  coolCommand = macroCommand(),
  funCommand = macroCommand()

coolCommand.add(closeDoorCommand)
coolCommand.add(openAcCommand)

funCommand.add(openPcCommand)
funCommand.add(openSoundCommand)

allCommand.add(openTvCommand)
allCommand.add(coolCommand)
allCommand.add(funCommand)

allCommand.execute()