const isFirstLetterUpperCaseAndAfterSpace = (str) => {
    // https://regex101.com/r/LiVqX7/1
    const reg = new RegExp(
        /^[A-Z](?:[a-z]\d|[a-z]|\d|\d[a-z])*(?:[-\s](?:[A-Z]|\d)(?:[a-z]\d|[a-z]|\d*|\d[a-z]*)*)*$/
    );

    return reg.test(str.trim());
};

export default isFirstLetterUpperCaseAndAfterSpace;
