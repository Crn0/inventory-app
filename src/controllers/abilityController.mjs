import asyncHandler from 'express-async-handler';
import Ability from '../models/ability.mjs';

// Detail page
const ability_list = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability list');
});

const ability_detail = asyncHandler( async (req, res, _) => {
    res.send(`NOT IMPLEMENTED: Ability detail: ${req.params.id}`);
});

// GET form request
const ability_create_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability create GET');
});

const ability_update_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability update GET');
});

const ability_delete_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability delete get');
});

// POST form request
const ability_create_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability create POST');
});

const ability_update_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability update_post');
});

const ability_delete_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability delete post');
});

export {
    ability_list,
    ability_detail,
    ability_create_get,
    ability_update_get,
    ability_delete_get,
    ability_create_post,
    ability_update_post,
    ability_delete_post,
}