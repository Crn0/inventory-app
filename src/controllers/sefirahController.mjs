import asyncHandler from 'express-async-handler';
import Sefirah from '../models/sefirah.mjs';
import Pathway from '../models/pathway.mjs';

// Detail page
const sefirah_list = asyncHandler(async (req, res, _) => {
    // GET list of sefirahs
    const sefirahs = await Sefirah.find({}).sort({ name: 1 }).exec()

    res.render('sefirah_list', {
        sefirahs,
        title: 'Sefirahs'
    });
});

const sefirah_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET sefirah and pathways detail(in parallel)
    const [ sefirah, pathways ] = await Promise.all([
        Sefirah.findById(id).exec(),
        Pathway.find({ sefirah: { _id: id }}).sort({ name: 1 }).exec()
    ]);

    if(sefirah === null) {
        // No results.
        const error = new Error('Sefirah not found');
        error.status = 404;
        return next(error);
    }

    res.render('sefirah_detail', {
        sefirah,
        pathways,
        title: 'Sefirah Database'
    });
});

// GET form request
const sefirah_create_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah create GET');
});

const sefirah_update_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah update GET');
});

const sefirah_delete_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah delete get');
});

// POST form request
const sefirah_create_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah create POST');
});

const sefirah_update_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sefirah update_post');
});

const sefirah_delete_post = asyncHandler(async (req, res, _) => {
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
};
