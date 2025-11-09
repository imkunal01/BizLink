const User = require('../models/User');
const generateToken = require('../utils/generateToken');
const dotevn = require('dotenv');
const registerUser = async (req, res)=>{
    try {
        const { name, email, password, role } = req.body;
        // check karega if user exist or not
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "user already exists" })
        }

        // ab ham ek naya user banayenge 

        const user = await User.create({ name, email, password, role })
        if (user) {
            // respose 201 means user is created successfully
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role)
            });
        }
        else {

            // 400 Bad Request: The server cannot process the request due to malformed syntax.
            res.status(400).json({ message: "Invalid user data" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
const loginUser = async (req, res)=>{
    try {
        const { email, password } = req.body;
        // check karega if user exist or not
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id, user.role),
            });
        } else {

            // 401 res is for unauthorized access
            res.status(401).json({ message: "Invalid user data" })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (user) res.json(user);
        else res.status(404).json({ message: "User not found" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


module.exports = { registerUser, loginUser, getUserProfile };

