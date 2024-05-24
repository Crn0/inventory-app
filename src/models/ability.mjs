import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const abilitySchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 100, required: true },
    descriptions: [{ type: String, minLength: 3, required: true }],
});

// Virtual for model's url
abilitySchema.virtual('url').get(function () {
    return `/inventory/ability/${this._id}`;
});

export default mongoose.model('Ability', abilitySchema);
