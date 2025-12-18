import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "./models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/car_rental_db";

const seedDealer = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const dealerEmail = "dealer@carrental.com";

    const existingDealer = await User.findOne({ email: dealerEmail });

    if (existingDealer) {
      console.log("⚠️ Dealer already exists");
      process.exit();
    }

    const hashedPassword = await bcrypt.hash("dealer123", 10);

    await User.create({
      name: "Dealer",
      email: dealerEmail,
      password: hashedPassword,
      role: "dealer",
    });

    console.log(" Dealer created successfully");
    console.log(" Email: dealer@carrental.com");
    console.log(" Password: dealer123");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDealer();
