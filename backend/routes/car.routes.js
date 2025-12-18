import express from "express";
import Car from "../models/Car.js";

const router = express.Router();


router.get("/", async (req, res) => {
  const cars = await Car.find();
  res.json(cars);
});


router.get("/:id", async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: "Car not found" });
    }

    res.json(car);
  } catch (err) {
    res.status(500).json({ message: "Invalid car ID" });
  }
});

export default router;
