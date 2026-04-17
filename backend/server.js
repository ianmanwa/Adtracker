const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const dotenv = require('dotenv')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// Connect MongoDB
mongoose.connect("mongodb+srv://ianmanwa63:Adtracker101*@adtracker.ncuwcdb.mongodb.net/?appName=Adtracker")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err))

// Model
const Ad = require("./models/Ad");

// Routes

// Get all ads
app.get("/ads", async (req, res) => {
    const ads = await Ad.find();
    res.json(ads);
});

// Add ad
app.post("/ads", async (req, res) => {
    const ad = new Ad(req.body);
    await ad.save();
    res.json(ad);
});

// Update ad
app.put("/ads/:id", async (req, res) => {
    const updated = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

// Seed test ad if empty
app.get("/seed", async (req, res) => {
    const count = await Ad.countDocuments();
    if (count === 0) {
        await Ad.create({
            link: "https://www.instagram.com/reel/DVN5DECAifj/?igsh=MXdxMHV5ZGozaWZoZw==",
            product: "Test Product",
            sales: 0,
            active: true
        });
    }
    res.send("Seeded");
});

// Start server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));

