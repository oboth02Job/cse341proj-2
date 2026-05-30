const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../data/database");

const getAllDestinations = async (req, res) => {
  const result = mongodb.getDatabase().collection("destinations").find();
  const destinations = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(destinations);
};

const getSingleDestination = async (req, res) => {
  const destinationId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .collection("destinations")
    .findOne({ _id: destinationId });
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const createDestination = async (req, res) => {
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
  res.setHeader("Content-Type", "application/json");
  if (result.acknowledged) {
    res.status(201).send("Destination creating successfully");
  } else {
    res
      .status(500)
      .json(result.error || "Some error occurred while creating destination");
  }
};

const updateDestination = async (req, res) => {
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
  if (response.modifiedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || "Server error");
  }
};

const deleteDestination = async (req, res) => {
  const destinationId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .collection("destinations")
    .deleteOne({ _id: destinationId });
  if (response.deletedCount) {
    res.status(200).send("Destination deleted");
  } else {
    res
      .status(500)
      .json(response.error || "Something went wrong during deletion");
  }
};


module.exports = {
  getAllDestinations,
  getSingleDestination,
  createDestination,
  updateDestination,
  deleteDestination,
};
