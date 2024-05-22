import asyncHandler from 'express-async-handler';
import Sequence from '../models/sequence.mjs';

// Detail page
const sequence_list = asyncHandler(async (req, res, _) => {
    // GET list of sequences.
    const sequences = await Sequence.find({}).sort({ name: 1 }).exec();

    res.render('sequence_list', {
        sequences,
        title: 'Sequences'
    });
});

const sequence_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET details of sequence
    const sequence = await Sequence.findById(id).populate(['abilities', 'formula.main_ingredients', 'formula.supplementary_ingredients','path']).exec()
    // Deep copy main and supplementary ingredients
    const ingredients = [...JSON.parse(JSON.stringify(sequence.formula.main_ingredients)), ...JSON.parse(JSON.stringify(sequence.formula.supplementary_ingredients))]

    if(sequence === null) {
        // No results
        const error = new Error('Sequence not found');
        error.status = 404;
        return next(error);
    }
 
    res.render('sequence_detail', {
        sequence,
        title: 'Sequence Database',
        ingredients
    });
});

// GET form request
const sequence_create_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence create GET');
});

const sequence_update_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence update GET');
});

const sequence_delete_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence delete get');
});

// POST form request
const sequence_create_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence create POST');
});

const sequence_update_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Sequence update_post');
});

const sequence_delete_post = asyncHandler(async (req, res, _) => {
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
};
