import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function PasswordReset() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    securityQuestion: '',
    securityAnswer: '',
    newPassword: '',
  });

  const securityQuestions = [
    "What is your mother's maiden name?",
    'What is the name of your first pet?',
    'Where were you born?',
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword.length < 8) {
        toast.error('Password should be at least 8 characters long.');
        return;
      }

    try {
      const response = await axios.post('/reset-password', formData);

      if (response.data.message === 'Password reset successful') {
        toast.success('Password reset successful. You can now log in with your new password.');
        navigate('/login');
      } else {
        toast.error('Password reset failed. Please check your information and try again.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Password Change Failed Check Again.');
    }
  };

  return (
    <div className="form-container">
      <div className="bgr-image"></div>
      <div className="content form-box">
        <br></br>
        <h2>Password Reset</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="securityQuestion" className="form-label">
              Security Question:
            </label>
            <select
              className="form-select"
              id="securityQuestion"
              name="securityQuestion"
              value={formData.securityQuestion}
              onChange={handleInputChange}
              required
            >
              <option value="">Select a security question</option>
              {securityQuestions.map((question, index) => (
                <option key={index} value={question}>
                  {question}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="securityAnswer" className="form-label">
              Security Answer:
            </label>
            <input
              type="text"
              className="form-control"
              id="securityAnswer"
              name="securityAnswer"
              value={formData.securityAnswer}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="newPassword" className="form-label">
              New Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}
