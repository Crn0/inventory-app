import asyncHandler from 'express-async-handler';
import Tarot from '../models/tarot.mjs';

// Detail page
const tarot_list = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot list');
});

const tarot_detail = asyncHandler( async (req, res, _) => {
    res.send(`NOT IMPLEMENTED: Tarot detail: ${req.params.id}`);
});

// GET form request
const tarot_create_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot create GET');
});

const tarot_update_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot update GET');
});

const tarot_delete_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot delete get');
});

// POST form request
const tarot_create_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot create POST');
});

const tarot_update_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot update_post');
});

const tarot_delete_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot delete post');
});

export {
    tarot_list,
    tarot_detail,
    tarot_create_get,
    tarot_update_get,
    tarot_delete_get,
    tarot_create_post,
    tarot_update_post,
    tarot_delete_post,
}