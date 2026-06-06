const express = require("express")
const router = express.Router()
const bookingsController = require("../controllers/bookingsController");
const isAuthenticated = require("../middleware/authenticate.js")

router.get("/", bookingsController.getAllBookings);
router.get("/:id", bookingsController.getSingleBookings);
router.post("/", isAuthenticated, bookingsController.createBooking);
router.put("/:id", isAuthenticated, bookingsController.updateBooking);
router.delete("/:id", isAuthenticated, bookingsController.deleteBooking);



module.exports = router;