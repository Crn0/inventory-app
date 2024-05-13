import mongoose from 'mongoose';
import validateUrl from '../helpers/urlValidate.mjs';

const Schema = mongoose.Schema;

const sequenceSchema = new Schema({
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
    formula: {
        main_ingredients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'MainIngredient',
                required: true,
            },
        ],
        supplementary_ingredients: [
            {
                type: Schema.Types.ObjectId,
                ref: 'SupplementaryIngredient',
                required: true,
            },
        ],
    },
    abilities: [
        { type: Schema.Types.ObjectId, ref: 'Ability', required: true },
    ],
    path: { type: Schema.Types.ObjectId, ref: 'Pathway', required: true },
});

export default mongoose.model('Sequence', sequenceSchema);
