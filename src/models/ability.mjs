import mongoose from "mongoose";

const Schema = mongoose.Schema;

const abilitySchema = new Schema({
    name: { type: String, minLength: 3, maxLength: 100, required: true },
    description: { type: String, minLength: 3, required: true }
});

export default mongoose.model('Ability', abilitySchema);