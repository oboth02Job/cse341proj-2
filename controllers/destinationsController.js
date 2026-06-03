const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../data/database");

//Function to get all destinations
const getAllDestinations = async (req, res) => {
  //#swagger.tags=["destinations"]
  try {
    const result = mongodb.getDatabase().collection("destinations").find();
    const destinations = await result.toArray();
    res.status(200).json(destinations);
  } catch (error) {
    res.status(500).json({ message: "Some error occurred" });
  }
};

//Function to retrieve single destination
const getSingleDestination = async (req, res) => {
  //#swagger.tags=["destinations"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid destination ID" });
    }
    const destinationId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("destinations")
      .findOne({ _id: destinationId });
    if (!result) {
      return res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
};

//Function to create destination
const createDestination = async (req, res) => {
  //#swagger.tags=["destinations"]
  try {
    if (
      (!req.body.name,
      !req.body.location,
      !req.body.description,
      !req.body.price,
      !req.body.rating,
      !req.body.URl,
      !req.body.category,
      !req.body.availableSlots)
    ) {
      return res.status(404).json({ message: "All fields required" });
    }
    const createADestination = {
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating,
      imageUrl: req.body.URl,
      category: req.body.category,
      availableSlots: req.body.availableSlots,
    };
    const result = await mongodb
      .getDatabase()
      .collection("destinations")
      .insertOne(createADestination);
    if (result.acknowledged) {
      res.status(201).send("Destination creating successfully");
    }
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          result.error || "Some error occurred while creating destination",
      });
  }
};

//Function to update destination
const updateDestination = async (req, res) => {
  //#swagger.tags=["destinations"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid destination ID" });
    }
    const destinationId = new ObjectId(req.params.id);
    const destination = {
      name: req.body.name,
      location: req.body.location,
      description: req.body.description,
      price: req.body.price,
      rating: req.body.rating,
      imageUrl: req.body.URl,
      category: req.body.category,
      availableSlots: req.body.availableSlots,
    };
    const response = await mongodb
      .getDatabase()
      .collection("destinations")
      .replaceOne({ _id: destinationId }, destination);

    if (response.matchedCount === 0) {
      res.status(404).json({ message: "Destination not found" });
    }
    res.status(200).json({ message: "Destination updated successfully" });
  } catch (error) {
    res.status(500).json(response.error || "Server error");
  }
};

//Function to delete destination
const deleteDestination = async (req, res) => {
  //#swagger.tags=["destinations"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid destination ID" });
    }
    const destinationId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("destinations")
      .deleteOne({ _id: destinationId });
    if (response.deletedCount) {
      res.status(200).send("Destination deleted");
    }
  } catch (error) {
    res
      .status(500)
      .json(response.error || "Something went wrong during deletion");
  }
}

  module.exports = {
    getAllDestinations,
    getSingleDestination,
    createDestination,
    updateDestination,
    deleteDestination,
  };
