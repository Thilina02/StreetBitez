import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './receiptForStall.css'
import { useReactToPrint } from 'react-to-print';

function ReceiptForStall() {
  const componentPdf = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [stall, setStall] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();
//there is an error shud take a look this later
  useEffect(() => {
    const fetchStallById = async (stallId) => {
      try {
        const response = await axios.get(`http://localhost:8000/stall/fetchStall/${stallId}`);
        setStall(response.data.stall);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchStallById(id);
  }, [id]);

  const generatePDF = useReactToPrint({
    content: () => componentPdf.current,
    documentTitle: 'Userdata',
    onAfterPrint: () => alert("Data saved in PDF")
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Get the current date in the format "September 29, 2023"
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="bgh-img">
      <div ref={componentPdf} style={{ width: '100%' }}>
        {/* Center the table */}
        <div className="text-center mx-uto" style={{ width: '80%' }}>
          <h1>Transaction receipt</h1>
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
          <table className="table">
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
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right"><strong>Total:</strong></td>
                <td>${stall.total}</td>
              </tr>
            </tfoot>
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
         onClick={() => navigate(`/GetAllStallData`)}
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
