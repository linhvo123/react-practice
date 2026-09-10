const User = require("../models/user.models");

const createUser = async (req, res) => {
  try {
    const { id, email, first_name, last_name, avatar } = req.body;

    const existingUser = await User.findOne(
      { $or: [{ id }, { email }] }
    );

    if (existingUser) {
      return res.status(400).json({ message: "User with this ID or email already exists" });
    }

    const user = new User({
      id,
      email,
      first_name,
      last_name,
      avatar
    });

    await user.save();
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "Get users successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to get users",
      error: error.message,
    });
  }
};


const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User found", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, first_name, last_name, avatar } = req.body;

    const user = await User.findOneAndUpdate(
      { id },
      { email, first_name, last_name, avatar },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findOneAndDelete({ id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  }
  catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
};
