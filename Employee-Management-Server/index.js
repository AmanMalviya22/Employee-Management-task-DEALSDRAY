const express = require('express');
const cors = require('cors');
const {connect} = require('mongoose');
require('dotenv').config();

const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const {notFound,errorHandler} = require('./middleware/errorMiddleware')


const app = express();

app.use(express.json({extended:true}))
app.use(express.urlencoded({extended:true}))
// Enable CORS for all requests or specific origins
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
  credentials: true // If you need to send cookies or authentication tokens
}));

app.use('/admin',adminRoutes);
app.use('/employee',employeeRoutes);

app.use(notFound);
app.use(errorHandler);



connect(process.env.MONGO_URI)
  .then(
    app.listen(5000, () =>
      console.log(`server connected on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

