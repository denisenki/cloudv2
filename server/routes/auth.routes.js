const Router = require("express");
const User = require("../models/User")
// const UserSequelize = require("../models/UserSQL")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator")
const router = new Router()
const jwt = require("jsonwebtoken")
const config = require("config")


const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('sys', 'root', 'Denisenko000111', {
    host: 'localhost',
    dialect: 'mysql'
});

const sequelizeCheck = async () => {
    try {

        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

sequelizeCheck()

const UserSQL = require(`../models/UserSQL`)(sequelize)


router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 })
    ],
    async (req, res) => {
        try {
            console.log(req.body)


            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }

            const { email, password } = req.body;

            const candidate = await User.findOne({ email })

            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} already exist` })
            }
            const hashPassword = await bcrypt.hash(password, 5)
            const user = new User({ email, password: hashPassword })
            await user.save()
            return res.json({ message: "User was created" })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })

router.post('/login',
    async (req, res) => {
        try {
            const { email, password } = req.body

            // Create a new user Sequalise
            const userNew = UserSQL.create({
                name: "Tom",
                age: 35
            }).then(res => {
                console.log(res);
            }).catch(err => console.log(err));

            console.log('userNew', userNew);

            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: "user not found" })
            }
            console.log(user)
            const isPassValid = bcrypt.compare(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: "password invalid" })
            }
            const token = jwt.sign({ id: user.id }, config.get('secretKey'), { expiresIn: "1h" })
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    diskSpace: user.diskSpace,
                    usedSpace: user.usedSpace,
                    avatar: user.avatar
                }

            })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })

module.exports = router