const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/authentication')
const userRoute = require('./routes/User')
const postRoute = require('./routes/post')
const catRoute = require('./routes/categories')
const { json } = require('express')
dotenv.config()


app.use(express.json())


main().then(console.log('Db connected')).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

app.use('/api', authRoute)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/cat', catRoute)
  


port = process.env.PORT || '5000'
app.listen("5000", ()=>{
    console.log("Server Running...")
})