const bcrypt = require('bcryptjs')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email) {
            res.status(400).json({ message: 'enter name' })
        } else if (!password) {
            res.status(400).json({ message: 'enter password' })
        }

        const existingUser = await User.findOne({
            email: email
        })

        if (!existingUser) {
            res.status(400).json({ message: 'User not found' })
        }

        const verify = await bcrypt.compare(password, existingUser?.password)

        if (!verify) {
            res.status(400).json({ message: 'Password dosnot match' })
        }

        const token = jwt.sign({ _id: existingUser._id },
            'helloiamavhradipghosh'
        )

        res.status(200).json({ message: 'login sucesfull', user: existingUser, token: token })

    } catch (error) {
        return res.status(500).json({ message: 'Error to login' })
    }
}

exports.getUserByToken = async (req, res) => {
    try {
        const userFind = await User.findById(req.user._id)
        res.status(200).json({ user: userFind })
    } catch (error) {
        return res.status(500).json({ message: 'user notfound' })
    }
}

exports.createUser = async (req, res) => {
    try {
        const { name, email, number, password, confirmPassword } = req.body
        console.log(req.file);
        
        const filePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`

        if (!name) {
            res.status(400).json({ message: 'Enter Name' })
        } else if (!email) {
            res.status(400).json({ message: 'Enter Email' })
        } else if (!number) {
            res.status(400).json({ message: 'Enter Number' })
        } else if (!password) {
            res.status(400).json({ message: 'Enter Password' })
        } else if (!confirmPassword) {
            res.status(400).json({ message: 'Enter confirm Password' })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email: email })
        console.log({ existingUser })

        if (existingUser) {
            return res.status(400).json({ message: "User exists" })
        }

        const hash = await bcrypt.hash(password, 10)
        const NewUser = new User({
            name, email, number, password: hash, profilePic: filePath
        })
        await NewUser.save()
        res.status(200).json(NewUser)
        console.log(req.file)


    } catch (error) {
        return res.status(500).json({ message: 'Error creating user', error: error.message });
    }
}

exports.getUser = async (req, res) => {
    try {
        const user = await User.find()
        res.status(200).json(user)
    } catch (error) {
        console.log(error);

        res.status(500).json({ message: 'users not found' })
    }
}

exports.getUserById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: 'user not found' })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { name, password, number, email, id } = req.body
        if (id) {
            const hashPassword = await bcrypt.hash(password, 10)
            const Updateuser = await User.findByIdAndUpdate(id, {
                name, password: hashPassword, number, email
            }, {
                new: true
            })
            res.status(200).json({ message: "user updated sucesfully", Updateuser })
        } else {
            res.status(400).json('enter id')
        }
    } catch (error) {
        res.status(500).json({ message: 'user not found', error })
    }
}

exports.updateUserPartial = async (req, res) => {
    try {
        const updateData = {};

        const { name, password, number, email, id } = req.body;

        if (name) updateData.name = name;
        if (number) updateData.number = number;
        if (email) updateData.email = email;
        if (password) {
            const hashPassword = await bcrypt.hash(password, 10);
            updateData.password = hashPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User updated", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong', error });
    }
};


exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.body
        const deletedUser = await User.findByIdAndDelete(id)
        res.status(200).json({ message: "user deleted sucesfully", deletedUser })
    } catch (error) {
        res.status(500).json({ message: 'user not found' })
    }
}