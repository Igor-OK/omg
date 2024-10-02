import { isValidCyrillicWord } from './isValidCyrillicWord.js';

export const prepareLevelsData = levels => {
    const preparedCopyOfLevels = levels.map(levelWords => {
        return [...levelWords].reduce((acc, word) => {
            if (isValidCyrillicWord(word)) {
                const loweredWord = word.toLowerCase()
                acc.push(loweredWord);
            }
            return acc;
        }, []);
    });

    return preparedCopyOfLevels;
};
