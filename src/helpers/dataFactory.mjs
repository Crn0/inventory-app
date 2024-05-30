const imageFactory = (name) => {
    const images = [];

    const setImage = (index, url, cloudinary_id) => {
        images[index] = {
            url,
            cloudinary_id,
        };
    };

    const getImage = (index) =>
        index === 'undefined' ? images : images[index];

    const getName = () => name;

    return Object.freeze({
        setImage,
        getImage,
        getName,
    });
};

export const PathwayFactory = (name) => {
    const { setImage, getImage, getName } = imageFactory(name);
    const paths = [];

    const setPath = (index, value) => {
        paths[index] = value;
    };

    const getPath = (index) => paths[index];

    return {
        setImage,
        setPath,
        getName,
        getPath,
        getImage,
    };
};

export const SequenceFactory = (name) => {
    const { setImage, getImage, getName } = imageFactory(name);
    const sequences = [];

    const setSequence = (index, value) => {
        sequences[index] = value;
    };

    const getSequence = (index) => sequences[index];

    return {
        setImage,
        setSequence,
        getName,
        getSequence,
        getImage,
    };
};

export const SefirahFactory = (name) => {
    const { setImage, getImage, getName } = imageFactory(name);
    const sefirahs = [];

    const setSefirah = (index, value) => {
        sefirahs[index] = value;
    };

    const getSefirah = (index) => sefirahs[index];

    return Object.freeze({
        setImage,
        setSefirah,
        getName,
        getImage,
        getSefirah,
    });
};

export const TarotFactory = (name) => {
    const { setImage, getImage, getName } = imageFactory(name);
    const tarots = [];

    const setTarot = (index, value) => {
        tarots[index] = value;
    };

    const getTarot = (index) => tarots[index];

    return Object.freeze({
        setImage,
        setTarot,
        getName,
        getImage,
        getTarot,
    });
};

export const AbilityFactory = (name) => {
    const abilities = [];

    const getName = () => name;

    const setAbility = (index, value) => {
        abilities[index] = value;
    };

    const getAbility = (index) => abilities[index];

    return Object.freeze({
        setAbility,
        getName,
        getAbility,
    });
};

export const MainIngredientFactory = (name) => {
    const { setImage, getImage, getName } = imageFactory(name);
    const ingredients = [];

    const setIngredient = (index, value) => {
        ingredients[index] = value;
    };

    const getIngredient = (index) => ingredients[index];

    return Object.freeze({
        setImage,
        setIngredient,
        getName,
        getImage,
        getIngredient,
    });
};

export const SupplementaryIngredientFactory = (name) => {
    const { setImage, getImage, getName } = imageFactory(name);
    const ingredients = [];

    const setIngredient = (index, value) => {
        ingredients[index] = value;
    };

    const getIngredient = (index) => ingredients[index];

    return Object.freeze({
        setImage,
        setIngredient,
        getName,
        getImage,
        getIngredient,
    });
};
