import express from "express";
import Character from "../models/Character.js";
const router = express.Router();

router.get("/characters", async (req, res) => {
  try {
    const characters = await Character.find();
    res.json(characters);
  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

router.post("/characters", async (req, res) => {
  try {
    const newCharacter = await Character.insertMany(req.body);
    res.status(201).json(newCharacter);
    console.log("success");
  } catch (err) {
    res.status(400).json({ error: "Failed to create new character" });
    console.log(err);
  }
});

export default router;
