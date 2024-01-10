const EmployeeModel = require('../models/Employee');
const EmployeeShiftModel = require('../models/EmployeeShift');
const EmployeeLeaveModel = require('../models/EmployeeLeave');
const EmployeeContactModel = require('../models/EmployeeContact');
const EmployeeNewsModel = require('../models/EmployeeNews');
const EmployeeSalaryModel = require('../models/EmployeeSalary')
const { hashPassword, comparePassword } = require('../helpers/employee');
const jwt = require('jsonwebtoken');

const createEmployee = async (req, res) => {
  try {
    // Extract employee data from the request body
    const { name, email, idNumber, phoneNumber, team, password, cPassword } = req.body;

    // // Check if name was entered
    // if (!name) {
    //   return res.json({ error: 'Name is required' });
    // }

    // Check password is good
    // if (!password || password.length < 6) {
    //   return res.json({ error: 'Password is required and should be at least 6 characters' });
    // }

    // Check if email is already taken
    const exist = await EmployeeModel.findOne({ email });
    if (exist) {
      return res.json({ error: 'Email is already taken' });
    }

    const hashedPassword = await hashPassword(password)
    // Create a new Employee instance
    const employee=await EmployeeModel.create({
      name,
      email,
      idNumber,
      phoneNumber, 
      team, 
      password:hashedPassword, 
      cPassword:hashedPassword 
  })


    return res.json(employee);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating an employee' });
  }
};



const loginEmployee = async(req,res) => {
  try {
    const{email,password} = req.body;
  
    //check if user exist
    const employee = await EmployeeModel.findOne({email});
    if(!employee) {
      return res.json({
        error:'No user found'
      })
    }
    //chech if password match
    const match = await comparePassword(password, employee.password)
    if(match){
      jwt.sign({email: employee.email, id: employee._id, name:employee.name,idNumber:employee.idNumber,phoneNumber:employee.phoneNumber,team:employee.team,password:employee.password},process.env.JWT_SECRET,{}, (err,token) => {
        if(err) throw err;
        res.cookie('token',token).json(employee)
      } )
      
    }
    if(!match){
      res.json({
        error:"password do not match"
      })
    }
  } catch (error) {
    console.log(error)
  }
  }
  
  const getEmployeeProfile = (req, res) => {
    const {token}  = req.cookies
    if(token) {
      jwt.verify(token, process.env.JWT_SECRET,{}, (err, employee) => {
        if(err) throw err;
        res.json(employee)
      })
    } else {
      res.json(null)
    }
    }


