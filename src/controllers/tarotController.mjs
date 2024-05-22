import asyncHandler from 'express-async-handler';
import Tarot from '../models/tarot.mjs';
import Pathway from '../models/pathway.mjs';

// Detail page
const tarot_list = asyncHandler(async (req, res, _) => {
    // GET list of tarot
    const tarots = await Tarot.find({}).sort({ name: 1 }).exec();

    res.render('tarot_list', {
        tarots,
        title: 'Card of Blasphemy',
    });
});

const tarot_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET details of tarot and pathway(in parallel)
    const [tarot, pathway] = await Promise.all([
        Tarot.findById(id).exec(),
        Pathway.findOne({ card_of_blasphemy: { _id: id }}).exec()
    ]);
    console.log(pathway)
    if(tarot === null) {
        // No results.
        const error = new Error('Sefirah not found');
        error.status = 404;
        return next(error);
    }

    res.render('tarot_detail', {
        tarot,
        pathway,
        title: 'Card of Blasphemy Database'
    });
});

// GET form request
const tarot_create_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot create GET');
});

const tarot_update_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot update GET');
});

const tarot_delete_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot delete get');
});

// POST form request
const tarot_create_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot create POST');
});

const tarot_update_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Tarot update_post');
});

const tarot_delete_post = asyncHandler(async (req, res, _) => {
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
};
