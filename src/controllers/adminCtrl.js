const Train = require("../model/trainRoutes");
const BookedTicket = require("../model/bookedTicketModel");
const User = require("../model/userModel");

exports.addTrain = async (req, res) => {
    try {
        const { fromStation, toStation, distance, jTime, trainRoute } = req.body;
        
        const newTrain = new Train({
            fromStation,
            toStation,
            distance,
            jTime,
            trainRoute
        });

        await newTrain.save();
        res.status(201).json({ message: "Train added successfully", train: newTrain });
    } catch (error) {
        res.status(500).json({ message: "Error adding train", error });
    }
};

exports.deleteTrain = async (req, res) => {
    try {
        const { id } = req.params;
        await Train.findByIdAndDelete(id);
        res.status(200).json({ message: "Train deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting train", error });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await BookedTicket.find().sort({ createdAt: -1 });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
};

exports.getAdminStats = async (req, res) => {
    try {
        const totalTrains = await Train.countDocuments();
        const totalBookings = await BookedTicket.countDocuments();
        const totalUsers = await User.countDocuments();
        
        // Calculate total revenue
        const revenueResult = await BookedTicket.aggregate([
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);
        const totalRevenue = revenueResult.length > 0 ? revenueResult[0].total : 0;

        res.status(200).json({
            totalTrains,
            totalBookings,
            totalUsers,
            totalRevenue
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching stats", error });
    }
};
