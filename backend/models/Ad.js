const mongoose = require("mongoose");

const adSchema = new mongoose.Schema({
    link: String,
    product: String,
    sales: { type: Number, default: 0 },
    active: { type: Boolean, default: true }
});

module.exports = mongoose.model("Ad", adSchema);
