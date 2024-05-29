import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import isFirstLetterUpperCaseAndAfterSpace from '../helpers/isUppercase.mjs';
import Cloudinary from '../helpers/uploadAndUpdateImage.mjs';
import IsImage from '../helpers/isImage.mjs';
import GreaterThanOrEquals from '../helpers/greaterThanOrEquals.mjs';
import { ThereIsImage, ThereIsImageAndUrl, ThereIsImageAndNoUrl} from '../helpers/conditionals.mjs';
import Sequence from '../models/sequence.mjs';
import Pathway from '../models/pathway.mjs';
import MainIngredient from '../models/mainIngredient.mjs';
import SupplementaryIngredient from '../models/supplementaryIngredient.mjs';
import Ability from '../models/ability.mjs';

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
    // GET all pathways, abilities and main/supplementary ingredients(in parallel)
    const [pathways, abilities, ...ingredients] = await Promise.all([
        Pathway.find({}).sort({ name: 1 }).exec(),
        Ability.find({}).sort({ name: 1 }).exec(),
        MainIngredient.find({}).sort({ name: 1 }).exec(),
        SupplementaryIngredient.find({}).sort({ name: 1 }).exec()
    ]);

    res.render('sequence_form', {
        pathways,
        ingredients,
        abilities,
        title: 'Create Sequence'
    });
});

const sequence_update_get = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET sequence and all pathways, abilities and main/supplementary ingredients for form.
    let [ sequence, pathways, abilities, ...ingredients] = await Promise.all([
        Sequence.findById(id).exec(),
        Pathway.find({}).sort({ name: 1 }).exec(),
        Ability.find({}).sort({ name: 1 }).exec(),
        MainIngredient.find({}).sort({ name: 1 }).exec(),
        SupplementaryIngredient.find({}).sort({ name: 1 }).exec(),
    ]);

    if(sequence === null) {
        const error = new Error('Sequence not found');
        error.status = 404;
        return next(error)
    }

    // Mark our selected main_ingredients as checked.
    ingredients[0] = ingredients[0].map((ingredient) => {
        if(sequence.formula.main_ingredients.includes(ingredient._id)) {
            return {...ingredient._doc, checked: true }
        }

        return ingredient;
    });

    // Mark our selected supplementary_ingredients as checked.
    ingredients[1] = ingredients[1].map((ingredient) => {
        if(sequence.formula.supplementary_ingredients.includes(ingredient._id)) {
            return {...ingredient._doc, checked: true }
        }

        return ingredient;
    });

    // Mark our selected abilities as checked.
    abilities = abilities.map((ability) => {
        if(sequence.abilities.includes(ability._id)) {
            return {...ability._doc, checked: true }
        }

        return ability;
    });

    res.render('sequence_form', {
        sequence,
        pathways,
        abilities,
        ingredients,
        title: 'Update Sequence'
    });
});

const sequence_delete_get = asyncHandler(async (req, res, _) => {
    const { id } = req.params;
    const sequence = await Sequence.findById(id).populate(['formula.main_ingredients', 'formula.supplementary_ingredients']).exec();
    const ingredients = [
        ...sequence.formula.main_ingredients.map(ing => ing),
        ...sequence.formula.supplementary_ingredients.map(ing => ing),
    ];

    if(sequence === null) {
        res.redirect('/inventory/sequences');
    }
    res.render('sequence_delete', {
        sequence,
        ingredients,
        title: 'Delete Sequence'
    });
});

