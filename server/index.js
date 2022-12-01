const express = require("express")
const mongoose = require("mongoose")
const config = require("config")
const authRouter = require("./routes/auth.routes")

const { MongoClient } = require("mongodb");
const PORT = config.get('serverPort')
const corsMiddleware = require('./middleware/cors.middleware')
const cors = require('cors')
const bodyparser = require('body-parser');

// Option 3: Passing parameters separately (other dialects)


const app = express()

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());  // enable pre-flight
//чтобы экспресс мог парсить json
app.use("/api/auth", authRouter)
app.use(corsMiddleware)
app.use(express.json())

// CORS is enabled for the selected origins
let corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:8000']
};

const start = async () => {
    try {
        await mongoose.connect(config.get('urlMongo'))
        // await sequelize.authenticate();
        // console.log('Connection has been established successfully.');

        app.listen(8000, () => {
            console.log('Server started on port ')
        })
    } catch (e) {
        console.log('err')
        // console.error('Unable to connect to the database:', error);
    }
}

start()