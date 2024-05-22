import asyncHandler from 'express-async-handler';
import Pathway from '../models/pathway.mjs';
import Sequence from '../models/sequence.mjs';
import Sefirah from '../models/sefirah.mjs';
import Tarot from '../models/tarot.mjs';
import MainIngredient from '../models/mainIngredient.mjs';
import SupplementaryIngredient from '../models/supplementaryIngredient.mjs';
import Ability from '../models/ability.mjs';

// HOME PAGE
const page_index = asyncHandler(async (req, res, _) => {
    // Get details of pathway, sequence, sefirah, tarot, main ing, supp ing and ability ( in parallel )
    const [
        pathwayCount,
        sequenceCount,
        sefirahCount,
        tarotCount,
        mainIngredientCount,
        supplementaryIngredientCount,
        abilityCount,
    ] = await Promise.all([
        Pathway.countDocuments({}).exec(),
        Sequence.countDocuments({}).exec(),
        Sefirah.countDocuments({}).exec(),
        Tarot.countDocuments({}).exec(),
        MainIngredient.countDocuments({ stocks: { $gt: 1 }}).exec(),
        SupplementaryIngredient.countDocuments({ stocks: { $gt: 1 }}).exec(),
        Ability.countDocuments({}).exec(),
    ]);
    res.render('index', {
        pathwayCount,
        sequenceCount,
        sefirahCount,
        tarotCount,
        mainIngredientCount,
        supplementaryIngredientCount,
        abilityCount,
        title: 'Chanis Gate',
    });
});

// Detail pages
const pathway_list = asyncHandler(async (req, res, _) => {
    // Display list of all pathways
    const pathways = await Pathway.find({}, 'name image').sort({ name: 1 }).exec();
    res.render('pathway_list', {
        pathways,
        title: 'Pathways'
    });
});

const pathway_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // Get details of pathway, sequence, and sefirah( in parallel )
    const [pathway, sequences] = await Promise.all([
        Pathway.findById(id).populate(['card_of_blasphemy', 'sefirah']).exec(),
        Sequence.find({ path: id }, 'image name abilities').populate(['abilities']).sort({ name: 1 }).exec(),

    ]);

    if(pathway === null) {
        // No results
        const error = new Error('Pathway not found');
        error.status = 404;
        return next(error);
    }

    res.render('pathway_detail',{
        pathway,
        sequences,
        title: 'Pathway Database',
    })
});

// GET form request
const pathway_create_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Pathway create GET');
});

const pathway_update_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Pathway update GET');
});

const pathway_delete_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Pathway delete GET');
});

// POST form request
const pathway_create_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Pathway create POST');
});

const pathway_update_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Pathway update POST');
});

const pathway_delete_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Pathway delete POST');
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
