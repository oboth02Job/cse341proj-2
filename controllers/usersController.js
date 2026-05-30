const ObjectId = require("mongodb").ObjectId;
const mongodb = require("../data/database");

const getAll = async (req, res) => {
    const users = mongodb.getDatabase().collection("users").find()
    const response = await users.toArray()
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(response);
}

const getSingle = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const user = await mongodb
    .getDatabase()
    .collection("users")
    .findOne({ _id: userId });

  res.setHeader("Content-Type", "application/json");
  res.status(200).json(user);
};

const createUser = async (req, res) => {
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
    res.status(201).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating user");
  }
};

const updateUser = async (req, res) => {
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
  if (response.modifiedCount > 0) {
    res.status(201).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating user");
  }
};

const deleteUser = async (req, res) => {
  //#swagger.tags=["Users"]
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .collection("users")
    .deleteOne({ _id: userId });
  if (response.deletedCount) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting user");
  }
};

module.exports = { getAll, getSingle, createUser, updateUser, deleteUser };
