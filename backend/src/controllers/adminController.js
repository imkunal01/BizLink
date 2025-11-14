const User = require('../models/User');
const user = require('../models/User');

// is function se sab user milenge except un logo password
const getAllUsers = async (req,res)=>{
    try{
        const users = await user.find().select("-password");
        res.json(users);
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
};

// ye block karne wala fucntion hai bc

const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// admin can update user role
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!["customer", "retailer", "admin"].includes(role))
      return res.status(400).json({ message: "Invalid role" });

    user.role = role;
    await user.save();

    res.json({ message: "User role updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Delete a User (Admin Only)
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    // prevent admin from deleting self
    if (user._id.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: "You can't delete yourself" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalRetailers = await User.countDocuments({ role: "retailer" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const blockedUsers = await User.countDocuments({ isBlocked: true });

    res.json({
      totalUsers,
      totalRetailers,
      totalCustomers,
      blockedUsers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRetailerOrdersAdmin = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name role email")
      .populate("items.product", "name images")
      .where("user.role")
      .equals("retailer");

    res.json({ success: true, data: orders });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};




module.exports = { getAllUsers, toggleBlockUser, updateUserRole, getStats , deleteUser, getRetailerOrdersAdmin };