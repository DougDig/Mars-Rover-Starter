const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: I  f at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
      expect( function() { new Message();}).toThrow(new Error('Name required.'));
    });
  
    it('constructor sets name', function(){
      expect((new Message('bees')).name).toBe('bees');
    });
  
    it('constructor sets a value passed in as the 2nd argument', function(){
      expect((new Message('bees',[ new Command('hogs','dogs'), new Command('but','nut')])).commands[0].value).toBe('dogs');
    });
  });