const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../data/database");

const getAll = async (req, res) => {
  try {
     const users = mongodb.getDatabase().collection("users").find()
    const response = await users.toArray()
     res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: error.message || "Something went wrong"})
  }
}

const getSingle = async (req, res) => {
  try {
if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Invalid user ID" });
    }
    const userId = new ObjectId(req.params.id);
    const user = await mongodb
    .getDatabase()
    .collection("users")
      .findOne({ _id: userId });
    
    if (!user) {
    return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: error.message || "Something went wrong" });
  }
  
};

const createUser = async (req, res) => {
  try {
 if (
    !req.body.name,
    !req.body.email,
    !req.body.password,
    !req.body.phone,
    !req.body.country
 ) {
   res.status(400).json({message: "All fields are required!"})
    }
    const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    country: req.body.country,
    };
     const response = await mongodb
    .getDatabase()
    .collection("users")
      .insertOne(user);
    
     if (response.acknowledged) {
    res.status(201).send("User created successfully");
 }
  } catch (error) {
    res.status(500)
      .json(response.error || "Some error occurred while updating user");
  }
};

const updateUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userId = new ObjectId(req.params.id);
    const user = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      country: req.body.country,
    };
    const response = await mongodb
      .getDatabase()
      .collection("users")
      .replaceOne({ _id: userId }, user);
    
    if (response.modifiedCount === 0) {
      res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error)
    res.status(500).json({message: error.message || "Something went wrong"})
  }
} 
  

const deleteUser = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const userId = new ObjectId(req.params.id);
    const response = await mongodb
      .getDatabase()
      .collection("users")
      .deleteOne({ _id: userId });
    
    if (response.deletedCount === 0) {
      res.status(404).json({ message: "User not found" });
    } res.status(200).json({ message: "User deleted successfully" });
  
  } catch (error) {
    console.error(error) 
 res.status(500).json(response.error || "Some error occurred while deleting user");
  }
  } 

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
