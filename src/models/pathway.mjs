import mongoose from "mongoose";
import validateUrl from "../helpers/urlValidate.mjs";

const Schema = mongoose.Schema;

const pathWaySchema = new Schema({
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
  card_of_blasphemy: {
    type: Schema.Types.ObjectId,
    ref: "TarotCard",
    required: true,
  },
  mythical_form: { type: String, minLength: 3, required: true },
  sefirah: { type: Schema.Types.ObjectId, ref: "Sefirah", required: true },
  above_the_sequence: {
    type: String,
    minLength: 3,
    maxLength: 100,
    required: true,
  },
});

export default mongoose.model("Pathway", pathWaySchema);
