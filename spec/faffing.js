/*const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');


let testRover = new Rover(100)
let testCommands = [new Command ('MODE_CHANGE','LOW_POWER'), new Command ('MOVE', 234)]
let testMessage = new Message ('Status Report Please', testCommands)
let testVariables = testRover.recieveMessage(testMessage)
//console.log(testCommands)
//console.log(testMessage.commands.commandType)
console.log(testVariables.results)
console.log(testRover)
testCommands[0].value = 'NORMAL'
console.log(testCommands[0].value)
console.log(testVariables)
//console.log((new Rover(100).recieveMessage(new Message('Status Report Please', [new Command('STATUS_CHECK')]))).results);