export class ChosenLettersPreview {
    constructor (lettersArray) {
        this.$parentContainer = document.getElementById('currentWord');
        this.maxNumberOfLetters = lettersArray.length;
        this.defaultFocusedLettersArray = Array(this.maxNumberOfLetters).fill('');
        this.lettersArrayToShow = [];
        this.letterButtonsArray = [];
        this.letterButtonsTextArray = [];

        this.create();
    }

    create () {
        this.defaultFocusedLettersArray.forEach(letter => {
            const buttonContainer = document.createElement('div');
            buttonContainer.classList.add('cell');
            const buttonLetter = document.createElement('span');
            buttonContainer.appendChild(buttonLetter);
            this.hide(buttonContainer);
            this.letterButtonsArray.push(buttonContainer);
            this.letterButtonsTextArray.push(buttonLetter);
            this.$parentContainer.appendChild(buttonContainer);
        });
    }

    hide = node => {
        if (!node) return;
        node.classList.add('hidden');
    }

    show = node => {
        if (!node) return;
        node.classList.remove('hidden');
    }

    showLetterByIndex (letter, index) {
        this.letterButtonsTextArray[index].innerText = letter.toUpperCase();
        this.show(this.letterButtonsArray[index]);
    }

    hideAllLetters () {
        this.defaultFocusedLettersArray.forEach((letter, index) => {
            this.letterButtonsTextArray[index].innerText = letter;
            this.hide(this.letterButtonsArray[index]);
            this.lettersArrayToShow = [];
        })
    }

    setActualArrayOfLettersToShow (array) {
        if(!array.length) return this.hideAllLetters();
        this.lettersArrayToShow = [...array];
        this.lettersArrayToShow.forEach((letter, index) => this.showLetterByIndex(letter, index));
        //todo add some animation;
    }
}
