import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './receiptForStall.css'
import { useReactToPrint } from 'react-to-print';
import NavBar from '../components/NavBar';
function ReceiptForStall() {
  const componentPdf = useRef();
  const [stall, setStall] = useState({
    sName: '',
    type: '',
    fName: '',
    lName: '',
    email: '',
    phone: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStallById = async (stallId) => {
      try {
        const response = await axios.get(`http://localhost:8000/stall/fetchStall/${stallId}`);
        setStall(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchStallById(id);
    }
  }, [id]);

  const generatePDF = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: 'Userdata',
    onAfterPrint: () => alert("Data saved in PDF")
  });

  // Get the current date in the format "September 29, 2023"
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bgh-img">
            <NavBar/>
      <div ref={componentPdf} style={{ width: '100vh' }}>
        {/* Center the table */}
        <div className="text-center mx-auto stallComp" style={{ width: '100vh' }}>
          {/* Center the header text */}
          <h1 className="heeeed" style={{ textAlign: 'center', width: '100vh' }}>Transaction receipt</h1>
          <div className="invoice-numb">
            <strong>Invoice Number:</strong> INV-2023-001<br />
            <strong>Invoice Date:</strong> {currentDate}<br/>
          </div>
          <div className="companyDet">
            <strong>Street Bitez</strong><br />
            <strong>Street Address:</strong> 123 Main St, Colombo 01, StreetBitez<br />
            <strong>Country:</strong> Sri Lanka<br />
            <strong>City:</strong> Colombo<br />
            <strong>Email:</strong> StreetBitez@gmail.com
          </div>
          <table className="tabe">
            <thead >
              <tr>
               
                <th>First name</th>
                <th>Last name</th>
                <th>Stall name</th>
                <th>Stall type</th>
                <th>Amount</th>
                <th>M type</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                 
                  <td>{stall.fName}</td>
                  <td>{stall.lName}</td>
                  <td>{stall.stallName}</td>
                  <td>{stall.type}</td>
                  <td>{stall.amount}</td>
                  <td>{stall.mType}</td>
                  <td>{stall.phonenumber}</td>
                  <td>{stall.email}</td>
                  <td>{stall.payment}</td>
              </tr>
            </tbody>
           
          </table>
        </div>
        <p>Questions? Contact us at +123-456-7890 or StreetBitez@gmail.com</p>
      </div>
      <div className="btn-group mt-4">
      <button
         onClick={() => navigate(`/PaymentMethod/${id}`)}
        className="btn btn-primary btn1"
      >
      Pay now
      </button>
      <button
         onClick={() => navigate(`/GetAllStallData/${id}`)}
        className="btn btn-primary btn1"
      >
      View all your registered stalls
      </button>
        
        <button onClick={generatePDF} className="btn btn-primary btn2">Save as PDF</button>
      </div>
    </div>
  );
}

export default ReceiptForStall;
