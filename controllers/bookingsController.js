const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../data/database");

const getAllBookings = async (req, res) => {
  const result = mongodb.getDatabase().collection("bookings").find();
  const bookings = await result.toArray();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(bookings);
};

const getSingleBookings = async (req, res) => {
    const bookingId = new ObjectId(req.params.id)
  const result = await mongodb.getDatabase().collection("bookings").findOne({ _id: bookingId});
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(result);
};

const createBooking = async (req, res) => {
  const createABooking = {
    destinationId: req.body.destinationId,
    travelDate: req.body.travelDate,
    numberOfPeople: req.body.numberOfPeople,
  };
    const result = await mongodb.getDatabase().collection("bookings").insertOne(createABooking)
    res.setHeader("Content-Type", "application/json")
  if (result.acknowledged) {
    res.status(201).send("Booking creating successfully")
  } else {
    res.status(500).json(result.error || "Some error occurred while creating booking" )
  }
};

const updateBooking = async (req, res) => {
   const bookingId = new ObjectId(req.params.id);
  const booking = {
    destinationId: req.body.destinationId,
    travelDate: req.body.travelDate,
    numberOfPeople: req.body.numberOfPeople,
  };
  const response = await mongodb.getDatabase().collection("bookings").replaceOne({ _id: bookingId }, booking)
  if (response.modifiedCount > 0) {
    res.status(200).send();
  } else {
    res.status(500).json(response.error || "Server error");
  }

};

const deleteBooking = async (req, res) => {
  const bookingId = new ObjectId(req.params.id)
  const response = await mongodb
    .getDatabase()
    .collection("bookings")
    .deleteOne({ _id: bookingId });
  if (response.deletedCount) {
    res.status(200).send("Booking deleted")
  } else {
    res.status(500).json(response.error || "Something went wrong during deletion")
  }

};



module.exports = {
  getAllBookings,
  getSingleBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};