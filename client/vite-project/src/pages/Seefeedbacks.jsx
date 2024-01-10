import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComments } from "@fortawesome/free-solid-svg-icons"; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';// Import the desired icon

export default function SeeFeedbacksPage() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [filteredFeedbackList, setFilteredFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchFeedbackList = async () => {
      try {
        const { data } = await axios.get('/all-feedbacks');
        setFeedbackList(data);
        setFilteredFeedbackList(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchFeedbackList();
  }, []);

  const handleSearch = () => {
    const filteredFeedbacks = feedbackList.filter((feedback) =>
      feedback.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFeedbackList(filteredFeedbacks);
  };

  const handleMarkAsRead = async (feedbackId) => {
    try {
      // Make an API request to mark feedback as read
      await axios.put(`/mark-as-read/${feedbackId}`);

      // Update the isRead property in the UI
      const updatedFeedbackList = feedbackList.map((feedback) => {
        if (feedback._id === feedbackId) {
          return { ...feedback, isRead: true };
        } else {
          return feedback;
        }
      });

      setFeedbackList(updatedFeedbackList);
      setFilteredFeedbackList(updatedFeedbackList);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
  
    // Hide remove, edit, and delete buttons before capturing the content
    const removeButtons = document.querySelectorAll('.remove-button');
    const editButtons = document.querySelectorAll('.edit-button');
    const deleteButtons = document.querySelectorAll('.delete-button');
    
    // Set display to none for these buttons
    removeButtons.forEach(button => {
      button.style.display = 'none';
    });
    editButtons.forEach(button => {
      button.style.display = 'none';
    });
    deleteButtons.forEach(button => {
      button.style.display = 'none';
    });
  
    const table = document.querySelector('.table');
  
    const tableHeight = pdf.internal.pageSize.height - 60; // Adjust the margin as needed
    const pageTitle = 'Steetbitz';
    const pageTitle2 = 'Feedback list';
    const currentDate = new Date().toLocaleString();
  
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
      // Add "Steetbitz" at the top
      pdf.text(10, 10, pageTitle);
  
      // Add "Customers list" as a subtitle
      pdf.setFontSize(16); // Adjust the font size as needed
      pdf.text(10, 20, pageTitle2);
    
      // Add the current date and time below "Steetbitz"
      pdf.setFontSize(12); // Adjust the font size as needed
      pdf.text(10, 30, currentDate);
    
      // Add the table below the date
      pdf.addImage(imgData, 'PNG', 10, 60, pdf.internal.pageSize.getWidth() - 40, tableHeight);
    
      // Revert the display to its original state for these buttons
      removeButtons.forEach(button => {
        button.style.display = 'block'; // or 'inline', 'inline-block', etc., depending on their original style
      });
      editButtons.forEach(button => {
        button.style.display = 'block'; // or 'inline', 'inline-block', etc., depending on their original style
      });
      deleteButtons.forEach(button => {
        button.style.display = 'block'; // or 'inline', 'inline-block', etc., depending on their original style
      });
  
      pdf.save('Feedbacks_table.pdf'); // Change the filename as desired
    });
  };

  return (
    <div>
      <AdminNavBar />
      <div className="customer-feedback-container">
        <br />
        <br />
        <h1>
          <FontAwesomeIcon icon={faComments} /> Feedbacks
        </h1>
        <br />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {isLoading ? (
          <p>Loading feedback data...</p>
        ) : feedbackList.length > 0 ? (
          <table className="tablefeed">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">Feedback</th>
                <th scope="col">Rating</th> {/* New column for rating */}
                <th scope="col">Date and Time</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFeedbackList.map((feedback, index) => (
                <tr key={feedback._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{feedback.userName}</td>
                  <td>{feedback.feedbackText}</td>
                  <td>{feedback.rating}</td> {/* Display the rating */}
                  <td>{feedback.createdAt}</td>
                  <td>
                    {!feedback.isRead ? (
                      <button
                      style={{
                        backgroundColor: '#007bff', // Set the background color to blue
                        color: '#fff', // Set the text color to white
                        border: 'none',
                        borderRadius: '4px',
                        padding: '5px 10px', // Adjust the padding as needed
                        fontSize: '14px', // Adjust the font size as needed
                        cursor: 'pointer',
                      }}
                      onClick={() => handleMarkAsRead(feedback._id)}
                    >
                      Mark as Read
                    </button>
                    ) : (
                      <span>Read</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No feedback data available.</p>
        )}
        <button className="pdf-button" onClick={generatePDF}>
  Generate PDF
</button>
      </div>
    </div>
  );
}
