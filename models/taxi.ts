import mongoose = require("mongoose");

const TaxiSchema = new mongoose.Schema({
    name: String
});

export = mongoose.model("Taxi", TaxiSchema);
