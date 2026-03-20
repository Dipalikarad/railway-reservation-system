const mongoose = require("mongoose");

const bookedTicketSchema = new mongoose.Schema({
    fromStation: String,
    toStation: String,
    distance: Number,
    jTime: Date,
    jDate: Date,
    nop: Number,
    trainRoute: Number,
    totalAmount: Number,
    pnr: String,
    utsNo: String,

    userId:{
        type: mongoose.Schema.Types.ObjectId,
         ref: "User"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("book-ticket", bookedTicketSchema)