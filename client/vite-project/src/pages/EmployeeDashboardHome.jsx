
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import EmployeeNavBar from '../components/EmployeeNavBar';
import Calendar from 'react-calendar'; // Import the calendar component
import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import { EmployeeContext } from '../../contex/EmployeeContext'
import './employeedashboardhome.css'
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const EmployeeDashboardHome = () => {
  const { employee } = useContext(EmployeeContext);

  const cardStyles = {
    borderRadius: '.5rem',
  };

  const avatarStyles = {
    width: '80px',
  };

  const sectionStyles = {
    backgroundColor: '#f4f5f7',
  };

  const [employeeNews, setEmployeeNews] = useState([]);

  useEffect(() => {
    const getEmployeeNews = async () => {
      try {
        const { data } = await axios.get('employee/getEmployeeNews');
        setEmployeeNews(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      }
    };

    getEmployeeNews();
  }, []);

  const [employeeShift, setEmployeeShift] = useState([]);

  useEffect(() => {
    const getEmployeeShift = async () => {
      try {
        const { data } = await axios.get('/employee/getEmployeeShift');
        setEmployeeShift(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee data');
      }
    };

    getEmployeeShift();
  }, []);

  const completeShift = async (shiftId) => {
    try {
      await axios.put(`/employee/completeEmployeeShift/${shiftId}`, { done: true });
      toast.success('Shift marked as completed');
      setEmployeeShift((prevShifts) =>
        prevShifts.map((shift) =>
          shift._id === shiftId ? { ...shift, done: true } : shift
        )
      );
    } catch (error) {
      console.error(error);
      toast.error('Failed to mark shift as completed');
    }
  };

  const [employeeLeave, setEmployeeLeave] = useState([]);

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

  const deleteEmployeeLeave = async (leaveId) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this item?');

    if (shouldDelete) {
      try {
        await axios.delete(`/employee/deleteEmployeeLeave/${leaveId}`);
        toast.success('Item deleted successfully');
        setEmployeeLeave(prevEmployeeLeaves => prevEmployeeLeaves.filter(leave => leave._id !== leaveId));
      } catch (error) {
        console.error(error);
        toast.error('Failed to delete item');
      }
    }
  };

  const [data, setData] = useState({
    email: '',
    description: '',
  });

  const createEmployeeContact = async (e) => {
    e.preventDefault();

    const { email, description } = data;
    try {
      const data = await axios.post('/employee/createEmployeeContact', { email, description });
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({ email: '', description: '' })
        toast.success('Login Successful. Welcome')
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [employeeSalary, setEmployeeSalary] = useState([]);

  useEffect(() => {
    const getEmployeeSalary = async () => {
      try {
        const { data } = await axios.get('/employee/getEmployeeSalary');
        setEmployeeSalary(data);
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch employee salary data');
      }
    };

    getEmployeeSalary();
  }, []);

  function generateemployeeSalaryReport() {
    const pdf = new jsPDF();

    // Add stall logo (replace 'logo.png' with your image path)
    // const imgData = '../../../../server/uploads/profile-photos/1696802022090.jpeg';
    // pdf.addImage(imgData, 'JPEG', 10, 10, 40, 40);

    // Define font size for the content
    pdf.setFontSize(12);

    // Add page number to the first page
    pdf.text('Page 1', 190, 10);

    // Add the table
    const tableData = [];
    employeeSalary.forEach((salary) => {
      tableData.push([
        salary.name,
        salary.email,
        salary.idNumber,
        salary.phoneNumber,
        salary.team,
        salary.daySalary,
        salary.wDays,
        salary.lDays,
        salary.calculatedSalary
      ]);
    });

    pdf.autoTable({
      head: [['Name', 'Email', "IDNumber", 'Phone Number', 'Team', 'Day Salary', 'Working Days', 'Leave Days','Total Salary']],
      body: tableData,
      startY: 60, // Adjust the Y position to avoid overlapping with the logo and page number
    });

    

    // Save the PDF
    pdf.save('income_report.pdf');
    console.log('Report saved.');
  }


  // Filter employee shifts by employee.team value
  const filteredEmployeeShift = employeeShift.filter(
    (shift) => shift.team === (employee ? employee.team : '')
  );

  const filteredEmployeeLeave = employeeLeave.filter(
    (leave) => leave.email === (employee ? employee.email : '')
  );

  return (
    <div>
      <EmployeeNavBar />
      <div className='fullcontainer'>
        <div className='dashcontainer'>
        <h1>Dashboard</h1>
        {!!employee && (<h1>Hi {employee.name}! </h1>)}
        <button className="generate-report-button small-button" onClick={generateemployeeSalaryReport}>
          <i className="fas fa-download"></i> Download Income Report
        </button>
        </div>
        {/* Employee News */}
        <div className='employeecontainer'>
          <div className='container mt-4'>
          <hr className="mt-0 mb-4" />
          <h1 className="item-list-title">Notices</h1>
            <hr className="mt-0 mb-4" />
            {employeeNews.length > 0 ? (
              <div className="alert alert-danger" role="alert">
                This is an important notice.
                {employeeNews.map((news) => (
                  <p key={news._id}>
                    {news.description}
                  </p>
                ))}
              </div>
            ) : (
              <p>No employee news available.</p>
            )}
          </div>
        </div>

        {/* Employee Shifts */}
            
        <div className='employeecontainer'>
        <div className='title'>
        <hr className="mt-0 mb-4" />
          <h1 className="item-list-title">Shifts</h1>
          <hr className="mt-0 mb-4" />
        </div>
            <div className="item-list-container">
          <table className="item-list-table">
                <thead>
                  <tr>
                    <th>Team</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Venue</th>
                    <th>Task</th>
                    <th>Done</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployeeShift.map((shift) => (
                    <tr key={shift._id}>
                      <td>{shift.team}</td>
                      <td>{shift.date}</td>
                      <td>{shift.time}</td>
                      <td>{shift.venue}</td>
                      <td>{shift.task}</td>
                      <td>
                        {shift.done ? (
                          <button className='btn btn-danger mr-2' disabled>
                            Completed
                          </button>
                        ) : (
                          <button
                            className='btn btn-success mr-2'
                            onClick={() => completeShift(shift._id)}
                          >
                            Complete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          
  
        

       
         
        <div className='employeecontainer'>
        <div className='title'>
        <hr className="mt-0 mb-4" />
          <h1 className="item-list-title">Leaves</h1>
          <hr className="mt-0 mb-4" />
        </div>
              <div className="mb-3">
                <Link to="/createEmployeeLeave" className='btn btn-success mb-3'>Add +</Link>
              </div>
              <div className="item-list-container">
          <table className="item-list-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Type</th>
                    <th>Time</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployeeLeave.map((leave) => (
                    <tr key={leave._id}>
                      <td>{leave.name}</td>
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
                      <td>
                        <button className='btn btn-danger' onClick={() => deleteEmployeeLeave(leave._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          
        

          <div className='employeecontainer'>
  <div className='row justify-content-center align-items-center'>
  <hr className="mt-0 mb-4" />
  <h1 className="item-list-title">Contacts</h1>
  <hr className="mt-0 mb-4" />
    <div className='col-md-6'>
      <div className='w-100 bg-white rounded p-3'>
        <form onSubmit={createEmployeeContact}>
          
          <div className='mb-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              placeholder='Enter Email'
              className='form-control'
              name='email'
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className='mb-2'>
            <label htmlFor='description'>Description</label>
            <textarea
              rows="10"
              placeholder='Enter Description'
              className='form-control'
              name='description'
              value={data.description}
              onChange={(e) => setData({ ...data, description: e.target.value })}
            />
          </div>
          <button className='btn btn-success'>Create</button>
        </form>
      </div>
    </div>
    <div className='col-md-6'>
      <img
        src='https://unblast.com/wp-content/uploads/2020/09/Contact-Us-Vector-Illustration-Part-02-1.jpg' // Replace with your image URL
        alt='Contact Image'
        className='img-fluid rounded'
      />
    </div>
  </div>
</div>

<div className='employeecontainer'>
  <hr className="mt-0 mb-4" />
  <h1 className="item-list-title">Calender</h1>
  <hr className="mt-0 mb-4" />
  {/* Add the Calendar component here */}
  <Calendar
  tileClassName={({ date }) => {
    // Check if any shift date matches the current date
    const isShiftDate = filteredEmployeeShift.some(
      (shift) =>
        new Date(shift.date).toDateString() === date.toDateString()
    );

    // Apply Bootstrap classes to mark the date if it's a shift date
    return isShiftDate ? 'bg-primary text-white' : '';
  }}
/>

  </div>

</div>
      
</div>
  );
};

export default EmployeeDashboardHome;
