import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import isFirstLetterUpperCaseAndAfterSpace from '../helpers/isUppercase.mjs';
import Cloudinary from '../helpers/uploadAndUpdateImage.mjs';
import IsImage from '../helpers/isImage.mjs';
import GreaterThanOrEquals from '../helpers/greaterThanOrEquals.mjs';
import { ThereIsImage, ThereIsImageAndUrl, ThereIsImageAndNoUrl} from '../helpers/conditionals.mjs';
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
    const [tarots, sefirahs] = await Promise.all([
        Tarot.find({}).sort({ name: 1 }).exec(),
        Sefirah.find({}).sort({ name: 1 }).exec()
    ]);

    res.render('pathway_form', {
        tarots,
        sefirahs,
        title: 'Create Pathway'
    });
});

const pathway_update_get = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const [pathway, tarots, sefirahs] = await Promise.all([
        Pathway.findById(id).exec(),
        Tarot.find({}).sort({ name: 1 }).exec(),
        Sefirah.find({}).sort({ name: 1 }).exec()
    ]);

    if(pathway === null) {
        const error = new Error('Pathway not found');
        error.status = 404;

        return next(error);
    }

    res.render('pathway_form', {
        pathway,
        tarots,
        sefirahs,
        title: 'Update Pathway'
    });
});

const pathway_delete_get = asyncHandler(async (req, res, _) => {
    const { id } = req.params;

    const [pathway, sequences] = await Promise.all([
        Pathway.findById(id).exec(),
        Sequence.find({ path: id }).sort({ name: 1 }).exec()
    ]);

    if(pathway === null) {
        res.redirect('/inventory/pathways');
    }

    res.render('pathway_delete', {
        pathway,
        sequences,
        title: 'Delete Pathway'
    })
});

// POST form request
const pathway_create_post = [
    // Validate and sanitize fields.
    body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be greater than or equals to 3 letters; and not be empty')
    .isLength({ max: 100 })
    .withMessage('Max name length is 100')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    )
    .escape(),
    body('image')
    .trim()
    .custom(IsImage)
    .withMessage('The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.')
    .escape(),
    body('card_of_blasphemy')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Card of Blasphemy must not be empty.')
    .escape(),
    body('sefirah')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Sefirah must not be empty.')
    .escape(),
    body('mythical_form')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Mythical Form must be greater than or equals to 3 letters; and not be empty')
    .isLength({ max: 100 })
    .withMessage('Max name length is 100')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of mythical form must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    ),
    body('above_the_sequence')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Above the Sequence must be greater than or equals to 3 letters; and not be empty')
    .isLength({ max: 100 })
    .withMessage('Max name length is 100')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of above the sequence must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    ),
     // Process request after validation and sanitization.
     asyncHandler(async (req, res, _) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Extract req.body
        const { name, sefirah, card_of_blasphemy, mythical_form, above_the_sequence} = req.body
        const imageBinary = req.file?.buffer;
        // Create a Pathway object with escaped and trimmed data.
        const pathway = new Pathway({
            name,
            sefirah,
            card_of_blasphemy,
            mythical_form,
            above_the_sequence
        });
        console.log(isFirstLetterUpperCaseAndAfterSpace(name))
        if(!errors.isEmpty()) {
            const [tarots, sefirahs] = await Promise.all([
                Tarot.find({}).sort({ name: 1 }).exec(),
                Sefirah.find({}).sort({ name: 1 }).exec()
            ]);

            return res.render('pathway_form', {
                pathway,
                tarots,
                sefirahs,
                title: 'Create Pathway',
                errors: errors.array(),
            })
        }

        const pathwayExist = await Pathway.findOne({ name }).collation({ locale: 'en', strength: 2 }).exec();

        if(pathwayExist) {
            res.redirect(pathwayExist.url);
        }

        if(ThereIsImage(imageBinary)) {
            // There is image
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            const dataURI = `data:${req.file.mimetype};base64,${b64}`
            const cloudinaryUpload = await Cloudinary.upload(dataURI, 'pathway_art')
            pathway.image = {
                url: cloudinaryUpload.url,
                cloudinary_id: cloudinaryUpload.public_id,
            };
       }

       await pathway.save();

       res.redirect(pathway.url);
     })
];

const pathway_update_post = [
    // Validate and sanitize fields.
    body('name')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Name must be greater than or equals to 3 letters; and not be empty')
    .isLength({ max: 100 })
    .withMessage('Max name length is 100')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    )
    .escape(),
    body('image')
    .trim()
    .custom(IsImage)
    .withMessage('The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.')
    .escape(),
    body('card_of_blasphemy')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Card of Blasphemy must not be empty.')
    .escape(),
    body('sefirah')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Sefirah must not be empty.')
    .escape(),
    body('mythical_form')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Mythical Form must be greater than or equals to 3 letters; and not be empty')
    .isLength({ max: 100 })
    .withMessage('Max name length is 100')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of mythical form must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    ),
    body('above_the_sequence')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Above the Sequence must be greater than or equals to 3 letters; and not be empty')
    .isLength({ max: 100 })
    .withMessage('Max name length is 100')
    .custom(isFirstLetterUpperCaseAndAfterSpace)
    .withMessage(
        'The first character of above the sequence must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
    ),
     // Process request after validation and sanitization.
     asyncHandler(async (req, res, _) => {
        const { id } = req.params;
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Extract req.body
        const { name, sefirah, card_of_blasphemy, mythical_form, above_the_sequence} = req.body
        const imageBinary = req.file?.buffer;
        const b64 = imageBinary && Buffer?.from(req.file?.buffer).toString("base64");
        const dataURI = `data:${req.file?.mimetype};base64,${b64}`
        // Create a Pathway object with escaped and trimmed data.
        const pathway = new Pathway({
            name,
            sefirah,
            card_of_blasphemy,
            mythical_form,
            above_the_sequence,
            _id: id
        });

        if(!errors.isEmpty()) {
            const [tarots, sefirahs] = await Promise.all([
                Tarot.find({}).sort({ name: 1 }).exec(),
                Sefirah.find({}).sort({ name: 1 }).exec()
            ]);

            return res.render('pathway_form', {
                pathway,
                tarots,
                sefirahs,
                title: 'Create Pathway',
                errors: errors.array(),
            })
        }

        const oldPathway = await Pathway.findById(id).exec();

        if(ThereIsImageAndNoUrl(imageBinary, oldPathway)) {
            const cloudinaryUpload = await Cloudinary.upload(dataURI, 'pathway_art')
            pathway.image = {
                url: cloudinaryUpload.url,
                cloudinary_id: cloudinaryUpload.public_id,
            };
       }

       if(ThereIsImageAndUrl(imageBinary, oldPathway)) {
            await Cloudinary.update(dataURI, oldPathway.image.cloudinary_id, true);
       }

       // Data from form is valid. Update the record.
       await Pathway.findByIdAndUpdate(id, pathway, {})

       res.redirect(pathway.url);
     })
];

const pathway_delete_post = asyncHandler(async (req, res, _) => {
    const { id } = req.params;

    const [pathway, sequences] = await Promise.all([
        Pathway.findById(id).exec(),
        Sequence.find({ path: id }).sort({ name: 1 }).exec()
    ]);

    if(sequences.length > 0) {
        res.render('pathway_form', {
            pathway,
            sequences,
            title: 'Delete Pathway'
        })
    }

    if(ThereIsImage(pathway.image.url)) {
        await Cloudinary.destroy(pathway.image.cloudinary_id, true);
    }

    await Pathway.findByIdAndDelete(id, pathway, {})

    res.redirect('/inventory/pathways');
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
