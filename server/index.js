const express = require("express")
const mongoose = require("mongoose")
// const config = require("config")
const authRouter = require("./routes/auth.routes")
const app = express()
const { MongoClient } = require("mongodb");
// const PORT = config.get('serverPort')

app.use(express.json())
app.use("/api/auth", authRouter)


const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://denisenki:y72JB97f1xFLHCIL@cluster0.ncnfqr6.mongodb.net/?retryWrites=true&w=majority")

        app.listen(8000, () => {
            console.log('Server started on port ')
        })
    } catch (e) {
        console.log('err')
    }
}

start()

// Replace the following with your Atlas connection string                                                                                                                                        
// const url = "mongodb+srv://Denisenki:Denisenko000111@cloud.64ndm.mongodb.net/cloud?retryWrites=true&w=majority";
// const client = new MongoClient(url);
// async function run() {
//     try {
//         await client.connect();
//         console.log("Connected correctly to server");
//     } catch (err) {
//         console.log(err.stack);
//     }
//     finally {
//         await client.close();
//     }
// }
// run().catch(console.dir);