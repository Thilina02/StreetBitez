import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/adminNavBar';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLifeRing } from "@fortawesome/free-solid-svg-icons"; // Import the desired icon

export default function SeesupportPage() {
  const [supportList, setSupportList] = useState([]);
  const [filteredSupportList, setFilteredSupportList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchSupportList = async () => {
      try {
        const { data } = await axios.get('/all-support');
        setSupportList(data);
        setFilteredSupportList(data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchSupportList();
  }, []);

  const handleSearch = () => {
    const filteredSupport = supportList.filter((support) =>
      support.userName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSupportList(filteredSupport);
  };

  const handleMarkAsRead = async (supportId) => {
    try {
      // Make an API request to mark support message as read
      await axios.put(`/mark-support-as-read/${supportId}`);

      // Update the isRead property in the UI
      const updatedSupportList = supportList.map((support) => {
        if (support._id === supportId) {
          return { ...support, isRead: true };
        } else {
          return support;
        }
      });

      setSupportList(updatedSupportList);
      setFilteredSupportList(updatedSupportList);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const generatePDF = () => {
    const pdf = new jsPDF();
  
    const table = document.querySelector('.table'); // Replace with the actual selector for your table
  
    const tableHeight = pdf.internal.pageSize.height - 20; // Adjust the margin as needed
  
    html2canvas(table).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
  
      pdf.addImage(imgData, 'PNG', 10, 10, pdf.internal.pageSize.getWidth() - 20, tableHeight);
  
      pdf.save('table.pdf'); // Change the filename as desired
    });
  };

  return (
    <div>
      <AdminNavBar />
      <div className="customer-details-container">
        <br />
        <br />
        <h1>
          <FontAwesomeIcon icon={faLifeRing} /> Support
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
          <p>Loading support data...</p>
        ) : supportList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">User Email</th>
                <th scope="col">Support message</th>
                <th scope="col">Date and Time</th>
                <th scope="col">Action</th> {/* Add a column for Mark as Read */}
              </tr>
            </thead>
            <tbody>
              {filteredSupportList.map((support, index) => (
                <tr key={support._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{support.userName}</td>
                  <td>{support.email}</td>
                  <td>{support.supportText}</td>
                  <td>{support.createdAt}</td>
                  <td>
                    {!support.isRead ? (
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
                      onClick={() => handleMarkAsRead(support._id)}
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
          <p>No support data available.</p>
        )}
       <button className="print-button" onClick={generatePDF}>
  Generate PDF
</button>
      </div>
    </div>
  );
}
