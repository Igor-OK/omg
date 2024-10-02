const getLevel = async ( filePath ) => {
    const response = await fetch(filePath);
    return await response.json();
};

 export const createLevelsArray = async () => {
    const levelJson1 = await getLevel('../levels/1.json');
    const levelJson2 = await getLevel('../levels/2.json');
    const levelJson3 = await getLevel('../levels/3.json');

    return [levelJson1.words, levelJson2.words, levelJson3.words];
};
