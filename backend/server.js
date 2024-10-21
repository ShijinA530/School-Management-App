require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const staffRoutes = require('./routes/staffRoutes')
const userRoutes = require('./routes/userRoutes')
const studentRoutes = require('./routes/studentRoutes')
const feesRoutes = require('./routes/feesRoutes')
const libraryRoutes = require('./routes/libraryRoutes')

const cors = require('cors');
const { loginUser } = require('./controllers/userController')
var corsOptions = {
    "origin": "http://localhost:5173",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
  }
 
const app = express()
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
    res.send("hello world")
})

app.use('/api/user', userRoutes)
app.use('/api/staff', staffRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/fees', feesRoutes)
app.use('/api/library', libraryRoutes)

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => 
        console.log('connected to db & listening on port', process.env.PORT)    
    )
})
.catch((error) => 
    console.log(error)
)
