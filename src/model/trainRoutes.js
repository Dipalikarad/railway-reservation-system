const mongoose = require("mongoose");

const trainRouteSchema = new mongoose.Schema({
    fromStation: String,
    toStation:String,
    distance: Number,
    jTime:Date,
    trainRoute:Number
}, {
    timestamps: true
});

module.exports = mongoose.model("train-routes", trainRouteSchema)