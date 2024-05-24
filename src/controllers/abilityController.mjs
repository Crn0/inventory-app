import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import isFirstLetterUpperCaseAndAfterSpace from '../helpers/isUppercase.mjs'
import Ability from '../models/ability.mjs';
import Sequence from '../models/sequence.mjs'

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
    res.render('ability_form', {
        title: 'Ability Create'
    });
});

const ability_update_get = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const ability = await Ability.findById(id).exec();

    if(ability === null) {
        const error = new Error('Ability not found');
        error.status = 404;
        return next(error);
    }

    res.render('ability_form', {
        ability,
        title: 'Update Ability'
    })
});

const ability_delete_get = asyncHandler(async (req, res, _) => {
    const { id } = req.params;
    // Get details of ability and all the sequences that uses it (in parallel)
    const [ability, sequences] = await Promise.all([
        Ability.findById(id).exec(),
        Sequence.find({ abilities: id }, 'name image').sort({ name: 1 }).exec()
    ]);
    
    if(ability === null) {
       res.redirect('/inventory/abilities')
    }

    res.render('ability_delete', {
        ability,
        sequences,
        title: 'Delete Ability'
    });
});

// POST form request
const ability_create_post = [
    // Convert the description to an array.
    (req, res, next) => {
        if(!Array.isArray(req.body.descriptions)) {
            req.body.descriptions = typeof req.body.descriptions === 'undefined' ? [] : [req.body.descriptions]
        }

        next();
    },
    // Validate and sanitize field.
    body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must not be empty or greater than or equal to 3 words')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of ability name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    )
    .escape(),
    body('descriptions.*')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Description must not be empty or greater than or equal to 3 words')
    .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, _) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const { name, descriptions } = req.body;
        // Create a Ability object with trimmed data.
        const ability = new Ability({
            name,
            descriptions,
        });
        
        if(!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            return res.render('ability_form', {
                ability,
                errors: errors.array(),
                title: 'Ability Create'
            })
;        }
        // Data from form is valid.
        // Check if Ability with same name already exists.
        const abilityExist = await Ability.findOne({ name }).collation({ locale: 'en', strength: 2 }).exec()
        
        if(abilityExist) {
            // Ability exists, redirect to its detail page.

            return res.redirect(abilityExist.url)
        }

        await ability.save();

        res.redirect(ability.url);
    })
];

const ability_update_post = [
    // Convert the description to an array.
    (req, res, next) => {
        if(!Array.isArray(req.body.descriptions)) {
            req.body.descriptions = typeof req.body.descriptions === 'undefined' ? [] : [req.body.descriptions]
        }

        next();
    },
    // Validate and sanitize field.
    body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must not be empty or greater than or equal to 3 words')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of ability name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    )
    .escape(),
    body('descriptions.*')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Description must not be empty or greater than or equal to 3 words')
    .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, _) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const { name, descriptions } = req.body;
        const { id } = req.params;
        // Create a Ability object with trimmed data.
        const ability = new Ability({
            name,
            descriptions,
            _id: id,
        });
        
        if(!errors.isEmpty()) {
            // There are errors. Render the form again with sanitized values/error messages.
            return res.render('ability_form', {
                ability,
                errors: errors.array(),
                title: 'Ability Create'
            })
;        }
        // Data from form is valid. Update the record.
        const updatedAbility = await Ability.findByIdAndUpdate(id, ability, {});

        res.redirect(updatedAbility.url);
    })
];

const ability_delete_post = asyncHandler(async (req, res, _) => {
    const { id } = req.params;
    // Get details of sequences that uses this ability
    const sequences = await Sequence.updateMany({ abilities: id }, { $pull: { abilities: id }})
    console.log(sequences);

    await Ability.findByIdAndDelete(id);

    res.redirect('/inventory/abilities');

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
