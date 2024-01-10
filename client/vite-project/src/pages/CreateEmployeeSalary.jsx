import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { toast } from 'react-hot-toast';
import AdminNavBar from '../components/adminNavBar';
import './createemployeesalary.css'

const CreateEmployeeSalary = () => {
  const navigate = useNavigate();

  const [employee, setEmployee] = useState([]);
  const [employeeLeave, setEmployeeLeave] = useState([]);
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState('');
  const [data, setData] = useState({
    name: '',
    email: '',
    idNumber: '',
    phoneNumber: '',
    team: '',
    daySalary: '',
    wDays: '',
    lDays: '',
    calculatedSalary: 0, // Initialize calculatedSalary as 0
  });

  const [selectedEmployeeData, setSelectedEmployeeData] = useState({
    name: '',
    email: '',
    idNumber: '',
    phoneNumber: '',
    team: '',
  });

  useEffect(() => {
    const getEmployee = async () => {
      try {
        const { data } = await axios.get('/employee/getEmployee');
        setEmployee(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      }
    };

    getEmployee();
  }, []);

  useEffect(() => {
    const getEmployeeLeave = async () => {
      try {
        const { data } = await axios.get('/employee/getEmployeeLeave');
        setEmployeeLeave(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      }
    };

    getEmployeeLeave();
  }, []);

  const createEmployeeSalary = async (e) => {
    e.preventDefault();
    const { name, email, idNumber, phoneNumber, team, daySalary, wDays, lDays, calculatedSalary } = data;
    try {
      const response = await axios.post('/employee/createEmployeeSalary', {
        name,
        email,
        idNumber,
        phoneNumber,
        team,
        daySalary,
        wDays,
        lDays,
        calculatedSalary,
      });
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        setData({
          name: '',
          email: '',
          idNumber: '',
          phoneNumber: '',
          team: '',
          daySalary: '',
          wDays: '',
          lDays: '',
          calculatedSalary: 0, // Reset calculatedSalary to 0
        });
        toast.success('Employee Salary Created Successfully');
        navigate('/getEmployeeSalary');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const displayLeavesByEmployeeEmail = (employeeEmail) => {
    setSelectedEmployeeEmail(employeeEmail);
  };

  const fillFormWithEmployeeData = (selectedEmployee) => {
    setSelectedEmployeeData(selectedEmployee);
    setData({
      name: selectedEmployee.name,
      email: selectedEmployee.email,
      idNumber: selectedEmployee.idNumber,
      phoneNumber: selectedEmployee.phoneNumber,
      team: selectedEmployee.team,
      daySalary: '',
      wDays: '',
      lDays: '',
    });
  };

  // Calculate the salary when wDays or lDays change
  useEffect(() => {
    const salary = (parseInt(data.wDays) - parseInt(data.lDays)) * parseFloat(data.daySalary);
    setData({ ...data, calculatedSalary: salary }); // Update calculatedSalary in data state
  }, [data.daySalary, data.wDays, data.lDays]);

  return (
    <div>
       <div><AdminNavBar /></div>
      <div className='container'>
        <div className='title'>
          <h1 className="item-list-title">Employee List</h1>
        </div>
          <div className="item-list-container">
          <table className="item-list-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>ID Number</th>
                <th>Phone Number</th>
                <th>Team</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employee.map((employee) => (
                <tr
                  key={employee._id}
                  onClick={() => displayLeavesByEmployeeEmail(employee.email)}
                >
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.idNumber}</td>
                  <td>{employee.phoneNumber}</td>
                  <td>{employee.team}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => fillFormWithEmployeeData(employee)}
                    >
                      Fill
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          
        {selectedEmployeeEmail && (
          <div>
          <div className='container'>
            <div className='title'>
              <h1 className="item-list-title">Employee Leaves</h1>
            </div>
            <div className="item-list-container">
          <table className="item-list-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Type</th>
                  <th>Time</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>
                {employeeLeave
                  .filter((leave) => leave.email === selectedEmployeeEmail)
                  .map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.email}</td>
                      <td>{leave.type}</td>
                      <td>{leave.time}</td>
                      <td>{leave.startDate}</td>
                      <td>{leave.endDate}</td>
                      <td>{leave.reason}</td>
                      <td>
                        {leave.done ? (
                          <span className="text-success">Completed</span>
                        ) : (
                          <span className="text-warning">Incomplete</span>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            </div>
          </div>
          </div>
        )}
      </div>

      <div className="form-container">
  <div className="bgr-image"></div>
  <div className="content form-box">
    <h2>Create Employee Salary</h2>
    <form onSubmit={createEmployeeSalary} className="was-validated">
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3 mt-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              name="name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3 mt-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="idNumber" className="form-label">
              ID Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="idNumber"
              placeholder="Enter ID Number"
              name="idNumber"
              value={data.idNumber}
              onChange={(e) => setData({ ...data, idNumber: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number:
            </label>
            <input
              type="text"
              className="form-control"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              name="phoneNumber"
              value={data.phoneNumber}
              onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="team" className="form-label">
          Team:
        </label>
        <input
          type="text"
          className="form-control"
          id="team"
          placeholder="Enter Team"
          name="team"
          value={data.team}
          onChange={(e) => setData({ ...data, team: e.target.value })}
          required
        />
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="daySalary" className="form-label">
              Salary for a Day:
            </label>
            <input
              type="text"
              className="form-control"
              id="daySalary"
              placeholder="Enter Salary"
              name="daySalary"
              value={data.daySalary}
              onChange={(e) => setData({ ...data, daySalary: e.target.value })}
              required
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="mb-3">
            <label htmlFor="wDays" className="form-label">
              Working Days:
            </label>
            <input
              type="text"
              className="form-control"
              id="wDays"
              placeholder="Enter Working Days"
              name="wDays"
              value={data.wDays}
              onChange={(e) => setData({ ...data, wDays: e.target.value })}
              required
            />
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="lDays" className="form-label">
          Leave Days:
        </label>
        <input
          type="text"
          className="form-control"
          id="lDays"
          placeholder="Enter Leave Days"
          name="lDays"
          value={data.lDays}
          onChange={(e) => setData({ ...data, lDays: e.target.value })}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="calculatedSalary" className="form-label">
          Calculated Salary:
        </label>
        <input
          type="text"
          className="form-control"
          id="calculatedSalary"
          placeholder="Calculated Salary"
          name="calculatedSalary"
          value={data.calculatedSalary}
          onChange={(e) => setData({ ...data, calculatedSalary: e.target.value })}
          disabled
        />
      </div>
      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="myCheck"
          name="remember"
          required
        />
        <label className="form-check-label" htmlFor="myCheck">
          Above details are correct.
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Create Employee Salary
      </button>
    </form>
  </div>
</div>

    </div>
  );
};

export default CreateEmployeeSalary;
