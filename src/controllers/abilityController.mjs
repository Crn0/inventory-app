import asyncHandler from 'express-async-handler';
import Ability from '../models/ability.mjs';

// Detail page
const ability_list = asyncHandler(async (req, res, _) => {
    // GET list of ability details
    const abilities = await Ability.find({}, 'name').sort({ name: 1 }).exec();
    res.render('ability_list', {
        abilities,
        title: 'Abilities',
    });
});

const ability_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET ability details
    const ability = await Ability.findById(id).exec();

    if(ability === null) {
        // No results.
        const error = new Error('Ability not found');
        error.status = 404;
        return next(error);
    }

    res.render('ability_detail', {
        ability,
        title: 'Ability Database'
    });
});

// GET form request
const ability_create_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability create GET');
});

const ability_update_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability update GET');
});

const ability_delete_get = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability delete get');
});

// POST form request
const ability_create_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability create POST');
});

const ability_update_post = asyncHandler(async (req, res, _) => {
    res.send('NOT IMPLEMENTED: Ability update_post');
});

const ability_delete_post = asyncHandler(async (req, res, _) => {
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
};
