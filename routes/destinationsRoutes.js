const express = require("express")
const router = express.Router()
const destinationsController = require("../controllers/destinationsController");
const isAuthenticated = require("../middleware/authenticate.js");

router.get("/", destinationsController.getAllDestinations);
router.get("/:id", destinationsController.getSingleDestination);
router.post("/", isAuthenticated, destinationsController.createDestination);
router.put("/:id", isAuthenticated, destinationsController.updateDestination);
router.delete("/:id", isAuthenticated, destinationsController.deleteDestination);


module.exports = router