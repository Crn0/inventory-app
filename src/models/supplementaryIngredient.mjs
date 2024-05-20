import mongoose from 'mongoose';
import validateUrl from '../helpers/urlValidate.mjs';

const Schema = mongoose.Schema;

const supplementaryIngredient = new Schema({
    name: { type: String, minLength: 3, maxLength: 100, required: true },
    image: {
        url: {
            type: String,
            validate: {
                validator: validateUrl,
            },
            message: (props) => `${props.value} is not a valid URL`,
        },
        cloudinary_id: { type: String },
    },
    description: { type: String, minLength: 3, required: true },
    stocks: { type: Number, required: true },
});

// Virtual for model's url
supplementaryIngredient.virtual('url').get(function () {
    return `/inventory/supplementary_ingredient/${this._id}`;
});

export default mongoose.model(
    'SupplementaryIngredient',
    supplementaryIngredient
);
