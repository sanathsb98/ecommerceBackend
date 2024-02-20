const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const router = require('./routes/user-routes')
require('dotenv').config()


const app = express()
const PORT = process.env.PORT;
const MONGOPASSWORD = process.env.MONGOPASSWORD;
const MONGODBNAME = process.env.MONGODBNAME;

app.use(cors())
app.use(express.json())
app.use(router)


const connectToMongoDb = async() => {
    try {
        await mongoose.connect(`mongodb+srv://itssanathsb:${MONGOPASSWORD}@cluster0.i1yzpth.mongodb.net/${MONGODBNAME}?retryWrites=true&w=majority`)
            .then(() => console.log("connected to mongodb"))
    }
    catch (err) {
        console.log(err)
    }
}

app.listen(PORT, () => {
    console.log("server is listening")
})

connectToMongoDb()

module.exports = app;