const getEmployee = async (req, res) => {
  try {
    const getEmployeeResult = await EmployeeModel.find();
    return res.json(getEmployeeResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

const getEmployeeId = async (req, res) => {
  try {
    const employeeId = await EmployeeModel.findById(req.params.id);
    res.json(employeeId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employee by ID' });
  }
};

const getEmployeeEId = async (req, res) => {
  try {
    const employeeId = await EmployeeModel.findById(req.params.id);
    res.json(employeeId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employee by ID' });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, email, idNumber, phoneNumber, team, password, cPassword } = req.body;

  const updatedEmployee = await EmployeeModel.findByIdAndUpdate(
    id,
    {
      name,
      email,
      idNumber,
      phoneNumber,
      team,
      password,
      cPassword,
    },
    {
      new: true,
    }
  );

  return res.json(updatedEmployee);
};



const deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployee = await EmployeeModel.findByIdAndRemove(id);
    if (!deletedEmployee) {
      return res.json({
        error: 'No employee found',
      });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
};


const createEmployeeShift = async (req, res) => {
  try {
    const { team,date,time, venue,task,done } = req.body;
    

   
    const createEmployeeShiftResult = await EmployeeShiftModel.create({
      team,
      date,
      time, 
      venue,
      task,
      done
    });

    return res.json(createEmployeeShiftResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating an shift' });
  }
};


const getEmployeeShift = async (req, res) => {
  try {
    const getEmployeeShiftResult = await EmployeeShiftModel.find();
    return res.json(getEmployeeShiftResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

const getEmployeeShiftId = async (req, res) => {
  try {
    const shiftId = await EmployeeShiftModel.findById(req.params.id);
    res.json(shiftId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employee by ID' });
  }
};



const updateEmployeeShift = async (req, res) => {
  const { id } = req.params;
  const { team, date, time, task,  } = req.body;

  const updatedEmployeeShift = await EmployeeModel.findByIdAndUpdate(
    id,
    {
      team,
      date,
      time,
      task,
      
    
    },
    {
      new: true,
    }
  );

  return res.json(updatedEmployeeShift);
};

const completeEmployeeShift = async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  try {
    // Find the shift by its ID and update the 'done' field
    const completedShift = await EmployeeShiftModel.findByIdAndUpdate(
      id,
      { done },
      { new: true }
    );

    if (!completedShift) {
      return res.status(404).json({ error: 'Shift not found' });
    }

    return res.json(completedShift);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating shift' });
  }
};



const deleteEmployeeShift = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployeeShift = await EmployeeShiftModel.findByIdAndRemove(id);
    if (!deletedEmployeeShift) {
      return res.json({
        error: 'No employee found',
      });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
};

const createEmployeeLeave = async (req, res) => {
  try {
    const { name,email,type,reason,time,startDate,endDate,leaveDays } = req.body;

   
    const createEmployeeLeaveResult = await EmployeeLeaveModel.create({
      name,
      email,
      type,
      reason,
      time,
      startDate,
      endDate,
      leaveDays
    });

    return res.json(createEmployeeLeaveResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating an employee' });
  }
};

const getEmployeeLeave = async (req, res) => {
  try {
    const getEmployeeLeaveResult = await EmployeeLeaveModel.find();
    return res.json(getEmployeeLeaveResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

const deleteEmployeeLeave = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployeeLeave = await EmployeeLeaveModel.findByIdAndRemove(id);
    if (!deletedEmployeeLeave) {
      return res.json({
        error: 'No employee found',
      });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
};

const completeEmployeeLeave = async (req, res) => {
  const { id } = req.params;
  const { done } = req.body;

  try {
    // Find the shift by its ID and update the 'done' field
    const completedLeave = await EmployeeLeaveModel.findByIdAndUpdate(
      id,
      { done },
      { new: true }
    );

    if (!completedLeave) {
      return res.status(404).json({ error: 'Shift not found' });
    }

    return res.json(completedLeave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating shift' });
  }
};

const createEmployeeContact = async (req, res) => {
  try {
    const { email, description} = req.body;

    

   const createEmployeeContactResult = await EmployeeContactModel.create({
      email,
      description
    });

    return res.json(createEmployeeContactResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating an employee' });
  }
};

const getEmployeeContact = async (req, res) => {
  try {
    const getEmployeeContactResult = await EmployeeContactModel.find();
    return res.json(getEmployeeContactResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

const getEmployeeContactId = async (req, res) => {
  try {
    const contactId = await EmployeeContactModel.findById(req.params.id);
    res.json(contactId);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employee by ID' });
  }
};

const createEmployeeNews = async (req, res) => {
  try {
    const { description} = req.body;

    

   const createEmployeeNewsResult = await EmployeeNewsModel.create({
      
      description
    });

    return res.json(createEmployeeNewsResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating an employee' });
  }
};

const getEmployeeNews = async (req, res) => {
  try {
    const getEmployeeNewsResult = await EmployeeNewsModel.find();
    return res.json(getEmployeeNewsResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};
const deleteEmployeeNews = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployeeNews = await EmployeeNewsModel.findByIdAndRemove(id);
    if 
(!deletedEmployeeNews) {
      return res.json({
        error: 'No employee found',
      });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
};

const createEmployeeSalary = async (req, res) => {
  try {
    const {name, email, idNumber, phoneNumber, team, daySalary, wDays, lDays,calculatedSalary  } = req.body;
    

   
    const createEmployeeSalaryResult = await EmployeeSalaryModel.create({
      name,
      email,
      idNumber,
      phoneNumber,
      team,
      daySalary,
      wDays,
      lDays,
      calculatedSalary 
    });

    return res.json(createEmployeeSalaryResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating an shift' });
  }
};

const getEmployeeSalary = async (req, res) => {
  try {
    const getEmployeeSalaryResult = await EmployeeSalaryModel.find();
    return res.json(getEmployeeSalaryResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching employees' });
  }
};

const deleteEmployeeSalary = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedEmployeeSalaries = await EmployeeSalaryModel.findByIdAndRemove(id);
    if 
(!deletedEmployeeSalaries) {
      return res.json({
        error: 'No employee found',
      });
    }

    res.json({ message: 'Employee deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error deleting employee' });
  }
};

const getEmployeeProfileA = (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, employee) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to verify token' });
      }

      try {
        // Fetch user data including address and phone number
        const employeeData = await EmployeeModel.findOne({ email: employee.email }, 'name email idNumber phonenumber team password');

        if (!employeeData) {
          return res.status(404).json({ error: 'User not found' });
        }

        res.json(employeeData);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching user data' });
      }
    });
  } else {
    res.json(null);
  }
};

const handleEmployeeLogout = async (req, res) => {
  try {
    res.clearCookie('token'); // Clear the token cookie
    res.json({ message: 'Logout successful' }); // Send success response
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to logout' }); // Send error response
  }
};













module.exports = {
  createEmployee,
  getEmployeeProfile,
  loginEmployee,
  getEmployee,
  getEmployeeId,
  updateEmployee,
  getEmployeeEId,
  deleteEmployee,
  createEmployeeShift,
  getEmployeeShift,
  getEmployeeShiftId,
  updateEmployeeShift,
  completeEmployeeShift,
  deleteEmployeeShift,
  createEmployeeLeave,
  getEmployeeLeave,
  deleteEmployeeLeave,
  completeEmployeeLeave,
  createEmployeeContact,
  getEmployeeContact,
  getEmployeeContactId,
  createEmployeeNews,
  getEmployeeNews,
  completeEmployeeShift,
  deleteEmployeeNews,
  createEmployeeSalary,
  getEmployeeSalary,
  deleteEmployeeSalary,
  getEmployeeProfileA,
  handleEmployeeLogout,
 

};
