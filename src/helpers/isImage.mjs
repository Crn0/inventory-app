const isImage = (value, { req }) => {
    // if(req.file.toLowerCase() === '')
    const extension = req.file ? req.file.mimetype : '';

    switch (extension) {
        case 'image/jpg':
            return '.jpg';
        case 'image/jpeg':
            return '.jpeg';
        case 'image/png':
            return '.png';
        case '':
            return true;
        default:
            return false;
    }
};

export default isImage;
