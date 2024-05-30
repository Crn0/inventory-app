import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import isFirstLetterUpperCaseAndAfterSpace from '../helpers/isUppercase.mjs';
import Cloudinary from '../helpers/uploadAndUpdateImage.mjs';
import IsImage from '../helpers/isImage.mjs';
import GreaterThanOrEquals from '../helpers/greaterThanOrEquals.mjs';
import {
    ThereIsImage,
    ThereIsImageAndUrl,
    ThereIsImageAndNoUrl,
} from '../helpers/conditionals.mjs';
import Sefirah from '../models/sefirah.mjs';
import Pathway from '../models/pathway.mjs';

// Detail page
const sefirah_list = asyncHandler(async (req, res, _) => {
    // GET list of sefirahs
    const sefirahs = await Sefirah.find({}).sort({ name: 1 }).exec();

    res.render('sefirah_list', {
        sefirahs,
        title: 'Sefirahs',
    });
});

const sefirah_detail = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    // GET sefirah and pathways detail(in parallel)
    const [sefirah, pathways] = await Promise.all([
        Sefirah.findById(id).exec(),
        Pathway.find({ sefirah: { _id: id } })
            .sort({ name: 1 })
            .exec(),
    ]);

    if (sefirah === null) {
        // No results.
        const error = new Error('Sefirah not found');
        error.status = 404;
        return next(error);
    }

    res.render('sefirah_detail', {
        sefirah,
        pathways,
        title: 'Sefirah Database',
    });
});

// GET form request
const sefirah_create_get = asyncHandler(async (req, res, _) => {
    res.render('sefirah_form', {
        title: 'Create Sefirah',
    });
});

const sefirah_update_get = asyncHandler(async (req, res, next) => {
    const { id } = req.params;

    const sefirah = await Sefirah.findById(id).exec();

    if (sefirah === null) {
        const error = new Error('SefirahIngredient not found');
        error.status = 404;

        return next(error);
    }

    res.render('sefirah_form', {
        sefirah,
        title: 'Update Sefirah',
    });
});

const sefirah_delete_get = asyncHandler(async (req, res, _) => {
    const { id } = req.params;

    const [sefirah, pathways] = await Promise.all([
        Sefirah.findById(id).exec(),
        Pathway.find({ sefirah: id }).sort({ name: 1 }).exec(),
    ]);
    console.log(pathways);
    if (sefirah === null) {
        res.redirect('/inventory/sefirahs');
    }

    res.render('sefirah_delete', {
        sefirah,
        pathways,
        title: 'Delete Sefirah',
    });
});

// POST form request
const sefirah_create_post = [
    // Validate and sanitize fields.
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
            'The first character of name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
        )
        .escape(),
    body('image')
        .trim()
        .custom(IsImage)
        .withMessage(
            'The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.'
        )
        .escape(),
    body('possessor')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Possessor name must be greater than or equals to 3 letters; and not be empty'
        )
        .isLength({ max: 100 })
        .withMessage('Max possessor name length is 100')
        .custom(isFirstLetterUpperCaseAndAfterSpace)
        .withMessage(
            "The first character of possessor's name must be capitalized followed by lowercase letters, as well as the first character after a space or special character"
        )
        .escape(),
    body('description')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Description must not be empty or greater than or equal to 3 words'
        )
        .escape(),
    asyncHandler(async (req, res, _) => {
        const { id } = req.params;
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Extract req.body
        const { name, possessor, description } = req.body;
        const imageBinary = req.file?.buffer;
        const b64 =
            imageBinary && Buffer?.from(req.file?.buffer).toString('base64');
        const dataURI = `data:${req.file?.mimetype};base64,${b64}`;
        // Create a Sefirah object with escaped and trimmed data.
        const sefirah = new Sefirah({
            name,
            possessor,
            description,
        });

        if (!errors.isEmpty()) {
            res.render('sefirah_form', {
                sefirah,
                title: 'Create Sefirah',
                errors: errors.array(),
            });
        }

        if (ThereIsImage(imageBinary)) {
            // There is image
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const cloudinaryUpload = await Cloudinary.upload(
                dataURI,
                'sefirah_art'
            );
            sefirah.image = {
                url: cloudinaryUpload.url,
                cloudinary_id: cloudinaryUpload.public_id,
            };
        }

        await sefirah.save();

        res.redirect(sefirah.url);
    }),
];

const sefirah_update_post = [
    // Validate and sanitize fields.
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
            'The first character of name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
        )
        .escape(),
    body('image')
        .trim()
        .custom(IsImage)
        .withMessage(
            'The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.'
        )
        .escape(),
    body('possessor')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Possessor name must be greater than or equals to 3 letters; and not be empty'
        )
        .isLength({ max: 100 })
        .withMessage('Max possessor name length is 100')
        .custom(isFirstLetterUpperCaseAndAfterSpace)
        .withMessage(
            "The first character of possessor's name must be capitalized followed by lowercase letters, as well as the first character after a space or special character"
        )
        .escape(),
    body('description')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Description must not be empty or greater than or equal to 3 words'
        )
        .escape(),
    asyncHandler(async (req, res, _) => {
        const { id } = req.params;
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        // Extract req.body
        const { name, possessor, description } = req.body;
        const imageBinary = req.file?.buffer;
        const b64 =
            imageBinary && Buffer?.from(req.file?.buffer).toString('base64');
        const dataURI = `data:${req.file?.mimetype};base64,${b64}`;
        // Create a Sefirah object with escaped and trimmed data.
        const sefirah = new Sefirah({
            name,
            possessor,
            description,
            _id: id,
        });

        if (!errors.isEmpty()) {
            res.render('sefirah_form', {
                sefirah,
                title: 'Create Sefirah',
                errors: errors.array(),
            });
        }

        const oldSefirah = await Sefirah.findById(id).exec();

        if (ThereIsImageAndNoUrl(imageBinary, oldSefirah)) {
            const cloudinaryUpload = await Cloudinary.upload(
                dataURI,
                'sefirah_art'
            );
            sefirah.image = {
                url: cloudinaryUpload.url,
                cloudinary_id: cloudinaryUpload.public_id,
            };
        }

        if (ThereIsImageAndUrl(imageBinary, oldSefirah)) {
            await Cloudinary.update(dataURI, oldSefirah.image.cloudinary_id);
        }

        await Sefirah.findByIdAndUpdate(id, sefirah, {});

        res.redirect(sefirah.url);
    }),
];

const sefirah_delete_post = asyncHandler(async (req, res, _) => {
    const { id } = req.params;

    const [sefirah, pathways] = await Promise.all([
        Sefirah.findById(id).exec(),
        Pathway.find({ sefirah: id }, 'name image').sort({ name: 1 }).exec(),
    ]);

    if (pathways.length > 0) {
        res.render('sefirah_form', {
            sefirah,
            pathways,
            title: 'Delete Sefirah',
        });
    }

    if (ThereIsImage(sefirah.image.url)) {
        await Cloudinary.destroy(sefirah.image.cloudinary_id, true);
    }

    await Sefirah.findByIdAndDelete(id, sefirah, {});

    res.redirect('/inventory/sefirahs');
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
