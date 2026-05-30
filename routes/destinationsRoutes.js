const express = require("express")
const router = express.Router()
const destinationsController = require("../controllers/destinationsController");

router.use("/", require("./swagger"));

router.get("/", destinationsController.getAllDestinations);
router.get("/:id", destinationsController.getSingleDestination);
router.post("/", destinationsController.createDestination);
router.put("/:id", destinationsController.updateDestination);
router.delete("/:id", destinationsController.deleteDestination);


module.exports = router