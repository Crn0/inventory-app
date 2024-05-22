import asyncHandler from 'express-async-handler';
import MainIngredient from '../models/mainIngredient.mjs';
import Sequence from '../models/sequence.mjs';

// Detail page
const mainIngredient_list = asyncHandler(async (req, res, _) => {
    // GET a list of main ingredients
    const mainIngredients = await MainIngredient.find({}).sort({ name: 1 }).exec();

    res.render('mainIngredient_list', {
        mainIngredients,
        title: 'Main Ingredients',
    });
});

const mainIngredient_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET main ingredient and sequences detail(in parallel)
    const [mainIngredient, sequences] = await Promise.all([
        MainIngredient.findById(id).exec(),
        Sequence.find({ 'formula.main_ingredients': { _id: id }}).sort({ name: 1 }).exec()
    ]);

    if(mainIngredient === null) {
        // No results.
        const error = new Error('Main Ingredient not found');
        error.status = 404;
        return next(error);
    }

    res.render('mainIngredient_detail', {
        mainIngredient,
        sequences,
        title: 'Main Ingredient Database'
    });
});

// GET form request
const mainIngredient_create_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient create GET');
});

const mainIngredient_update_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient update GET');
});

const mainIngredient_delete_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient delete get');
});

// POST form request
const mainIngredient_create_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient create POST');
});

const mainIngredient_update_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient update_post');
});

const mainIngredient_delete_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient delete post');
});

export {
    mainIngredient_list,
    mainIngredient_detail,
    mainIngredient_create_get,
    mainIngredient_update_get,
    mainIngredient_delete_get,
    mainIngredient_create_post,
    mainIngredient_update_post,
    mainIngredient_delete_post,
};
