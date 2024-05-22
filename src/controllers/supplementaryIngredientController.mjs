import asyncHandler from 'express-async-handler';
import SupplementaryIngredient from '../models/supplementaryIngredient.mjs';
import Sequence from '../models/sequence.mjs';


// Detail page
const supplementaryIngredient_list = asyncHandler(async (req, res, _) => {
    // GET a list of supplementary ingredients
    const supplementaryIngredients = await SupplementaryIngredient.find({}).sort({ name: 1 }).exec();

    res.render('supplementaryIngredient_list', {
        supplementaryIngredients,
        title: 'Supplementary Ingredients'
    })

});

const supplementaryIngredient_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET supplementary ingredient and sequences detail(in parallel)
    const [supplementaryIngredient, sequences] = await Promise.all([
        SupplementaryIngredient.findById(id).exec(),
        Sequence.find({ 'formula.supplementary_ingredients': { _id: id }}).sort({ name: 1 }).exec()
    ]);

    if(supplementaryIngredient === null) {
        // No results.
        const error = new Error('Main Ingredient not found');
        error.status = 404;
        return next(error);
    }

    res.render('supplementaryIngredient_detail', {
        supplementaryIngredient,
        sequences,
        title: 'Supplementary Ingredient Database'
    })
});

// GET form request
const supplementaryIngredient_create_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient create GET');
});

const supplementaryIngredient_update_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient update GET');
});

const supplementaryIngredient_delete_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient delete get');
});

// POST form request
const supplementaryIngredient_create_post = asyncHandler(
    async (req, res, _) => {
        res.send('NOT IMPLEMENTED: SupplementaryIngredient create POST');
    }
);

const supplementaryIngredient_update_post = asyncHandler(
    async (req, res, _) => {
        res.send('NOT IMPLEMENTED: SupplementaryIngredient update_post');
    }
);

const supplementaryIngredient_delete_post = asyncHandler(
    async (req, res, _) => {
        res.send('NOT IMPLEMENTED: SupplementaryIngredient delete post');
    }
);

export {
    supplementaryIngredient_list,
    supplementaryIngredient_detail,
    supplementaryIngredient_create_get,
    supplementaryIngredient_update_get,
    supplementaryIngredient_delete_get,
    supplementaryIngredient_create_post,
    supplementaryIngredient_update_post,
    supplementaryIngredient_delete_post,
};
