import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import './receiptForOrder.css';
import { useReactToPrint } from 'react-to-print';
import NavBar from '../components/NavBar';
function ReceiptForOrder() {
  const componentPdf = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState({});
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchCardById = async (orderId) => {
      if(!orderId){
        alert("order id is not casting")
      }
      try {
        const response = await axios.get(`http://localhost:8000/orderss/${orderId}`);
        setOrder(response.data.order);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchCardById(id);
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

  const printStyles = `
    @media all {
      .page-break {
        display: none;
      }
    }

    @media print {
      html, body {
        height: initial !important;
        overflow: initial !important;
        -webkit-print-color-adjust: exact;
      }
    }

    @media print {
      .page-break {
        margin-top: 1rem;
        display: block;
        page-break-before: auto;
      }
    }

    @page {
      size: auto;
      margin: 20mm;
    }
    backgroundCol{
      width:50vh;
    }
  `;

  return (
    <div className="bgh-img">
      <div className="backgroundCol">
      <NavBar/>
        <style>{printStyles}</style> 
        <div ref={componentPdf} style={{ width: '100%' }}>
          {/* Center the table */}
          <div className="text-center mx-auto stallComp" style={{ width: '80%' }}>
            <h1 className="heed">Transaction receipt</h1>
            <div className="invoice-numbb">
              <strong>Invoice Number:</strong> INV-2023-001<br />
              <strong>Invoice Date:</strong> {currentDate}<br/>
            </div>
            <div className="companyDett">
              <strong>Street Bitez</strong><br />
              <strong>Street Address:</strong> 123 Main St, Colombo 01, StreetBitez<br />
              <strong>Country:</strong> Sri Lanka<br />
              <strong>City:</strong> Colombo<br />
              <strong>Email:</strong> StreetBitez@gmail.com
            </div>
            <div className="OrderTab">
              <table className="tabe">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Image</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{order.name}</td>
                    <td>{order.quantity}</td>
                    <td>{order.price}</td>
                    <td>{order.date}</td>
                    <td>{order.status}</td>
                    <td>
                      {/* Display the image */}
                      {order.image && (
                        <img
                          src={`data:${order.image.contentType};base64,${order.image.data}`}
                          alt="Order Image"
                          style={{ maxWidth: "100px", maxHeight: "100px" }}
                        />
                      )}
                    </td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2" className="text-right"><strong> Sub Total:</strong></td>
                    <td>${order.total}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <p>Questions? Contact us at +123-456-7890 or StreetBitez@gmail.com</p>
        </div>
        <div className="btn-group mt-4">
          <button onClick={() => navigate(`/PaymentMethod/${id}`)} className="btn btn-primary btn1">Pay now</button>
          <button onClick={() => navigate(`/GetAllOrderData/${id}`)} className="btn btn-primary btn1">View all order details</button>
          <button onClick={generatePDF} className="btn btn-primary btn2">Save as PDF</button>
        </div>
      </div>
    </div>
  );
}

export default ReceiptForOrder;
