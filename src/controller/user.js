const bcrypt = require('bcryptjs')
const User = require('../models/user')


exports.createUser = async (req, res) => {
    try {
        const { name, email, number, password, confirmPassword } = req.body

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

        const hash = await bcrypt.genSalt(10)
        const NewUser = new User({
            name, email, number, password: hash
        })
        await NewUser.save()
        res.status(200).json(NewUser)
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
        
        res.status(500).json({ message: 'Todo not found' })
    }
}