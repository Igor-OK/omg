export const isValidCyrillicWord = word => {
    const regex = /^[а-яёА-ЯЁ]+$/i;
    const minimalValidLength = 2;

    return typeof word === 'string' && word.length >= minimalValidLength && regex.test(word);
};
