import mongoose from "mongoose";

const characterSchema = new mongoose.Schema({
  character_img: String,
  name: String,
  hair: String,
  gender: String,
  nation: String,
  fighting: String,
  bending: { type: Boolean, default: false },
  age: String,
  position: [String],
  hint: String,
});

const Character = mongoose.model("Character", characterSchema);
export default Character;
