import asyncHandler from 'express-async-handler';
import Sequence from '../models/sequence.mjs';

// Detail page
const sequence_list = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence list');
});

const sequence_detail = asyncHandler( async (req, res, _) => {
    res.send(`NOT IMPLEMENTED: Sequence detail: ${req.params.id}`);
});

// GET form request
const sequence_create_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence create GET');
});

const sequence_update_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence update GET');
});

const sequence_delete_get = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence delete get');
});

// POST form request
const sequence_create_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence create POST');
});

const sequence_update_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence update_post');
});

const sequence_delete_post = asyncHandler( async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence delete post');
});

export {
    sequence_list,
    sequence_detail,
    sequence_create_get,
    sequence_update_get,
    sequence_delete_get,
    sequence_create_post,
    sequence_update_post,
    sequence_delete_post,
}