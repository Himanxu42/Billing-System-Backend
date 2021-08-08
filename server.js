const express = require('express') ; 
const mongoose = require('mongoose') ; 
const authRoutes = require('./routes/AuthRoutes');
const productRoutes = require('./routes/ProductRoutes');
const categoryRoutes = require('./routes/CategoryRoutes');
const orderRoutes = require('./routes/OrderRoutes')
const app = express() ; 
const PORT = process.env.PORT || 4000 ;  
const cors = require('cors'); 
mongoose.connect("mongodb://localhost:27017/Employee", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Database is up and running")
    })
    .catch((err) => {
        console.log(err)
    });
app.use(express.json())
app.use(cors());
app.use('/api', authRoutes);
app.use('/api', productRoutes); 
app.use('/api', categoryRoutes);
app.use('/api', orderRoutes);
app.listen(PORT , ()=>{
    console.log('Server running')
})