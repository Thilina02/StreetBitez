const express = require('express');
const dotenv = require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose'); // Correct import
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Database connection failed', err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use(
  session({
    secret: 'Naduka0916',
    resave: false,
    saveUninitialized: false,
  })
);

// Replace 'allowed-origin.com' with the actual origin(s) of your frontend application(s)
const allowedOrigins = ['http://localhost:5173', 'https://your-production-app.com'];

const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

// Allow requests only from the specified origins
app.use(cors(corsOptions));




app.use('/', require('./routes/authRoutes'));
app.use('/inventory', require('./routes/invRoutes'));
app.use('/stall', require('./routes/stallRoutes'));
app.use('/employee', require('./routes/employeeRoutes'));

app.use('/invDetails', require('./routes/invDetailsRoutes'));
app.use('/issuedDetails', require('./routes/issuedRoutes'));




// driverRoutes
const driverRoutes = require('./routes/driverRoutes')
app.use('/drivers', driverRoutes)

const port = 8000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// For insert data
//for upload slip
const SlipRoutes = require('./routes/SlipRoutes');
app.use('/', SlipRoutes);

//for insert data
const orderRoute = require('./routes/OrderRoute');
app.use('/', orderRoute);

// For view data
const cartRoute = require('./routes/cartRoute');
app.use('/cart', cartRoute);
app.use('/Event', require('./routes/eventRoutes'));

const incomeRoute = require('./routes/IncomeExpensesRoutes');
app.use('/', incomeRoute )

const expenseRoute = require('./routes/expensess');
app.use('/espense', expenseRoute )

app.use('/invDetails', require('./routes/invDetailsRoutes'));

const OrderSuccess = require('./routes/OrderSuccessfullModel');
app.use('/SuccessOrder', OrderSuccess);

const StallSuccess = require('./routes/stallSuccessRoute');
app.use('/SuccessStall', StallSuccess);
