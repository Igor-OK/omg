export class WordRow {
    constructor (word, parentNode) {
        this.$parent = parentNode;
        this.$wordRow = null;
        this.wordAsArray = word.split('');

        this.create();
    }

    create() {
        this.$wordRow = document.createElement('div');
        this.$wordRow.classList.add('word-row');
        this.wordAsArray.forEach(letter => {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            const text = document.createElement('span');
            text.innerText = letter.toUpperCase();
            cell.appendChild(text);
            this.$wordRow.appendChild(cell);
        })

        this.$parent.appendChild(this.$wordRow);
    }

    matchAsSolved () {
        this.$wordRow.classList.add('solved');
        //todo add some animation of solved word
    }
};
