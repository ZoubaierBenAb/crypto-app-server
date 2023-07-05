const express = require('express')
const dotenv = require('dotenv').config()
const userRoutes = require('./routes/userRoutes')
const commentRoutes = require('./routes/commentRoutes')
const {protect} = require('./middlewares/authMiddleware')
const sentimentRoutes = require('./routes/sentimentRoutes')
const mongoose = require('mongoose')

const runSaveDataJob = require('./coin-org/dataScheduler')
const cron = require('node-cron');
const dataRoutes = require('./routes/dataRoutes')
const errorHandler = require('./middlewares/errorMiddleware')
const cors = require('cors')
const wishlistRoutes = require('./routes/wishlistRoutes')
const saveCryptosInTheDataBase = require('./coin-org/saveCrypto')
const runCoinCategoriesJob = require('./coin-org/coinCategoriesSchedule')
const deleteAllCoinCategories = require('./coin-org/deleteCoinCategories')



async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb+srv://weirdscenario:123123123@cluster0.r373vsw.mongodb.net/', {
      
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
saveCryptosInTheDataBase()
runCoinCategoriesJob()
runSaveDataJob()
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
cron.schedule('45 */29 * * * *', () => {
  deleteAllCoinCategories();
});
const port = process.env.PORT

app.use('/api',userRoutes)
app.use('/sentiment',sentimentRoutes)
app.use('/coins',commentRoutes)
app.use('/data',dataRoutes)
app.use('/wishlist',protect,wishlistRoutes)

app.listen(port,()=>{
    console.log(`server is runnig on ${port}`);
    
    
})