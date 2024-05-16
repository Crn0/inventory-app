import asyncHandler from 'express-async-handler';
import Pathway from '../models/pathway.mjs';

// HOME PAGE
const page_index = asyncHandler( async (req, res, _) => {
	res.send('NOT IMPLEMENTED: Site Home Page');
});

// Detail pages
const pathway_list = asyncHandler( async (req, res, _) => {
	res.send('NOT IMPLEMENTED: Pathway list');
});

const pathway_detail = asyncHandler( async (req, res, _) => {
	res.send(`NOT IMPLEMENTED: Pathway detail: ${req.params.id}`)
});

// GET form request 
const pathway_create_get = asyncHandler( async (req, res, _) => {
	res.send('NOT IMPLEMENTED: Pathway create GET')
});

const pathway_update_get = asyncHandler( async (req, res, _) => {
	res.send('NOT IMPLEMENTED: Pathway update GET')
});

const pathway_delete_get = asyncHandler( async (req, res, _) => {
	res.send('NOT IMPLEMENTED: Pathway delete GET')
});

// POST form request
const pathway_create_post = asyncHandler( async (req, res, _) => {
	res.send('NOT IMPLEMENTED: Pathway create POST')
});

const pathway_update_post = asyncHandler( async (req, res, _) => {
	res.send('NOT IMPLEMENTED: Pathway update POST')
});

const pathway_delete_post = asyncHandler( async (req, res, _) => {
	res.send('NOT IMPLEMENTED: Pathway delete POST')
});

export {
    page_index,
    pathway_list,
    pathway_detail,
    pathway_create_get,
    pathway_update_get,
    pathway_delete_get,
    pathway_create_post,
    pathway_delete_post,
    pathway_update_post,
};

