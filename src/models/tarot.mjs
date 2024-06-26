import mongoose from 'mongoose';
import validateUrl from '../helpers/urlValidate.mjs';

const Schema = mongoose.Schema;

const tarotSchema = new Schema({
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
});
// Virtual for tarot's url
tarotSchema.virtual('url').get(function () {
    return `/inventory/tarot/${this._id}`;
});
export default mongoose.model('TarotCard', tarotSchema);
