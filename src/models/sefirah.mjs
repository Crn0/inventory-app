import mongoose from 'mongoose';
import validateUrl from '../helpers/urlValidate.mjs';

const Schema = mongoose.Schema;

const sefirahSchema = new Schema({
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
        possessor: { type: String, minLength: 3, maxLength: 100},
        description: { type: String, minLength: 3, required: true },
    },
});

export default mongoose.model('Sefirah', sefirahSchema);