// POST form request
const sequence_create_post = [
    // Convert the ability and main/supp ingredient to an array.
    (req, res, next) => {
        if(!Array.isArray(req.body.ability)) {
            req.body.ability = typeof req.body.ability === 'undefined' ? [] : [req.body.ability];
        }
        if(!Array.isArray(req.body.main_ingredient)) {
            req.body.main_ingredient = typeof req.body.main_ingredient === 'undefined' ? [] : [req.body.main_ingredient];
        }
        if(!Array.isArray(req.body.supplementary_ingredient)) {
            req.body.supplementary_ingredient = typeof req.body.supplementary_ingredient === 'undefined' ? [] : [req.body.supplementary_ingredient];
        }

        next();
    },
    // Validate and sanitize fields.
    body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be greater than or equals to 3 letters; and not be empty')
    .isLength({ max: 100 })
    .withMessage('Max name length is 100')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of sequence name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    )
    .escape(),
    body('image')
    .trim()
    .custom(IsImage)
    .withMessage('The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.')
    .escape(),
    body('pathway')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Pathway must not be empty.')
    .escape(),
    body('main_ingredient')
    .custom((_, { req }) => GreaterThanOrEquals('main_ingredient', req))
    .withMessage('Main Ingredient must not be empty.')
    .escape(),
    body('main_ingredient.*')
    .escape(),
    body('supplementary_ingredient')
    .custom((_, { req }) => GreaterThanOrEquals('supplementary_ingredient', req))
    .withMessage('Supplementary Ingredient must not be empty.')
    .escape(),
    body('supplementary_ingredient.*')
    .escape(),
    body('ability')
    .custom((_, { req }) => GreaterThanOrEquals('ability', req))
    .withMessage('ability must not be empty.')
    .escape(),
    body('ability.*')
    .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, _) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Extract req.body
        const { name, pathway, main_ingredient, supplementary_ingredient, ability} = req.body
        const imageBinary = req.file?.buffer;
        // Create a Sequence object with escaped and trimmed data.
        const sequence = new Sequence({
            name,
            path: pathway,
            formula: {
                main_ingredients: main_ingredient,
                supplementary_ingredients: supplementary_ingredient,
            },
            abilities: ability,
        });
        
        if(!errors.isEmpty()) {

            // GET all pathways, abilities and main/supplementary ingredients for form.
            let [pathways, abilities, ...ingredients] = await Promise.all([
                    Pathway.find({}).sort({ name: 1 }).exec(),
                    Ability.find({}).sort({ name: 1 }).exec(),
                    MainIngredient.find({}).sort({ name: 1 }).exec(),
                    SupplementaryIngredient.find({}).sort({ name: 1 }).exec()
                ]);
            // Mark our selected main_ingredients as checked.
            ingredients[0] = ingredients[0].map((ingredient) => {
                if(sequence.formula.main_ingredients.includes(ingredient._id)) {
                    return {...ingredient._doc, checked: true }
                }

                return ingredient;
            });

            // Mark our selected supplementary_ingredients as checked.
            ingredients[1] = ingredients[1].map((ingredient) => {
                if(sequence.formula.supplementary_ingredients.includes(ingredient._id)) {
                    return {...ingredient._doc, checked: true }
                }

                return ingredient;
            });

            // Mark our selected abilities as checked.
            abilities = abilities.map((ability) => {
                if(sequence.abilities.includes(ability._id)) {
                    return {...ability._doc, checked: true }
                }

                return ability;
            });


            return res.render('sequence_form', {
                sequence,
                pathways,
                ingredients,
                abilities,
                title: 'Create Sequence',
                errors: errors.array(),
            })
        }
         // Data form is valid
        // Check if ability with the same name exists
        const abilityExist = await Sequence.findOne({ name }).collation({ locale: 'en', strength: 2 }).exec();

        if(abilityExist) {
            res.redirect(abilityExist.url);
        }

        if(ThereIsImage(imageBinary)) {
             // There is image
             const b64 = Buffer.from(req.file.buffer).toString("base64");
             const dataURI = `data:${req.file.mimetype};base64,${b64}`
             const cloudinaryUpload = await Cloudinary.upload(dataURI, 'sequence_art')
             sequence.image = {
                 url: cloudinaryUpload.url,
                 cloudinary_id: cloudinaryUpload.public_id,
             };
        }

        await sequence.save();

        res.redirect(sequence.url);
    })
];

