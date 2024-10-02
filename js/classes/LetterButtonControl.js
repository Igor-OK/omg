//todo smaller circle inside for correct hover and line

export class LetterButtonControl {
    constructor (letter, parentNode, startInputFn, addLetterToFocusedFn, checkIsInputInProcessFn) {
        this.letter = letter;
        this.isFocused = false;

        this.$parent = parentNode;
        this.$clockHand = document.createElement('div');
        this.$button = document.createElement('div');

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

        this.addLetterToFocused(this.letter);
        this.$button.classList.add('focused');
        this.isFocused = true;
    };

    reset = () => {
        this.$button.classList.remove('focused');
        this.isFocused = false;
    };

    click = (e) => {
        e.target.releasePointerCapture(e.pointerId)
        this.startInput();
        this.addLetterToFocused(this.letter);
        this.$button.classList.add('focused');
        this.isFocused = true;
    };

    get button () {
        return this.$button;
    }

    get hand () {
        return this.$clockHand;
    }

    addEventListeners () {
        this.$button.addEventListener('pointerdown',this.click);
        this.$button.addEventListener('pointerenter', this.focus);
    }
};
