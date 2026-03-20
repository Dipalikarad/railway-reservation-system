const Train = require("../model/trainRoutes");
const bookTicket = require("../model/bookedTicketModel");
exports.bookTicket = async (req, res) => {
    try {
        const { fStation, tStation, trainRoute, jDate, trainType, nop, tAmount } = req.body;
        const userId = req.user.userId;

        const findRout = await Train.findOne({ trainRoute });
        if (!findRout) {
            res.send("route not found");
        }
        console.log(findRout)
        const distance = findRout.distance;
        console.log("distance ", distance)
        let amountPerKm = 0;

        if (trainType == "General") {
            amountPerKm = 0.5;
        }
        else {
            amountPerKm = 0.9;
        }
        const pnr =await generatePNR();
        const uts =await  generateUTS();
        const subTotal = distance * amountPerKm;
        const totalAmount = subTotal * nop;
        console.log(totalAmount)
        const newBookTicket = new bookTicket({
            fromStation: findRout.fromStation,
            toStation: findRout.toStation,
            distance: findRout.distance,
            jTime: findRout.jTime,
            nop: nop,
            trainRoute: trainRoute,
            totalAmount: totalAmount,
            jDate: jDate,
            pnr: pnr,
            utsNo:uts,
            userId:userId
        })
        await newBookTicket.save();

        res.status(201).json({ 
            message: 'Ticket booked successfully', 
            ticket: newBookTicket 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error booking ticket", error });
    }
}

exports.getAllTrains = async (req, res) => {
    try {
        const trains = await Train.find();
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ message: "Error fetching trains", error });
    }
};

exports.searchTrains = async (req, res) => {
    try {
        const { from, to, date } = req.query;
        let query = {};
        if (from) query.fromStation = { $regex: from, $options: 'i' };
        if (to) query.toStation = { $regex: to, $options: 'i' };
        // Date filtering might be tricky if jTime includes time. 
        // Assuming user searches by date, we might want to match the day.
        // For now, let's just filter by from/to if date is not strictly handled.
        
        const trains = await Train.find(query);
        res.status(200).json(trains);
    } catch (error) {
        res.status(500).json({ message: "Error searching trains", error });
    }
};

exports.getMyBookings = async (req, res) => {
    try {
        const userId = req.user.userId;
        const tickets = await bookTicket.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error });
    }
};

exports.cancelBooking = async (req, res) => {
    try {
        const ticketId = req.params.id;
        const ticket = await bookTicket.findByIdAndDelete(ticketId);
        if (!ticket) {
            return res.status(404).json({ message: "Ticket not found" });
        }
        res.status(200).json({ message: "Ticket cancelled successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error cancelling ticket", error });
    }
};


const generatePNR = async() => {
    const PNR = await  Math.floor(100000 + Math.random() * 900000);
    return 'PNR' + PNR;
}

const generateUTS = async () => {
    const UTS = await Math.floor(100000 + Math.random() * 900000);
    return 'UTS' + UTS;
}

