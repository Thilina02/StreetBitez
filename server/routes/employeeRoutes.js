const express = require('express');
const router = express.Router();
const cors = require('cors');

const {
  createEmployee,
  loginEmployee,
  getEmployeeProfile,
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
  createEmployeeNews,
  getEmployeeNews,
  deleteEmployeeNews,
  createEmployeeSalary,
  getEmployeeSalary,
  deleteEmployeeSalary,
  getEmployeeProfileA,
  handleEmployeeLogout,
  
  
  

} = require('../controllers/employeeController');

// Middleware
router.use(
  cors({
    credentials: true,
    origin: 'http://localhost:5173', // Change to your React app's origin
  })
);




// Route for creating an employee with profile photo upload
router.post('/createEmployee', createEmployee);
router.post('/loginEmployee/', loginEmployee);
router.get('/getEmployeeProfile',getEmployeeProfile);
router.get('/getEmployee',getEmployee);
router.get('/getEmployee/:id', getEmployeeId);
router.post('/updateEmployee/:id', updateEmployee);
router.delete('/deleteEmployee/:id', deleteEmployee);
router.get('/getEmployeeE/:id', getEmployeeEId);


router.post('/createEmployeeShift', createEmployeeShift);
router.get('/getEmployeeShift', getEmployeeShift);
router.get('/getEmployeeShift/:id', getEmployeeShiftId);
router.put('/completeEmployeeShift/:id', completeEmployeeShift);
router.post('/updateEmployeeShift/:id', updateEmployeeShift);
router.delete('/deleteEmployeeShift/:id', deleteEmployeeShift);

router.post('/createEmployeeLeave', createEmployeeLeave);
router.get('/getEmployeeLeave',getEmployeeLeave);
router.delete('/deleteEmployeeLeave/:id', deleteEmployeeLeave);
router.put('/completeEmployeeLeave/:id', completeEmployeeLeave);

router.post('/createEmployeeContact', createEmployeeContact);
router.get('/getEmployeeContact',getEmployeeContact);

router.post('/createEmployeeNews', createEmployeeNews);
router.get('/getEmployeeNews',getEmployeeNews);
router.get('/deleteEmployeeNews',deleteEmployeeNews);

router.post('/createEmployeeSalary', createEmployeeSalary);
router.get('/getEmployeeSalary', getEmployeeSalary);
router.delete('/deleteEmployeeSalary/:id', deleteEmployeeSalary);

router.get('/employeeProfileA', getEmployeeProfileA);
router.post('/employeeLogout', handleEmployeeLogout);





module.exports = router;
