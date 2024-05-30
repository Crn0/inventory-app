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
        Pathway.findOne({ card_of_blasphemy: { _id: id } }).exec(),
    ]);
    console.log(pathway);
    if (tarot === null) {
        // No results.
        const error = new Error('Sefirah not found');
        error.status = 404;
        return next(error);
    }

    res.render('tarot_detail', {
        tarot,
        pathway,
        title: 'Card of Blasphemy Database',
    });
});

// GET form request
const tarot_create_get = asyncHandler(async (req, res, _) => {
    res.render('tarot_form', {
        title: 'Create Card of Blasphemy',
    });
});

const tarot_update_get = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const tarot = await Tarot.findById(id).exec();

    if (tarot === null) {
        const error = new Error('Card of Blasphemy not found');
        error.status = 404;
        return next(error);
    }

    res.render('tarot_form', {
        tarot,
        title: 'Update Card of Blasphemy',
    });
});

const tarot_delete_get = asyncHandler(async (req, res, _) => {
    const { id } = req.params;
    // GET details of tarot and pathways.
    const [tarot, pathways] = await Promise.all([
        Tarot.findById(id).exec(),
        Pathway.find({ card_of_blasphemy: id }, 'image name')
            .sort({ name: 1 })
            .exec(),
    ]);

    if (tarot === null) {
        res.redirect('/inventory/tarots');
    }

    res.render('tarot_delete', {
        tarot,
        pathways,
        title: 'Delete Card of Blasphemy',
    });
});

// POST form request
const tarot_create_post = [
    // Validate and sanitize field.
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Name must not be empty; and greater than or equals to 3 letters'
        )
        .isLength({ max: 100 })
        .withMessage('Max name length is 100')
        .custom(isFirstLetterUpperCaseAndAfterSpace)
        .withMessage(
            'The first character of card of blasphemy name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
        )
        .escape(),
    body('image')
        .trim()
        .custom(IsImage)
        .withMessage(
            'The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.'
        )
        .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, _) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const { name } = req.body;
        const imageBinary = req.file?.buffer;
        // Create tarot object with trimmed data.
        const tarot = new Tarot({
            name,
        });

        if (!errors.isEmpty()) {
            res.render('tarot_form', {
                tarot,
                errors: errors.array(),
                title: 'Create Card of Blasphemy',
            });
        }
        // Data form is valid
        // Check if tarots with the same name exists
        const tarotExist = await Tarot.findOne({ name })
            .collation({ locale: 'en', strength: 2 })
            .exec();

        if (tarotExist) {
            res.redirect(tarotExist.url);
        }

        if (ThereIsImage(imageBinary)) {
            // There is image
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const cloudinaryUpload = await Cloudinary.upload(
                dataURI,
                'tarot_art'
            );
            tarot.image = {
                url: cloudinaryUpload.url,
                cloudinary_id: cloudinaryUpload.public_id,
            };
        }

        await tarot.save();

        res.redirect(tarot.url);
    }),
];

const tarot_update_post = [
    // Validate and sanitize field.
    body('name')
        .trim()
        .isLength({ min: 3 })
        .withMessage(
            'Name must not be empty; and greater than or equals to 3 letters'
        )
        .isLength({ max: 100 })
        .withMessage('Max name length is 100')
        .custom(isFirstLetterUpperCaseAndAfterSpace)
        .withMessage(
            'The first character of card of blasphemy name must be capitalized followed by lowercase letters, as well as the first character after a space or special character'
        )
        .escape(),
    body('image')
        .trim()
        .custom(IsImage)
        .withMessage(
            'The file extension is not supported. Please upload a file with one of the following extensions: .jpg, .jpeg, .png.'
        )
        .escape(),
    // Process request after validation and sanitization.
    asyncHandler(async (req, res, _) => {
        const { id } = req.params;
        // Extract the validation errors from a request.
        const errors = validationResult(req);
        const { name } = req.body;
        const imageBinary = req.file?.buffer;
        // GET tarot details
        const oldTarot = await Tarot.findById(id).exec();
        // Create tarot object with trimmed data
        const tarot = new Tarot({
            name,
            _id: id,
        });

        if (!errors.isEmpty()) {
            return res.render('tarot_form', {
                tarot,
                errors: errors.array(),
                title: 'Update Card of Blasphemy',
            });
        }
        // Data form is valid

        if (ThereIsImageAndNoUrl(imageBinary, oldTarot)) {
            // There is image file and no image url
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            const cloudinaryUpload = await Cloudinary.upload(
                dataURI,
                'tarot_art'
            );
            tarot.image = {
                url: cloudinaryUpload.url,
                cloudinary_id: cloudinaryUpload.public_id,
            };
        }

        if (ThereIsImageAndUrl(imageBinary, oldTarot)) {
            // There is image file and image url
            const b64 = Buffer.from(req.file.buffer).toString('base64');
            const dataURI = `data:${req.file.mimetype};base64,${b64}`;
            await Cloudinary.update(
                dataURI,
                oldTarot.image.cloudinary_id,
                true
            );
        }

        // Data from form is valid. Update the record.
        await Tarot.findByIdAndUpdate(id, tarot, {});

        res.redirect(tarot.url);
    }),
];

const tarot_delete_post = asyncHandler(async (req, res, _) => {
    const { id } = req.params;
    // GET details of tarot and pathway(in parallel)
    const [tarot, pathways] = await Promise.all([
        Tarot.findById(id).exec(),
        Pathway.find({ card_of_blasphemy: id }, 'name')
            .sort({ name: 1 })
            .exec(),
    ]);

    if (pathways.length > 0) {
        // pathways has tarot ref. Render in same way as for GET route.
        res.render('tarot_delete', {
            tarot,
            pathways,
            title: 'Delete Card of Blasphemy',
        });
    }

    if (ThereIsImage(tarot.image.cloudinary_id)) {
        // Delete image in cloudinary.
        await Cloudinary.destroy(tarot.image.cloudinary_id, true);
    }

    // Delete object and redirect to the list of tarot.
    await Tarot.findByIdAndDelete(id, tarot, {});

    res.redirect('/inventory/tarots');
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
