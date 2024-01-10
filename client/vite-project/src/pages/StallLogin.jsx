import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './StallLogin.css';


export default function StallLogin() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  
 const Stalllogin = async (e) => {
  e.preventDefault()
  const {email, password} = data
    try{
         const {data} = await axios.post('/stall/Stalllogin' ,{
          email,
          password
         });
         if(data.error){
          toast.error(data.error)
         } else{
          setData({});
          navigate('/StallOwnerDashboard')

         }
    }catch (error){

    }
 }

  return (
    <div className="login-container">
          
    
      <div className="bgs-image"></div>
      
      <br></br>
      
        <div className="contentL">
          <h2>Login</h2>
          <form onSubmit={Stalllogin}>
            <div className="mb-3">
              <label htmlFor="email">Email</label>
              <input
                type="text"
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
          <p className="register-link">
            
          </p>
          <p className="forgot-password-link">
  
</p>

</div>
    </div>
    
  );
}
