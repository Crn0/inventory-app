import asyncHandler from 'express-async-handler';
import MainIngredient from '../models/mainIngredient.mjs';

// Detail page
const mainIngredient_list = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient list');
});

const mainIngredient_detail = asyncHandler( async (req, res, _) => {
    res.send(`NOT IMPLEMENTED: MainIngredient detail: ${req.params.id}`);
});

// GET form request
const mainIngredient_create_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient create GET');
});

const mainIngredient_update_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient update GET');
});

const mainIngredient_delete_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient delete get');
});

// POST form request
const mainIngredient_create_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient create POST');
});

const mainIngredient_update_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: MainIngredient update_post');
});

const mainIngredient_delete_post = asyncHandler( async (req, res, _) => {
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
}