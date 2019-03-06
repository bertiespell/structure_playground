import * as Tone from 'tone';

var MIDI_NUM_NAMES = [
    "C_1", "C#_1", "D_1", "D#_1", "E_1", "F_1", "F#_1", "G_1", "G#_1","A_1", "A#_1", "B_1",
    "C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",
    "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
    "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
    "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
    "C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8",
    "C9", "C#9", "D9", "D#9", "E9", "F9", "F#9", "G9"]

var familyOfTriads = [[0,4,7],[0,3,7],[0,3,6],[0,4,8]];

function makeChordArray(root: number, chordFormula: Array<Array<number>>) {
    var indexMIDI
    var aChord = [];
    var timeAndChord = [];
    var toneTime = new Tone.Time(0);
    var chordArray = [];
    for(let i=0; i<chordFormula.length; i++) {
        for(let j=0; j<chordFormula[i].length; j++) {
            // add the root to each chord tone
            indexMIDI = chordFormula[i][j] + Number(root);
            // tranlate to a pitch/octave name
            aChord.push(MIDI_NUM_NAMES[indexMIDI]);
        }
        // j = 0;
        // create add time and chord together
        timeAndChord.push(toneTime.toNotation());
        timeAndChord.push(aChord);
        chordArray.push(timeAndChord);
        // now calc the time value for next time
        // toneTime = toneTime.add('2n');
        // clear the arrays;
        aChord = [];
        timeAndChord = [];
    }
    return chordArray;
}

export const playChord = (baseNote: number = 70) => {
    var piano = new Tone.PolySynth(4, Tone.Synth).toMaster()

    var myChords = makeChordArray(baseNote, familyOfTriads);

    var part = new Tone.Part(function(time, note){
        //the notes given as the second element in the array
        //will be passed in as the second argument
        piano.triggerAttackRelease(note as any, "2n", time);
    }, myChords as any).start(0);

	part.loop = true;
	part.loopStart = "0:0";
	part.loopEnd = "2:0";

	var tempo = 85;
	Tone.Transport.bpm.value = tempo;   
    Tone.Transport.start("+0.1");
    

}