const sequence_update_post = [
    // Convert the ability and main/supp ingredient to an array.
    (req, res, next) => {
        if(!Array.isArray(req.body.ability)) {
            req.body.ability = typeof req.body.ability === 'undefined' ? [] : [req.body.ability];
        }
        if(!Array.isArray(req.body.main_ingredient)) {
            req.body.main_ingredient = typeof req.body.main_ingredient === 'undefined' ? [] : [req.body.main_ingredient];
        }
        if(!Array.isArray(req.body.supplementary_ingredient)) {
            req.body.supplementary_ingredient = typeof req.body.supplementary_ingredient === 'undefined' ? [] : [req.body.supplementary_ingredient];
        }

        next();
    },
    // Validate and sanitize fields.
    body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be greater than or equals to 3 letters; and not be empty')
    .isLength({ max: 100 })
    .withMessage('Max name length is 100')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of sequence name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    )
    .escape(),
    body('image')
    .trim()
    .custom(IsImage)
    .withMessage('The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.')
    .escape(),
    body('pathway')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Pathway must not be empty.')
    .escape(),
    body('main_ingredient')
    .custom((_, { req }) => GreaterThanOrEquals('main_ingredient', req))
    .withMessage('Main Ingredient must not be empty.')
    .escape(),
    body('main_ingredient.*')
    .escape(),
    body('supplementary_ingredient')
    .custom((_, { req }) => GreaterThanOrEquals('supplementary_ingredient', req))
    .withMessage('Supplementary Ingredient must not be empty.')
    .escape(),
    body('supplementary_ingredient.*')
    .escape(),
    body('ability')
    .custom((_, { req }) => GreaterThanOrEquals('ability', req))
    .withMessage('ability must not be empty.')
    .escape(),
    body('ability.*')
    .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, _) => {
        const { id } = req.params;
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Extract req.body
        const { name, pathway, main_ingredient, supplementary_ingredient, ability} = req.body
        const imageBinary = req.file?.buffer;
        const b64 = imageBinary && Buffer.from(req.file.buffer).toString("base64");
        const dataURI = `data:${req.file?.mimetype};base64,${b64}`;
        // Create a Sequence object with escaped and trimmed data.
        const sequence = new Sequence({
            name,
            path: pathway,
            formula: {
                main_ingredients: main_ingredient,
                supplementary_ingredients: supplementary_ingredient,
            },
            abilities: ability,
            _id: id
        });
        
        if(!errors.isEmpty()) {

            // GET all pathways, abilities and main/supplementary ingredients for form.
            let [pathways, abilities, ...ingredients] = await Promise.all([
                    Pathway.find({}).sort({ name: 1 }).exec(),
                    Ability.find({}).sort({ name: 1 }).exec(),
                    MainIngredient.find({}).sort({ name: 1 }).exec(),
                    SupplementaryIngredient.find({}).sort({ name: 1 }).exec()
                ]);
            // Mark our selected main_ingredients as checked.
            ingredients[0] = ingredients[0].map((ingredient) => {
                if(sequence.formula.main_ingredients.includes(ingredient._id)) {
                    return {...ingredient._doc, checked: true }
                }

                return ingredient;
            });

            // Mark our selected supplementary_ingredients as checked.
            ingredients[1] = ingredients[1].map((ingredient) => {
                if(sequence.formula.supplementary_ingredients.includes(ingredient._id)) {
                    return {...ingredient._doc, checked: true }
                }

                return ingredient;
            });

            // Mark our selected abilities as checked.
            abilities = abilities.map((ability) => {
                if(sequence.abilities.includes(ability._id)) {
                    return {...ability._doc, checked: true }
                }

                return ability;
            });


            return res.render('sequence_form', {
                sequence,
                pathways,
                ingredients,
                abilities,
                title: 'Create Sequence',
                errors: errors.array(),
            })
        }
        // Data form is valid
        const oldSequence = await Sequence.findById(id, 'image').exec()

        if(ThereIsImageAndNoUrl(imageBinary, oldSequence)) {
             const cloudinaryUpload = await Cloudinary.upload(dataURI, 'sequence_art');

             sequence.image = {
                 url: cloudinaryUpload.url,
                 cloudinary_id: cloudinaryUpload.public_id,
             };
        }
        
        if(ThereIsImageAndUrl(imageBinary, oldSequence)) {

            await Cloudinary.update(dataURI, oldSequence.image.cloudinary_id, true);
        }

        // Data from form is valid. Update the record.
        await Sequence.findByIdAndUpdate(id, sequence, {})

        res.redirect(sequence.url);
    })
];

const sequence_delete_post = asyncHandler(async (req, res, _) => {
    const { id } = req.params;

    // GET details of sequence
    const sequence = await Sequence.findById(id).exec();

    if(ThereIsImage(sequence.image.cloudinary_id)) {
        // Delete image in cloudinary.
        await Cloudinary.destroy(sequence.image.cloudinary_id, true);
    }
    // Delete object and redirect to the list of sequence
    await Sequence.findByIdAndDelete(id, sequence, {});

    res.redirect('/inventory/sequences');
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
