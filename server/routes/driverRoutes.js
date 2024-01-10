const express = require('express');
const router = express.Router();

// Import the controller functions correctly
const {
    createDriver,
    getDrivers,
    getDriver,
    deleteDriver,
    updateDriver,
    loginDriver,
    getDriverProfile,
    getDriverProfileData,
    getDriverId
} = require('../controllers/driverController');



// Define routes
// GET all Drivers
router.get('/getDrivers',  getDrivers); 

// GET a single driver
router.get('/getDriver/:id', getDriver);

// Register a new driver
router.post('/addDriver', createDriver);

// DELETE a driver
router.delete('/deleteDriver/:id', deleteDriver);

// UPDATE a driver
router.put('/driverupdate/:id', updateDriver);

//login driver
router.post('/loginDriver', loginDriver);

//get driver profile
router.get('/profileDriver/:id', getDriverProfile)

//get driver data to fetch in driver profile page
router.get('/getDriverData', getDriverProfileData)

router.get('/getDriverId', getDriverId)

module.exports = router;