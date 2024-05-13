import mongoose from 'mongoose';
import validateUrl from '../helpers/urlValidate.mjs';

const Schema = mongoose.Schema;

const mainIngredient = new Schema({
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

export default mongoose.model('MainIngredient', mainIngredient);
