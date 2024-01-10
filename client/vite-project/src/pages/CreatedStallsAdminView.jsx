import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateStallsAdminView.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function CreatedStallsAdminView() {
  const [createdStalls, setCreatedStalls] = useState([]);

  useEffect(() => {
    axios.get('/stall/createdStalls')
      .then((result) => {
        setCreatedStalls(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const totalIncome = createdStalls.length * 40000;

  function generateIncomeReport() {
    const pdf = new jsPDF();

    // Add stall logo (replace 'logo.png' with your image path)
    const imgData = '/stallImages/WhatsApp Image 2023-08-04 at 23.15.24.jpg';
    pdf.addImage(imgData, 'PNG', 10, 10, 40, 40);

    // Define font size for the content
    pdf.setFontSize(12);

    // Add page number to the first page
    pdf.text('Page 1', 190, 10);

    // Add the table
    const tableData = [];
    createdStalls.forEach((stall) => {
      tableData.push([
        stall.stallName,
        stall.type,
        stall.fName,
        stall.email,
        stall.phonenumber,
        stall.payment,
      ]);
    });

    pdf.autoTable({
      head: [['Stall Name', 'Cuisine Type', "Owner's Name", 'Email', 'Phone Number', 'Payment']],
      body: tableData,
      startY: 60, // Adjust the Y position to avoid overlapping with the logo and page number
    });

    // Add calculation and total income to the same page
    pdf.text(`Calculation: ${createdStalls.length} * 40000 = ${totalIncome} LKR`, 10, pdf.autoTable.previous.finalY + 10);
    pdf.text(`Total Income: ${totalIncome} LKR`, 10, pdf.autoTable.previous.finalY + 20);

    // Save the PDF
    pdf.save('income_report.pdf');
    console.log('Report saved.');
  }

  return (
    <div className="stall-admin-req-container">
      <div className="title">
        <h1>Stall Details</h1>
        <br />
        <button className="generate-report-button small-button" onClick={generateIncomeReport}>
          <i className="fas fa-download"></i> Download Income Report
        </button>
        <table className="stall-admin-req-table">
          <thead>
            <tr>
              <th>Stall Name</th>
              <th>Cuisine Type</th>
              <th>Owner's Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {createdStalls.map((stall) => (
              <tr key={stall.id}>
                <td>{stall.stallName}</td>
                <td>{stall.type}</td>
                <td>{stall.fName}</td>
                <td>{stall.email}</td>
                <td>{stall.phonenumber}</td>
                <td>
                  {stall.payment}
                  <button className="paid-button">Paid</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CreatedStallsAdminView;
