import { ChosenLettersPreview } from './ChosenLettersPreview.js';
import { LetterButtonControl } from './LetterButtonControl.js';

export class LettersInputController {
    constructor (lettersArray, applyWordFn) {
        this.$controlButtonsParent = document.getElementById('controlParent');
        this.lettersArray = [...lettersArray];
        if (!this.$controlButtonsParent || !this.lettersArray.length) return;
        this.buttonsObjArray = [];
        this.focusedLettersView = new ChosenLettersPreview(this.lettersArray);
        this.applyWord = applyWordFn;

        this.isInputInProcess = false;
        this.focusedLettersArray = [];

        this.angleBetweenButtons = 360 / this.lettersArray.length;

        this.create();
        this.addEventListeners();
    }

    create () {
        this.lettersArray.forEach( (letter, index) => {
            const buttonObj = new LetterButtonControl(letter, this.$controlButtonsParent, this.startInput, this.addLetterToFocused, this.checkIfInputInProcess);

            const angle = this.angleBetweenButtons * index;
            buttonObj.hand.style.transform = `rotate(${angle}deg)`;
            buttonObj.button.style.transform = `rotate(-${angle}deg)`;

            this.buttonsObjArray.push(buttonObj);
        })
    }

    addEventListeners () {
        document.body.addEventListener('pointerup', this.finishInput);
    }

    addLetterToFocused = letter => {
        if(!this.isInputInProcess) return;
        this.focusedLettersArray.push(letter);
        this.focusedLettersView.setActualArrayOfLettersToShow(this.focusedLettersArray);
    };

    startInput = () => {
        this.isInputInProcess = true;
    };

    finishInput = () => {
        this.isInputInProcess = false;
        this.applyWord(this.focusedLettersArray.join(''));
        this.focusedLettersArray = [];
        this.buttonsObjArray.forEach(buttonObj => buttonObj.reset());
        this.focusedLettersView.setActualArrayOfLettersToShow(this.focusedLettersArray);
    };

    checkIfInputInProcess = () => {
        return this.isInputInProcess;
    }
};
