export const getMinimalSetOfLetters = words => {
    const necessaryLetters = words[0].split('');
    if(words.length === 1) return necessaryLetters;
    let currentIndex = 1;

    while (currentIndex < words.length) {
        const currentWord = words[currentIndex];

        const necessaryLettersWithFlags = necessaryLetters.map (letter => {
            return {value: letter, isUsedForCurrentWord: false,}
        });

        const addAndUseLetter = newLetter => {
            necessaryLetters.push(newLetter);
            necessaryLettersWithFlags.push ({value: newLetter, isUsedForCurrentWord: true,});
        };

        currentWord.split('').forEach( letter => {
            const conditionForNewLetter = !necessaryLettersWithFlags.find(markedLetter => markedLetter.value === letter);
            if (conditionForNewLetter) {
                addAndUseLetter(letter);
                return;
            }
            const matchedNotUsedLetter = necessaryLettersWithFlags.find(markedLetter => markedLetter.value === letter && !markedLetter.isUsedForCurrentWord);
            if (!!matchedNotUsedLetter) {
                matchedNotUsedLetter.isUsedForCurrentWord = true;
                return;
            }
            addAndUseLetter(letter);
        });
        currentIndex++;
    }

    return necessaryLetters;
};
