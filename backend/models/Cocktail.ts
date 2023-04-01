import mongoose, { Types } from "mongoose";
import User from "./User";

const Schema = mongoose.Schema;

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: String, required: true },
});

const CocktailSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: "User does not exist",
    },
  },
  ingredients: {
    type: [IngredientSchema],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Cocktail = mongoose.model("Cocktail", CocktailSchema);
export default Cocktail;
