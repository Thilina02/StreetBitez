const Driver = require('../models/driverModel');
const mongoose = require('mongoose');
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken');


// Get all drivers
const getDrivers = async (req, res) => {
    try {
        const drivers = await Driver.find({}).sort({ createdAt: -1 });
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// GET a single driver
const getDriver = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such driver' });
    }

    try {
        const driver = await Driver.findById(id);
        if (!driver) {
            return res.status(404).json({ error: 'No such driver' });
        }
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//register endpoint
// Create a new driver
const createDriver = async (req, res) => {
    try {
        const { username, email, mobile, nic, province, gender, password } = req.body;
        //check if name is entered
        if (!username) {
            return res.json({
                error: 'name is required'
            })
        };

        //check email
        const exist = await Driver.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            })
        }

        if (!mobile || mobile.length < 10) {
            return res.json({
                error: 'mobile is required with 10 digits exactly'
            })
        };

        if (!nic) {
            return res.json({
                error: 'nic is required'
            })
        };

        if (!province) {
            return res.json({
                error: 'province is required'
            })
        };

        if (!gender) {
            return res.json({
                error: 'gender is required'
            })
        };

        if (!password || password.length < 6) {
            return res.json({
                error: 'password is required and should be at least 6 characters long'
            })
        };

        hashedPassword = await hashPassword(password)
        //create user in db
        const driver = await Driver.create({
            username,
            email,
            mobile,
            nic,
            province,
            gender,
            password: hashedPassword,
        })

        return res.json(driver)

    } catch (error) {
        console.log(error)
    }


}


//login endpoint
const loginDriver = async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if driver exists
        const driver = await Driver.findOne({ email });
        if (!driver) {
            return res.json({
                error: 'No driver found'
            })
        }

        //check if pw match
        const match = await comparePassword(password, driver.password)
        if (match) {
            jwt.sign({ email: driver.email, id: driver._id, username: driver.username }, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(driver)
            })
        }
        if (!match) {
            res.json({
                error: "password do not match"
            })

        }
    } catch (error) {
        console.log(error)
    }

}

//getdriver profile enpoint
const getDriverProfile = (req, res) => {
    const { token } = req.cookies
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, driver) => {
            if (err) throw err;
            res.json(driver)
        })
    } else {
        res.json(null)
    }
}

// Get driver profile data
const getDriverProfileData = async (req, res) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({ error: 'Authentication token not provided' });
        }

        // Verify the JWT token
        jwt.verify(token, process.env.JWT_SECRET, {}, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' });
            }

            const { id } = decoded;

            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({ error: 'No such driver' });
            }

            try {
                const driver = await Driver.findById(id);
                if (!driver) {
                    return res.status(404).json({ error: 'No such driver' });
                }

                // Here you can customize the data you want to include in the driver profile response
                const driverProfile = {
                    id: driver._id,
                    username: driver.username,
                    email: driver.email,
                    mobile: driver.mobile,
                    nic: driver.nic,
                    province: driver.province,
                    gender: driver.gender,
                    // Add more fields as needed
                };
                res.status(200).json(driverProfile);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const getDriverId = (req) => {
    const { token } = req.cookies;

    if (!token) {
        throw new Error('Authentication token not provided');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        throw new Error('Invalid token');
    }
};



// Delete a driver
const deleteDriver = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such driver' });
    }

    try {
        const driver = await Driver.findOneAndDelete({ _id: id });
        if (!driver) {
            return res.status(404).json({ error: 'No such driver' });
        }
        res.status(204).send(); // Use 204 for successful delete with no content
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateDriver = async (req, res) => {
    const { id } = req.params;
    const { username, email, mobile, province, password } = req.body;

    try {
        if (!username) return res.json({ error: 'Name is required' });
        if (!province) return res.json({ error: 'Province is required' });
        if (!mobile || mobile.length < 10) return res.json({ error: 'Phone number must be 10 digits' });
        if (!email) return res.json({ error: 'Email is required' });
        if (password && password.length < 6) return res.json({ error: 'Password must be at least 6 characters' });

        let updateFields = { username, email, mobile, province };
        if (password) {
            const hashedPassword = await hashPassword(password);
            updateFields.password = hashedPassword;
        }

        const driver = await Driver.findByIdAndUpdate(
            id,
            updateFields,
            { new: true, runValidators: true }
        );

        if (!driver) {
            return res.json({ error: 'No Driver found' });
        }

        res.json({ data: driver });
    } catch (error) {
        console.error('Error updating driver:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};




module.exports = {
    getDrivers,
    getDriver,
    createDriver,
    deleteDriver,
    updateDriver,
    loginDriver,
    getDriverProfile,
    getDriverProfileData,
    getDriverId
};
