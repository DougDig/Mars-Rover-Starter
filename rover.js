class Rover {
   constructor (position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      let returnObject = {
         message: message.name,
         results: []
      }
      for (let i=0; i<message.commands.length;i++){
         if (message.commands[i].commandType === 'MOVE') {
            if (this.mode === 'NORMAL'){
               this.position = message.commands[i].value;
               (returnObject.results).push({completed:true});
            } else {
               (returnObject.results).push({completed:false});
            }
         } else if (message.commands[i].commandType === 'STATUS_CHECK') {
            (returnObject.results).push({completed:true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}})
         } else if (message.commands[i].commandType === 'MODE_CHANGE') {
            if (message.commands[i].value === 'LOW_POWER' || message.commands[i].value === 'NORMAL'){
               this.mode = message.commands[i].value;
               (returnObject.results).push({completed:true});
            } else {
               returnObject.results.push({completed:false});
            }
         } else {
            (returnObject.results).push({completed:false});
         }
      };
      return returnObject;
   }
}

module.exports = Rover;