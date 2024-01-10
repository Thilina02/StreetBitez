import { useState } from 'react';
import axios from 'axios';
import {toast} from 'react-hot-toast'
import { Link, useNavigate } from "react-router-dom";
import './driverLogin.css';

function DriverLogin(){
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: '',
        password: '',
    })

    const loginDriver = async (e) => {
        e.preventDefault()
        const { email, password} = data
        try {
            const {data} = await axios.post('http://localhost:8000/drivers/loginDriver', {
                email,
                password
        });
        if(data.error) {
            toast.error(data.error)
        } else {
            setData ({});
            toast.success('Login Successful, Welcome!!')
            navigate('/driver-dashboard')
        }
        } catch (error) {
          console.log(error);
          toast.error('An error occurred during login.'); // Handle network or server errors

        }
    }

    return (
      
        <div className="driver-login-container">
           <div className="Driver-bg-img"></div>
      <br></br>
      <br></br>
      
      <div className="contentL">
            <h2 className='hh'>Login</h2>
            <form onSubmit={loginDriver}>
            <div className="mb-3">
                <label htmlFor="email"><strong>Email</strong></label>
                <input
                  type="email"
                  placeholder="Enter Email"
                  autoComplete="off"
                  name="email"
                  id="email"
                  className="form-control"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  />
              </div>

              <div className="Driver-form-group">
                <label htmlFor="password"><strong>Password</strong></label>
                <input
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  id="password"
                  className="form-control"
                  value={data.password}
                  onChange={(e) => setData({ ...data, password: e.target.value })}
                />
              </div>
              <button type="submit" className="driverBtn">
                Login
              </button>
            </form>
            <p className="Driver-register-link">
            New user? <Link to="/driver-register">Register now</Link>
          </p>
        
    </div>
    </div>
 )
}

export default DriverLogin;