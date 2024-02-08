// import data from "./chords.js";
import {allChords} from "./chords.js";
import { init, reset, get, getNew, update } from "./db.js";
import { supermemo } from "./sm.js";
import { setCookie, getCookie } from "./cookie.js";

var chordNames = document.getElementById("chord-names");
_.forEach(_.uniq(_.map(allChords, (c) => c.name)), (option) => {
  chordNames.insertAdjacentHTML(
    "beforeend",
    `<div>
    <label
      for="checkbox-${option}"
      style="margin-right: 10px"
    >
      <input
        type="checkbox"
        name="${option}"
        id="checkbox-${option}"
      />
      <span>${option}</span>
    </label>
  </div>`
  );
});

_.forEach(document.querySelectorAll("input"), (d) => {
  var val = getCookie(d.id);
  if (val !== undefined) {
    if (d.type === "checkbox") {
      d.checked = val === "true";
    } else {
      d.value = val;
    }
  }
  d.onchange = () => {
    if (d.type === "checkbox") {
      setCookie(d.id, d.checked);
    } else {
      setCookie(d.id, d.value);
    }
  };
});

if (navigator.requestMIDIAccess) {
  console.log("This browser supports WebMIDI!");

  navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
  console.log("WebMIDI is not supported in this browser.");
}

function onMIDISuccess(midiAccess) {
  let md = document.getElementById("midi-devices");
  let keys = [...midiAccess.inputs.values()].map(f=>f.name);
  if(keys.length<1){
    md.innerText = "No midi device has been found"
  }else{
    md.innerText = "will recieve midi events from these devices: "+keys.join(", ")
  }
}

function onMIDIFailure() {
  alert("Could not access MIDI devices.");
}

document.getElementById("common-chords").addEventListener("click", ()=>{
  _.forEach(allChords, (option) => {
    if(document.getElementById("common-chords").checked && option.common>-1){
      document.getElementById(`checkbox-${option.name}`).checked=true;
      setCookie(`checkbox-${option.name}`, true);
    }
  })
});

var samples = SampleLibrary.load({
  instruments: ["piano"],
  baseUrl: "/scripts/",
});

var current;
Tone.Buffer.on("load", function () {
  for (var property in samples) {
    if (samples.hasOwnProperty(property)) {
      console.log(samples[property]);
      samples[property].release = 0.5;
      samples[property].toMaster();
    }
  }

  current = samples["piano"];
});

Tone.Buffer.on("error", function () {
  console.error(
    "I'm sorry, there has been an error loading the samples. This demo works best on on the most up-to-date version of Chrome."
  );
});

var setting = document.getElementById("setting");
var cards = document.getElementById("cards");
var piano = document.getElementById("piano");
var card = document.getElementById("card-content");
var correct = document.getElementById("correct");
var tom = document.getElementById("tom");
var maxInversionValue;
var playSound;
var showChord;
var chordTypes;
var newCards;
var randomOrder;
var common;
var today;
var rehearseCounter;
var evaluateTimeout;

var notesMap = {
  C: 1,
  "C#": 2,
  Db: 2,
  D: 3,
  "D#": 4,
  Eb: 4,
  E: 5,
  F: 6,
  "F#": 7,
  Gb: 7,
  G: 8,
  "G#": 9,
  Ab: 9,
  A: 10,
  "A#": 11,
  Bb: 11,
  B: 12,
};
var show = () => {};
var next = () => {};
var evaluate = () => {};

window.next = () => {
  evaluate();
};

window.show = () => {
  show();
};

window.reset = () => {
  if (window.confirm("Are you sure you want to reset your progress?")) {
    reset();
  }
};

window.stop = () => {
  setting.classList.remove("hidden");
  cards.classList.add("hidden");
};

var wait = (t) => new Promise((resolve) => setTimeout(() => resolve(), t));

