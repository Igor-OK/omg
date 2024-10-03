import { ChosenLettersPreview } from './ChosenLettersPreview.js';
import { LetterButtonControl } from './LetterButtonControl.js';
import { CanvasWithInputCurve } from './CanvasWithInputCurve.js';


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

        this.canvasObj = null;
        this.curvePointsArray = [];

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
            buttonObj.setPointCoordinates();
            this.buttonsObjArray.push(buttonObj);
        })

        this.canvasObj = new CanvasWithInputCurve();
    };


    addEventListeners () {
        document.body.addEventListener('pointerup', this.finishInput);
        document.body.addEventListener('pointermove', this.drawCurve);
    }


    addLetterToFocused = (letter, coordinates) => {
        if(!this.isInputInProcess) return;
        this.focusedLettersArray.push(letter);
        this.focusedLettersView.setActualArrayOfLettersToShow(this.focusedLettersArray);
        this.curvePointsArray = [...this.curvePointsArray, ...coordinates]
    };


    startInput = () => {
        this.isInputInProcess = true;
    };


    finishInput = () => {
        this.isInputInProcess = false;
        this.applyWord(this.focusedLettersArray.join(''));
        this.focusedLettersArray = [];
        this.curvePointsArray = [];
        this.canvasObj.clearCanvas();
        this.buttonsObjArray.forEach(buttonObj => buttonObj.reset());
        this.focusedLettersView.setActualArrayOfLettersToShow(this.focusedLettersArray);
    };


    checkIfInputInProcess = () => {
        return this.isInputInProcess;
    };


    drawCurve = (event) => {
        this.canvasObj.clearCanvas();
        if (!this.isInputInProcess) return;
        const curvePointsArray = [...this.curvePointsArray, event.x, event.y];
        console.log(curvePointsArray);
        this.canvasObj.drawCurve(curvePointsArray);
    };
};
