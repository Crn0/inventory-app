
const ThereIsImage = (image) => {

    return image !== undefined 
}

const ThereIsImageAndNoUrl = (image, obj) => {

    return image !== undefined && obj.image.url === undefined
}

const ThereIsImageAndUrl = (image, obj) => {

    return image !== undefined && obj.image.url !== undefined
}


export {
    ThereIsImage,
    ThereIsImageAndNoUrl,
    ThereIsImageAndUrl
}