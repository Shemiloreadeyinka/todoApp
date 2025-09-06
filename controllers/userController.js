const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


exports.register = async (req, res) => {
    const { username, email, phoneNo, password } = req.body
    try {
        if (!username || !email || !password || !phoneNo) return res.status(400).json({ message: 'please fill in credentials' })
        let user = await User.findOne({ email })
        if (user) return res.status(400).json({ message: 'user already exists' })
        const hashedpassword = await bcrypt.hash(password, 10)
        user =  new User ({
            username, email, phoneNo, password: hashedpassword
        })
        await user.save()
        return res.status(200).json({ message: 'user registered successfully', user })

    } catch (error) {
        return res.status(500).json({ message: `Error saving user: ${error.message}` });

    }

}

exports.login = async (req, res) => {
    const { email, password } = req.body
    try {
        if (!email || !password) return res.status(400).json({ message: " input credentials please" })
        const user = await User.findOne({ email })
        if (!user) return res.status(400).json({ message: "user doesn't exist" })
        const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ message: "invalid credentials" })

        const token = jwt.sign({ id: user._id , isAdmin: user.isAdmin}, process.env.JWT_SECRET, { expiresIn: '1h' })
        res.cookie("token", token, { httpOnly: true })
        return res.status(200).json({ message: 'login successful' })
    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}

exports.getoneUser = async (req, res) => {
    const {id } = req.params
    try {
        const user =await  User.findById(id)
        if (!user) return res.status(400).json({ message: "User doesn't exist" })
        return res.status(200).json({ message: "user retrieved successfully", user })
    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
exports.getallUsers = async (req, res) => {
    try {
        const users = await User.find()

        return res.status(200).json({ message: 'successful', users })
    } catch (error) {
        return res.status(500).json({ error: `error in getting all users${error.message}` })
    }
}


exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "User deleted successfully", deletedUser });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.logout = (req, res) => {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
}

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { username, email, phoneNo, password } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        user.username = username || user.username;
        user.email = email || user.email;
        user.phoneNo = phoneNo || user.phoneNo;
        if (password) user.password = await bcrypt.hash(password, 10);

        await user.save();
        return res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
