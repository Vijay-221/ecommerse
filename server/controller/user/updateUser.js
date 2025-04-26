const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res) => {
  try {
    const userId = req.userId; // assuming middleware sets req.userId
    const { name, email, oldPassword, newPassword, profilePic } = req.body;

    const user = await userModel.findById(userId);
    if (!user) throw new Error("User not found");

    // If password update is requested, verify old password
    if (oldPassword && newPassword) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) throw new Error("Old password is incorrect");
    }

    // Prepare update payload
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (profilePic) updateData.profilePic = profilePic;

    if (newPassword) {
      const salt = bcrypt.genSaltSync(10);
      updateData.password = bcrypt.hashSync(newPassword, salt);
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateData, { new: true });

    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: true,
      message: err.message || "Something went wrong",
    });
  }
};

module.exports = updateUser;
