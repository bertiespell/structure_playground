import * as Tone from 'tone';
import { playChord } from './make-chord';

export class Sampler {
    constructor() {
        const synth = new Tone.AMSynth().toMaster();
        // synth.triggerAttack('C1');
        // playChord();
    }
}