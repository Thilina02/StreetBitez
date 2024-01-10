import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './loginemployee.css';
import axios from 'axios';
import EmployeeNavBar from '../components/EmployeeNavBar';

const LoginEmployee = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
}); 
const loginEmployee = async(e) => {
  e.preventDefault()
  const{email, password} = data
  try {
    const {data} = await axios.post('employee/loginEmployee', {
        email,
        password
    })
    if(data.error){
        toast.error(data.error)
    }else{
        setData({});
        navigate('/employeeDashboardHome')
    }
} catch (error) {
    
}
}

 

  return (
    <div className="login-container">
      <div><EmployeeNavBar/></div>
      <div className="contentL">
        <h2>Login</h2>
        <form onSubmit={loginEmployee}>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email..."
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter Password..."
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginEmployee;
