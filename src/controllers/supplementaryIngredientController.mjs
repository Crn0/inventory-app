import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import isFirstLetterUpperCaseAndAfterSpace from '../helpers/isUppercase.mjs';
import Cloudinary from '../helpers/uploadAndUpdateImage.mjs';
import IsImage from '../helpers/isImage.mjs';
import {
    ThereIsImage,
    ThereIsImageAndUrl,
    ThereIsImageAndNoUrl,
} from '../helpers/conditionals.mjs';
import SupplementaryIngredient from '../models/supplementaryIngredient.mjs';
import Sequence from '../models/sequence.mjs';

// Detail page
const supplementaryIngredient_list = asyncHandler(async (req, res, _) => {
    // GET a list of supplementary ingredients
    const supplementaryIngredients = await SupplementaryIngredient.find({})
        .sort({ name: 1 })
        .exec();

    res.render('supplementaryIngredient_list', {
        supplementaryIngredients,
        title: 'Supplementary Ingredients',
    });
});

const supplementaryIngredient_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET supplementary ingredient and sequences detail(in parallel)
    const [supplementaryIngredient, sequences] = await Promise.all([
        SupplementaryIngredient.findById(id).exec(),
        Sequence.find({ 'formula.supplementary_ingredients': { _id: id } })
            .sort({ name: 1 })
            .exec(),
    ]);

    if (supplementaryIngredient === null) {
        // No results.
        const error = new Error('Main Ingredient not found');
        error.status = 404;
        return next(error);
    }

    res.render('supplementaryIngredient_detail', {
        supplementaryIngredient,
        sequences,
        title: 'Supplementary Ingredient Database',
    });
});

// GET form request
const supplementaryIngredient_create_get = asyncHandler(async (req, res, _) => {
    res.render('supplementaryIngredient_form', {
        title: 'Create Supplementary Ingredient',
    });
});

const supplementaryIngredient_update_get = asyncHandler(
    async (req, res, next) => {
        const { id } = req.params;
        const ingredient = await SupplementaryIngredient.findById(id).exec();

        if (ingredient === null) {
            const error = new Error('Supplementary Ingredient not found');
            error.status = 404;

            return next(error);
        }

        res.render('supplementaryIngredient_form', {
            ingredient,
            title: 'Update Supplementary Ingredient',
        });
    }
);

const supplementaryIngredient_delete_get = asyncHandler(async (req, res, _) => {
    const { id } = req.params;
    // GET details of ingredient and its sequences.
    const [ingredient, sequences] = await Promise.all([
        SupplementaryIngredient.findById(id).exec(),
        Sequence.find({ 'formula.supplementary_ingredients': id })
            .sort({ name: 1 })
            .exec(),
    ]);

    if (ingredient === null) {
        res.redirect('/inventory/main_ingredients');
    }

    res.render('supplementaryIngredient_delete', {
        ingredient,
        sequences,
        title: 'Delete Supplementary Ingredient',
    });
});

// POST form request
const supplementaryIngredient_create_post = [
    // Validate and sanitize field.
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Name must be greater than or equals to 3 letters; and not be empty'
        )
        .isLength({ max: 100 })
        .withMessage('Max name length is 100')
        .custom(isFirstLetterUpperCaseAndAfterSpace)
        .withMessage(
            'The first character of ingredient name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
        )
        .escape(),
    body('image')
        .trim()
        .custom(IsImage)
        .withMessage(
            'The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.'
        )
        .escape(),
    body('stocks').trim().escape(),
    body('description')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Description must not be empty or greater than or equal to 3 words'
        )
        .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, _) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const { name, description, stocks } = req.body;
        const imageBinary = req.file?.buffer;
        // Create a Ingredient object with trimmed data.
        const ingredient = new SupplementaryIngredient({
            name,
            stocks,
            description,
        });
        if (!errors.isEmpty()) {
            return res.render('supplementaryIngredient_form', {
                ingredient,
                errors: errors.array(),
                title: 'Create Supplementary Ingredient',
            });
        }
        // Data form is valid
        // Check if ingredients with the same name exists
        const ingredientExist = await SupplementaryIngredient.findOne({ name })
            .collation({ locale: 'en', strength: 2 })
            .exec();

        if (ingredientExist) {
            // ingredient exists, redirect to its detail page.

            return res.redirect(ingredientExist.url);
        }

        if (ThereIsImage(imageBinary)) {
            // There is image
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const cloudinaryUpload = await Cloudinary.upload(
                dataURI,
                'supplementary_ingredient_art'
            );
            ingredient.image = {
                url: cloudinaryUpload.url,
                cloudinary_id: cloudinaryUpload.public_id,
            };
        }

        await ingredient.save();

        res.redirect(ingredient.url);
    }),
];

