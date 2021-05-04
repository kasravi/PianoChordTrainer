export function supermemo(item, grade) {
    var nextInterval;
    var nextRepetition;
    var nextEfactor;
  
    nextRepetition = item.repetition + 1;
    
    if (grade >= 2) {
        nextInterval = Math.round(item.interval * item.efactor);
        if(item.repetition>0){
          nextInterval = Math.max(nextInterval,1)
        }
        nextRepetition = item.repetition + 1;
    } else if (grade>0){
      nextInterval = 1;
      nextRepetition = 0;
    } else {
      nextInterval = 0;
      nextRepetition = 0;
    }
    
    nextEfactor = item.efactor + (0.1 - (5 - grade) * (0.08 + (5 - grade) * 0.02));
    if (nextEfactor < 1.3) nextEfactor = 1.3;
    return {
      interval: nextInterval,
      repetition: nextRepetition,
      efactor: nextEfactor
    };
  }