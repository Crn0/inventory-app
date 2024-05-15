const validateUrl = (string) => {
    // https://regexr.com/806jh
    const regex =
        /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;

    return regex.test(string);
};

export default validateUrl;
