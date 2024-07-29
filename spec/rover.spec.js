const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  it ('constructor sets position and default values for mode and generatorWatts', function(){
    expect ((new Rover (100)).position).toBe(100);
    expect ((new Rover()).mode).toBe('NORMAL');
    expect ((new Rover()).generatorWatts).toBe(110);
  })

  it ('response returned by receiveMessage contains the name of the message', function() {
    expect (((new Rover(100)).receiveMessage(new Message('Dave', 123))).message).toBe('Dave');
  })

  it ('response returned by receiveMessage includes two results if two commands are sent in the message', function(){
    expect((new Rover(100).receiveMessage(new Message('Message Header Line', [new Command('STATUS_CHECK'), new Command ('MOVE', 300)]))).results.length).toBe(2);
  })

it ('responds correctly to the status check command', function(){
  expect((new Rover(100).receiveMessage(new Message('Status Report Please', [new Command('STATUS_CHECK')]))).results[0].roverStatus.mode).toBe('NORMAL');
  expect((new Rover(100).receiveMessage(new Message('Status Report Please', [new Command('STATUS_CHECK')]))).results[0].roverStatus.generatorWatts).toBe(110);
  expect((new Rover(100).receiveMessage(new Message('Status Report Please', [new Command('STATUS_CHECK')]))).results[0].roverStatus.position).toBe(100);
})

it ('responds correctly to the mode change command', function(){
  let testRover = new Rover(100)
  expect(testRover.mode).toBe('NORMAL');
  let testCommands = [new Command ('MODE_CHANGE','LOW_POWER')]
  let testMessage = new Message ('Status Report Please', testCommands);
  let testVariables = testRover.receiveMessage(testMessage);
  expect(testVariables.results.completed === true);
  expect(testRover.mode).toBe('LOW_POWER');
  testCommands[0].value = 'NORMAL' ;
  testMessage.commands = testCommands;
  testVariables = testRover.receiveMessage(testMessage);
  expect(testRover.mode).toBe('NORMAL');
})

it ('responds with a false completed value when attempting to move in LOW_POWER mode', function(){
    let testRover = new Rover(100)
    let testCommands = [new Command ('MODE_CHANGE','LOW_POWER'), new Command ('MOVE', 234)]
    let testMessage = new Message ('Status Report Please', testCommands);
    let roverDistance = testRover.position;
    let testVariables = testRover.receiveMessage(testMessage);
    expect (testVariables.results[1].completed === false);
    expect (testRover.position === roverDistance);
})

it ('responds with the position for the move command', function(){
  let testRover = new Rover(100)
    let testCommands = [ new Command ('MOVE', 234)]
    let testMessage = new Message ('Status Report Please', testCommands);
    let roverDistance = testRover.position;
    let testVariables = testRover.receiveMessage(testMessage);
    expect (testVariables.results[0].completed === true);
    expect (roverDistance === 100);
    expect (testRover.position === 234);
})

});
