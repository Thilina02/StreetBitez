import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast'; 
import './feedbacks.css';

const FeedbackPage = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [userName, setUserName] = useState(''); // State for user name
  const [rating, setRating] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!feedbackText) {
      toast.error('Please enter feedback before submitting');
      return;
    }
  
    try {
      const response = await axios.post('/submit-feedback', {
        userId: 'user_id_here',
        feedbackText,
        userName,
        rating, 
      });
  
      console.log(response.data);
      toast.success('Thank You For submitting Feedback');
      toast.success('Feedback submitted successfully');
      setFeedbackText('');
      setUserName(''); 
      setRating('');
    } catch (error) {
      console.error(error);
      toast.error('Error submitting feedback');
    }
  };

  return ( 
    <div className="bg-image">
    <div className="containerfeedback">
      <br></br>
      <br></br>
      <h2 className="h1-responsive font-weight-bold text-center my-4">Submit Feedback</h2>
      <div className="feedback-form">
        <form onSubmit={handleSubmit}>
          <div className="md-form">
            <input
              type="text"
              id="name"
              className="form-control"
              placeholder="Your Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="md-form">
            <textarea
              rows="5"
              id="message"
              className="form-control md-textarea"
              placeholder="Enter your feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="md-form">
          {/* Star rating component */}
          <div>
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              className="form-control"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
            >
              <option value="0">Select rating</option>
              <option value="1">1 star</option>
              <option value="2">2 stars</option>
              <option value="3">3 stars</option>
              <option value="4">4 stars</option>
              <option value="5">5 stars</option>
            </select>
          </div>
        </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primaryF">Submit Feedback</button>
          </div>
        </form>
      </div>
      <footer className="footers">
        <hr />
        <p className="text-center">All rights reserved &copy;</p>
      </footer>
    </div>
    </div>
  );
};

export default FeedbackPage;