var play = (notes) => {
  const now = Tone.now();
  _.forEach(notes, (n) =>
    current.triggerAttack(
      Tone.Frequency(n + 3 * 12, "midi").toNote(),
      now + 0.1
    )
  );
  _.forEach(notes, (n) =>
    current.triggerRelease(Tone.Frequency(n + 3 * 12, "midi").toNote(), now + 2)
  );
};

var all_rec_notes = [];

window.testSound = () => {
  current.triggerAttack(Tone.Frequency(67, "midi").toNote());
  setTimeout(()=>current.triggerRelease(Tone.Frequency(67, "midi").toNote()), 1000);
}
window.start = async () => {
  console.log("start");
  setting.classList.add("hidden");
  cards.classList.remove("hidden");

  if (navigator.requestMIDIAccess) {
    console.log("This browser supports WebMIDI!");

    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
  } else {
    console.log("WebMIDI is not supported in this browser.");
  }

  function onMIDISuccess(midiAccess) {
    var inputs = midiAccess.inputs;

    if((inputs?.size ?? 0) === 0){
      setTimeout(()=>navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure),200)
      return
    }

    midiAccess.inputs.forEach(input=> {
      input.onmidimessage = getMIDIMessage;
    })
  }

  function onMIDIFailure() {
    alert("Could not access MIDI devices.");
  }

  function getMIDIMessage(message) {
    alert(message.data.join(", "))
    var command = message.data[0];
    var note = message.data[1];
    var velocity = message.data.length > 2 ? message.data[2] : 0; // a velocity value might not be included with a noteOff command

    switch (command) {
      case 144: // note on
        if (velocity > 0) {
          noteOn(note)
        } else {
          noteOff(note);
        }
        break;
      case 128: // note off
        noteOff(note);
        break;
    }

    async function noteOn(note) {
      if (playSound) {
        current.triggerAttack(Tone.Frequency(note, "midi").toNote());
      }
      all_rec_notes.push(note);
      all_rec_notes = _.uniq(all_rec_notes);
      if(evaluateTimeout){
        clearTimeout(evaluateTimeout)
      }
      evaluateTimeout = setTimeout(async () => {await evaluate()},1000);
    }

    function noteOff(note) {
      if (playSound) {
        current.triggerRelease(Tone.Frequency(note, "midi").toNote());
      }
      all_rec_notes = _.filter(all_rec_notes, (f) => f !== note);
    }
  }

  try {
    correct.innerHTML = "Initializing...";
    var db = await init(allChords);
    correct.innerHTML = "Initialization done...";

    maxInversionValue = document.getElementById("maxInversion").value;
    newCards = document.getElementById("new-cards").value;
    playSound = document.getElementById("sound").checked;
    showChord = document.getElementById("show-chord-name").checked;
    randomOrder = document.getElementById("random-order").checked;
    common = document.getElementById("common-chords").checked;
    
    today =
      (tom ? parseInt(tom.value) : 0) +
      Math.floor(new Date().getTime() / (24 * 60 * 60 * 1000));
    rehearseCounter = null;
    chordTypes = _.reduce(
      document.querySelectorAll("#chord-names input"),
      (a, f) => {
        if (f.checked) {
          a.push(f.name);
        }
        return a;
      },
      []
    );

    next = async (i) => {
      if (i <= 0) {
        correct.innerHTML = "Done!";
        await wait(2000);
        window.stop();
        return;
      }
      piano.setMarkedKeys([]);
      correct.innerHTML = "";

      var chords = await get(chordTypes, maxInversionValue, db, today);
      var chord = {};
      if (!chords || chords.length === 0) {
        chords = await getNew(chordTypes, maxInversionValue, common, db);
        console.log(chords)
        if (!chords || chords.length === 0) {
          correct.innerHTML = "No New Card!";
          await wait(2000);
          window.stop();
          return;
        }
        if (randomOrder) {
          chord = chords[Math.floor(Math.random() * chords.length)];
        } else {
          chord = chords[0];
        }
        i--;
      } else {
        chord = chords[0];
      }

      var notes = _.split(chord.notes, " ");

      let noteNums = _.map(notes, (n) => notesMap[n] - 1);
      for (var j = 1; j < noteNums.length; j++) {
        if (noteNums[j] < noteNums[0]) {
          noteNums[j] += 12;
        }
      }

      if (showChord) {
        card.innerHTML =
          chord.name +
          (chord.inversion === 0 ? "" : " " + chord.inversion + "th inversion")+`<br><span style="font-size:20px;">`+chord.abbr.map(f=>`<span style="font-size:20px;">${f}</span>`).join(" , ")+"</span>";
        if(chord.repetition<4){
          piano.setMarkedKeys(_.map(noteNums, (f) => f + 1));
        }
      } else {
        card.innerHTML = "";
      }

      

      if (playSound) {
        play(noteNums);
      }
      show = async (correct) => {
        card.innerHTML =
          chord.name +
          (chord.inversion === 0 ? "" : " " + chord.inversion + "th inversion")+`<br><span style="font-size:20px;">`+chord.abbr.map(f=>`<span style="font-size:20px;">${f}</span>`).join(" , ")+"</span>";

        piano.setMarkedKeys(_.map(noteNums, (f) => f + 1));
        let item = {
          interval: chord.interval,
          repetition: chord.repetition,
          efactor: chord.efactor,
        };

        if (!correct) {
          item = supermemo(item, 0);

          await update(
            chord.id,
            item.interval,
            item.repetition,
            item.efactor,
            db,
            today
          );
        }
      };

      var then = new Date().getTime();
      evaluate = async () => {
        const recNotes = all_rec_notes;
        if (!recNotes || recNotes.length === 0) {
          // recNotes = [4,8,11];
          // if(Math.random()>0.2){
          //   recNotes = noteNums//TODO remove
          // }
        }

        if (!recNotes || recNotes.length < noteNums.length) return;
        var sortedNotes = recNotes.sort((a, b) => a - b);

        let item = {
          interval: chord.interval,
          repetition: chord.repetition,
          efactor: chord.efactor,
        };

        var now = new Date().getTime();
        var t = now - then;
        let grade = 0;

        if (
          sortedNotes.length === noteNums.length &&
          sortedNotes[0] % 12 === noteNums[0] % 12 &&
          _.every(_.slice(noteNums, 1), (f) =>
            _.some(_.slice(sortedNotes, 1), (g) => g % 12 === f % 12)
          ) &&
          _.every(_.slice(sortedNotes, 1), (f) =>
            _.some(_.slice(noteNums, 1), (g) => g % 12 === f % 12)
          )
        ) {
          if (rehearseCounter) {
            if (rehearseCounter > 1) {
              rehearseCounter--;
              correct.innerHTML = `Rehearse it ${rehearseCounter} more time`;
              return
            } else {
              rehearseCounter = null;
              await wait(2000);

              await next(i);
              return;
            }
          }

          if (t < 1000) {
            grade = 5;
          } else if (t < 2000) {
            grade = 4;
          } else if (t < 4000) {
            grade = 3;
          } else if (t < 8000) {
            grade = 2;
          } else if (t < 16000) {
            grade = 1;
          } else {
            grade = 0;
          }
          item = supermemo(item, grade);

          await update(
            chord.id,
            item.interval,
            item.repetition,
            item.efactor,
            db,
            today
          );

          correct.innerHTML = "Correct";

          await show(true);
          await wait(2000);

          await next(i);
        } else {
          item = supermemo(item, grade);

          await update(
            chord.id,
            item.interval,
            item.repetition,
            item.efactor,
            db,
            today
          );

          correct.innerHTML = "Wrong";

          await show(true);
          rehearseCounter = 5;
          await wait(2000);
          correct.innerHTML = `Rehearse it ${rehearseCounter} more time`;
          //await next(i);
        }
      };
    };

    await next(newCards);
  } catch (e) {
    console.log(e);
  }
};
