const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../data/database");

//Function to get all bookings
const getAllBookings = async (req, res) => {
  //#swagger.tags=["Bookings"]
  try {
    const result = mongodb.getDatabase().collection("bookings").find();
    const bookings = await result.toArray();
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message:
          error.message || "An error occurred while retrieving the booking",
      });
  }
}

//Function to retrieve single booking
const getSingleBookings = async (req, res) => {
  //#swagger.tags=["Bookings"]
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id)) {
      res.status(400).json({ message: "Invalid booking ID" });
    } 
     const bookingId = new ObjectId(req.params.id);
     const result = await mongodb
       .getDatabase()
       .collection("bookings")
       .findOne({ _id: bookingId },);
    if (!result) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message:
        error.message || "An error occurred while retrieving the booking",
    });
  }
};

//create booking function
const createBooking = async (req, res) => {
  //#swagger.tags=["Bookings"]
  try {
    if (
      !req.body.destinationId ||
      !req.body.travelDate ||
      !req.body.numberOfPeople
    ) {
      return res.status(400).json({ message: "All fields required" });
    }
    const createABooking = {
      destinationId: req.body.destinationId,
      travelDate: req.body.travelDate,
      numberOfPeople: req.body.numberOfPeople,
    };
    const result = await mongodb
      .getDatabase()
      .collection("bookings")
      .insertOne(createABooking);
    if (!result.acknowledged) {
      return res.status(500).json({ message: "Booking could not be created!" });
    }
    res.status(201).send("Booking created successfully");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error.message || "Some error occurred while creating booking",
      });
  }
}
  
//Function to update booking
const updateBooking = async (req, res) => {
  //#swagger.tags=["Bookings"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }
    const bookingId = new ObjectId(req.params.id);
    const booking = {
      destinationId: req.body.destinationId,
      travelDate: req.body.travelDate,
      numberOfPeople: req.body.numberOfPeople,
    };
    const response = await mongodb
      .getDatabase()
      .collection("bookings")
      .replaceOne({ _id: bookingId }, booking);

    if (response.matchedCount === 0) {
      res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Booking updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error.message || "Server error");
  }
}
 
//Function to delete booking
const deleteBooking = async (req, res) => {
  //#swagger.tags=["Bookings"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }
    const bookingId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .collection("bookings")
      .deleteOne({ _id: bookingId });
    if (response.deletedCount === 0) {
       return res.status(404).json({ message: "Booking not found" });
    }
     res.status(200).send("Booking deleted");
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        message: error.message || "Something went wrong during deletion",
      });
  }
};



module.exports = {
  getAllBookings,
  getSingleBookings,
  createBooking,
  updateBooking,
  deleteBooking,
};