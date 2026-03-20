const router = require("express").Router();
const adminMiddleware = require("../middleware/admin");
const { 
    addTrain, 
    deleteTrain, 
    getAllBookings, 
    getAdminStats 
} = require("../controllers/adminCtrl");

// Protect all admin routes
router.use(adminMiddleware);

router.post("/trains", addTrain);
router.delete("/trains/:id", deleteTrain);
router.get("/bookings", getAllBookings);
router.get("/stats", getAdminStats);

module.exports = router;
