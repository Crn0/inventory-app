import asyncHandler from 'express-async-handler';
import Sefirah from '../models/sefirah.mjs';

// Detail page
const sefirah_list = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah list');
});

const sefirah_detail = asyncHandler( async (req, res, _) => {
    res.send(`NOT IMPLEMENTED: Sefirah detail: ${req.params.id}`);
});

// GET form request
const sefirah_create_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah create GET');
});

const sefirah_update_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah update GET');
});

const sefirah_delete_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah delete get');
});

// POST form request
const sefirah_create_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah create POST');
});

const sefirah_update_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah update_post');
});

const sefirah_delete_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah delete post');
});

export {
    sefirah_list,
    sefirah_detail,
    sefirah_create_get,
    sefirah_update_get,
    sefirah_delete_get,
    sefirah_create_post,
    sefirah_update_post,
    sefirah_delete_post,
}