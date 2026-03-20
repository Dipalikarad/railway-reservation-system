
const express = require('express');
const router = express.Router();
const User = require('../../model/userModel');
const TrainRoutModel = require("../../model/trainRoutes");
const bookedTicketsModel = require("../../model/bookedTicketModel");

router.get('/dashboard', async (req, res) => {

  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const result = await bookedTicketsModel.aggregate([
    {
      $facet: {
        overallStats: [
          {
            $group: {
              _id: null,
              totalTickets: { $sum: 1 },
              totalRevenue: { $sum: "$totalAmount" }
            }
          }
        ],
        todayStats: [
          {
            $match: {
              jDate: {
                $gte: todayStart,
                $lte: todayEnd
              }
            }
          },
          {
            $group: {
              _id: null,
              todayBookedTickets: { $sum: 1 },
              todayRevenue: { $sum: "$totalAmount" }
            }
          }
        ]
      }
    },
    {
      $project: {
        totalTickets: { $ifNull: [{ $arrayElemAt: ["$overallStats.totalTickets", 0] }, 0] },
        totalRevenue: { $ifNull: [{ $arrayElemAt: ["$overallStats.totalRevenue", 0] }, 0] },
        todayBookedTickets: { $ifNull: [{ $arrayElemAt: ["$todayStats.todayBookedTickets", 0] }, 0] },
        todayRevenue: { $ifNull: [{ $arrayElemAt: ["$todayStats.todayRevenue", 0] }, 0] }
      }
    }
  ]);

  console.log(result[0]);
  res.render('dashboard', { result: result });
});

router.get("/bookTicket", async (req, res) => {
  const trainRoute = await TrainRoutModel.find();
  const ticketId = req.query.ticketId;
  let findTicket = null;
  findTicket = await bookedTicketsModel.findById(ticketId);
  res.render("bookTicket", {
    trainRoute: trainRoute,
    showTicket: req.query.showTicket === "true",
    ticketId: req.query.ticketId || null,
    ticket: findTicket
  })
})

router.get("/bookTicketList", async (req, res) => {
  const pnr = req.query.pnr;
  const userId = req.user.userId;
  const ticket = await bookedTicketsModel.find({userId}).sort({ createdAt: -1 });
  res.render("bookTicketList", { ticket });
})


router.get("/bookedTicket/:id", async (req, res) => {
  const ticketId = req.params.id;
  console.log(ticketId)
  let findTicket = null;
  findTicket = await bookedTicketsModel.findById(ticketId);
  res.render("ticketPage", { ticket: findTicket })
})

router.get("/profile", async (req, res) =>{
  const user = req.user;
  console.log(user);
  const findUser = await User.findById(user.userId);
  console.log(findUser);
  res.render("profile",{findUser});
})
module.exports = router;