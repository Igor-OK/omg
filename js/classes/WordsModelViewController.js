import { prepareLevelsData } from '../utils/prepareLevelsData.js';
import { WordRow} from './WordRow.js';
import { getMinimalSetOfLetters } from '../utils/getMinimalSetOfLetters.js';
import { LettersInputController } from './LettersInputController.js';

export class WordsModelViewController {
    constructor (levels) {
        this.levelNumber = 0;
        this.levelsArray = prepareLevelsData(levels);
        this.wordsArray = [];
        this.modelArray = [];

        this.$levelPage = document.getElementById('level');
        this.$levelNumberNode = document.getElementById('levelNumber');
        this.$congratulationPage = document.getElementById('congratulation');
        this.$congratulationHeader = document.getElementById('congratulationHeader');
        this.$congratulationButton = document.getElementById('congratulationButton');
        this.$congratulationButtonText = document.getElementById('congratulationButtonText');
        this.$viewParent = document.getElementById('solvedWords');
        this.viewArray = [];
        this.wordsContainerSquareSizeInVH = 40;
        this.wordCellSizeDevideFlexGap = 12;

        this.controllerLettersArray = [];
        this.controller = null;

        this.checkIfCorrectSavedProgressInLocalStorage() ? this.recovery() : this.init(0);
        this.setCellSize();
        this.addEventListeners();
    }


    init (levelNumber) {
        this.levelNumber = levelNumber;
        const index = this.getWordsArrayIndexByLevelNumber(this.levelNumber);
        this.wordsArray = [...this.levelsArray[index]];
        this.modelArray = this.wordsArray.map((word, index) => {
            return { word, isSolved: false, index };
        });

        this.viewArray = this.wordsArray.map(word => new WordRow(word, this.$viewParent));
        this.applyLevelNumberToUi()

        this.controllerLettersArray = getMinimalSetOfLetters(this.wordsArray);
        this.controller = new LettersInputController(this.controllerLettersArray, this.tryToApplyWord);
    }


    recovery () {
        const { savedLevelNumber, savedModel } = this.getSavedProgress();
        this.levelNumber = savedLevelNumber;
        const index = this.getWordsArrayIndexByLevelNumber(this.levelNumber);
        this.wordsArray = [...this.levelsArray[index]];
        this.modelArray = savedModel;

        this.viewArray = this.wordsArray.map(word => new WordRow(word, this.$viewParent));
        this.viewArray.forEach((wordRowObj, index) => this.modelArray[index].isSolved && wordRowObj.matchAsSolved());
        this.applyLevelNumberToUi()

        this.controllerLettersArray = getMinimalSetOfLetters(this.wordsArray);
        this.controller = new LettersInputController(this.controllerLettersArray, this.tryToApplyWord);
    }

    applyLevelNumberToUi () {
        this.$levelNumberNode.innerText = `Уровень ${this.levelNumber + 1}`;
        this.$congratulationHeader.innerText = `Уровень ${this.levelNumber + 1} пройден`;
        this.$congratulationButtonText.innerText = `Уровень ${this.levelNumber + 2}`;
    }


    tryToApplyWord = word => {
        const matchedWord = this.modelArray.find(wordModel => wordModel.word === word && !wordModel.isSolved);
        if (!matchedWord) return;

        matchedWord.isSolved = true;
        this.viewArray[matchedWord.index].matchAsSolved();
        this.saveProgress(this.levelNumber, this.modelArray);

        const isLevelFinished = !this.modelArray.find(wordModel => !wordModel.isSolved);
        if (isLevelFinished) {
            this.$levelPage.classList.add('hidden');
            this.$congratulationPage.classList.remove('hidden');
        }
    };


    addEventListeners () {
        this.$congratulationButton.addEventListener('click', this.reloadPageWithTheNextLevel)
    }


    reloadPageWithTheNextLevel = () => {
        const nextLevel = this.levelNumber + 1;
        const indexOfNextLevel = this.getWordsArrayIndexByLevelNumber(nextLevel);
        const wordsArray = [...this.levelsArray[indexOfNextLevel]];
        const modelArray = wordsArray.map((word, index) => {
            return { word, isSolved: false, index };
        });
        this.saveProgress (nextLevel, modelArray);
        window.location.reload();
    };


    getWordsArrayIndexByLevelNumber (levelNumber) {
        const index = levelNumber < this.levelsArray.length ? levelNumber : levelNumber % this.levelsArray.length;
        return index;
    }


    saveProgress (level, model) {
        localStorage.setItem('level', level);
        localStorage.setItem('model', JSON.stringify(model));
    }


    getSavedProgress () {
        const savedLevelNumberString = localStorage.getItem('level');
        const savedLevelNumber = savedLevelNumberString ? parseInt(savedLevelNumberString) : 0;
        const model = localStorage.getItem('model');
        const savedModelParsed = JSON.parse(model);
        return { savedLevelNumber, savedModel: savedModelParsed };
    }


    checkIfCorrectSavedProgressInLocalStorage () {
        const { savedLevelNumber, savedModel } = this.getSavedProgress();
        if (!savedLevelNumber && !savedModel) return false;

        const indexOfSavedLevel = this.getWordsArrayIndexByLevelNumber(savedLevelNumber);
        const wordsArrayAccordingToSavedLevelNumber = this.levelsArray[indexOfSavedLevel];

        const isSavedLevelModelAndFindedWordsArrayAreSameLength = savedModel.length === wordsArrayAccordingToSavedLevelNumber.length;
        const hasSavedLevelModelSameWordsAsFindedWordsArray = !savedModel.find(wordObj => wordObj.word !== wordsArrayAccordingToSavedLevelNumber[wordObj.index])

        return isSavedLevelModelAndFindedWordsArrayAreSameLength && hasSavedLevelModelSameWordsAsFindedWordsArray;
    }


    setCellSize () {
        const numberOfWords = this.wordsArray.length;
        const longestWord =  this.wordsArray.reduce((a, b) => a.length > b.length ? a : b, '');
        const numberOfCells = numberOfWords >= longestWord.length ? numberOfWords : longestWord.length;
        const cellSize = this.wordsContainerSquareSizeInVH / ( numberOfCells + (numberOfCells - 1)/this.wordCellSizeDevideFlexGap);

        const root = document.querySelector(':root');
        root.style.setProperty('--cell-size', cellSize +'vh');
    }
};
