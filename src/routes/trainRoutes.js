const router = require("express").Router();

const{
    bookTicket,
    getAllTrains,
    searchTrains,
    getMyBookings,
    cancelBooking
} = require("../controllers/trainCtrl")


router.post("/bookTicket", bookTicket);
router.get("/list", getAllTrains);
router.get("/search", searchTrains);
router.get("/bookings", getMyBookings);
router.delete("/bookings/:id", cancelBooking);

module.exports = router;