const supplementaryIngredient_update_post = [
    // Validate and sanitize field.
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Name must be greater than or equals to 3 letters; and not be empty'
        )
        .isLength({ max: 100 })
        .withMessage('Max name length is 100')
        .custom(isFirstLetterUpperCaseAndAfterSpace)
        .withMessage(
            'The first character of ingredient name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
        )
        .escape(),
    body('image')
        .trim()
        .custom(IsImage)
        .withMessage(
            'The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.'
        )
        .escape(),
    body('stocks').trim().escape(),
    body('description')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Description must not be empty or greater than or equal to 3 words'
        )
        .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, _) => {
        const { id } = req.params;
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const { name, description, stocks } = req.body;
        const imageBinary = req.file?.buffer;
        // GET ingredient details
        const oldIngredient = await SupplementaryIngredient.findById(id).exec();
        // Create a Ingredient object with trimmed data.
        const ingredient = new SupplementaryIngredient({
            name,
            stocks,
            description,
            _id: id,
        });

        if (!errors.isEmpty()) {
            return res.render('supplementaryIngredient_form', {
                ingredient,
                errors: errors.array(),
                title: 'Update Supplementary Ingredient',
            });
        }

        // Data form is valid
        if (ThereIsImageAndNoUrl(imageBinary, oldIngredient)) {
            // There is image file and no image url
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const cloudinaryUpload = await Cloudinary.upload(
                dataURI,
                'supplementary_ingredient_art'
            );
            ingredient.image = {
                url: cloudinaryUpload.url,
                cloudinary_id: cloudinaryUpload.public_id,
            };
        }

        if (ThereIsImageAndUrl(imageBinary, oldIngredient)) {
            // There is image file and image url; update the image asset
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            await Cloudinary.update(
                dataURI,
                oldIngredient.image.cloudinary_id,
                true
            );
        }

        // Data from form is valid. Update the record.
        await SupplementaryIngredient.findByIdAndUpdate(id, ingredient, {});

        res.redirect(ingredient.url);
    }),
];

const supplementaryIngredient_delete_post = asyncHandler(
    async (req, res, _) => {
        const { id } = req.params;

        // GET details of ingredient.
        const ingredient = await SupplementaryIngredient.findById(id).exec();

        // Delete the ingredient referenced in the sequences.
        await Sequence.updateMany(
            { 'formula.supplementary_ingredients': id },
            { $pull: { 'formula.supplementary_ingredients': id } }
        );

        if (ThereIsImage(ingredient.image.cloudinary_id)) {
            // Delete image in cloudinary.
            await Cloudinary.destroy(ingredient.image.cloudinary_id, true);
        }

        // Delete object and redirect to the list of ingredients.
        await SupplementaryIngredient.findByIdAndDelete(id, ingredient, {});

        res.redirect('/inventory/supplementary_ingredients');
    }
);

export {
    supplementaryIngredient_list,
    supplementaryIngredient_detail,
    supplementaryIngredient_create_get,
    supplementaryIngredient_update_get,
    supplementaryIngredient_delete_get,
    supplementaryIngredient_create_post,
    supplementaryIngredient_update_post,
    supplementaryIngredient_delete_post,
};
