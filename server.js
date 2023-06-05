const express = require('express')
const dotenv = require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const quoteRoutes = require('./routes/quotesRoutes')
const commentRoutes = require('./routes/commentRoutes')
const {protect} = require('./middlewares/authMiddleware')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorMiddleware')
const cors = require('cors')
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://weirdscenario:123123123@cluster0.r373vsw.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
   
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
  }
}

connectToDatabase();

const app = express()  
app.use(errorHandler)
app.use(cors())

app.use(express.urlencoded({ extended: false }));
app.use(express.json())

const port = process.env.PORT

app.use('/api',userRoutes)
app.use('/',protect,quoteRoutes)
app.use('/coins',commentRoutes)

app.listen(port,()=>{
    console.log(`server is runnig on ${port}`)
})