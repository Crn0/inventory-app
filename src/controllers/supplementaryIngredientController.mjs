import asyncHandler from 'express-async-handler';
import SupplementaryIngredient from '../models/supplementaryIngredient.mjs';

// Detail page
const supplementaryIngredient_list = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient list');
});

const supplementaryIngredient_detail = asyncHandler( async (req, res, _) => {
    res.send(`NOT IMPLEMENTED: SupplementaryIngredient detail: ${req.params.id}`);
});

// GET form request
const supplementaryIngredient_create_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient create GET');
});

const supplementaryIngredient_update_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient update GET');
});

const supplementaryIngredient_delete_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient delete get');
});

// POST form request
const supplementaryIngredient_create_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient create POST');
});

const supplementaryIngredient_update_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient update_post');
});

const supplementaryIngredient_delete_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: SupplementaryIngredient delete post');
});

export {
    supplementaryIngredient_list,
    supplementaryIngredient_detail,
    supplementaryIngredient_create_get,
    supplementaryIngredient_update_get,
    supplementaryIngredient_delete_get,
    supplementaryIngredient_create_post,
    supplementaryIngredient_update_post,
    supplementaryIngredient_delete_post,
}