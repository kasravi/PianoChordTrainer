export function supermemo(item, grade) {
    var nextInterval;
    var nextRepetition;
    var nextEfactor;
  
    if (grade >= 3) {
      if (item.repetition === 0) {
        nextInterval = 0;
        nextRepetition = 1;
      } else if (item.repetition === 1) {
        nextInterval = 1;
        nextRepetition = 2;
      } else {
        nextInterval = Math.round(item.interval * item.efactor);
        nextRepetition = item.repetition + 1;
      }
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