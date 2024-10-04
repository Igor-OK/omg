export class LetterButtonControl {
    constructor (letter, parentNode, startInputFn, addLetterToFocusedFn, checkIsInputInProcessFn) {
        this.letter = letter;
        this.isFocused = false;
        this.pointsCoordinates = [];

        this.$parent = parentNode;
        this.$clockHand = document.createElement('div');
        this.$button = document.createElement('div');
        this.$point = document.createElement('div');

        this.startInput = startInputFn;
        this.addLetterToFocused = addLetterToFocusedFn;
        this.checkIsInputInProcess = checkIsInputInProcessFn;

        this.create();
        this.addEventListeners();
    }


    create () {
        this.$clockHand.classList.add('clock-hand');
        this.$button.classList.add('letter-button');

        const layer1 = document.createElement('div');
        layer1.classList.add('layer1');
        this.$button.appendChild(layer1);

        this.$point.classList.add('point');
        this.$button.appendChild(this.$point);

        const letter = document.createElement('span');
        letter.classList.add('letter');
        letter.innerText = this.letter.toUpperCase();
        layer1.appendChild(letter);

        const layer2 = document.createElement('div');
        layer2.classList.add('layer2');
        this.$button.appendChild(layer2);

        this.$clockHand.appendChild(this.$button);
        this.$parent.appendChild(this.$clockHand);
    }


    focus = () =>  {
        if (!this.checkIsInputInProcess()) return;
        if (this.isFocused) return;

        this.addLetterToFocused(this.letter, this.pointsCoordinates);
        this.$button.classList.add('focused');
        this.isFocused = true;
    };


    reset = () => {
        this.$button.classList.remove('focused');
        this.isFocused = false;
    };


    click = event => {
        event.target.releasePointerCapture(event.pointerId);
        this.startInput();
        this.addLetterToFocused(this.letter, this.pointsCoordinates);
        this.$button.classList.add('focused');
        this.isFocused = true;
    };


    get button () {
        return this.$button;
    }


    get hand () {
        return this.$clockHand;
    }


    get point () {
        return this.$point;
    }


    setPointCoordinates () {
        const rect = this.$point.getBoundingClientRect();
        this.pointsCoordinates = [rect.left, rect.top];
    }


    addEventListeners () {
        this.$button.addEventListener('pointerdown',this.click);
        this.$button.addEventListener('pointerenter', this.focus);
    }
};
