const isFirstLetterUpperCaseAndAfterSpace = (str) => {
    // https://regexr.com/7vocr
    const reg = new RegExp(/^[A-Z][a-z]*(?:[-\s][A-Z][a-z]*)*$/)

    return reg.test(str);
}
    
export default isFirstLetterUpperCaseAndAfterSpace;