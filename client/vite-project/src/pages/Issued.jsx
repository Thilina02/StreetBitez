import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import AdminNavBar from '../components/adminNavBar';
//import './Issued.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';


export default function Issued() {
    const [stalls, setStalls] = useState([]);

    useEffect(() => {
        const fetchItemList = async () => {
          try {
            
                const { data } = await axios.get('/stall/getIssuedStalls');
                console.log(data)
                setStalls(data);
          } catch (error) {
            console.error(error);
            toast.error('Failed to fetch inventory data');
            //setIsLoading(false);
          }
        };
    
        fetchItemList();
      }, []);

    return (
        <div><AdminNavBar />
        
        <div className="dihan-issued-container">
            
            <Link to="/IssueEntry" className="dihan-add-new-button">Add New</Link>
            {stalls.map((item, index) => (
            <div className="dihan-card-h-100">

                <div className="dihan-card-body">
                    <h5 className="dihan-card-title">{item.stallId}</h5>
                    <p className="dihan-card-text">{item.stallName}</p>
                </div>
                <div className="dihan-card-footer">
                      <Link to={`/IssuedDetails/${item.stallId}`} className="btn btn-primary">
            View Stall
          </Link> 
                </div>
            </div>
               ))}
        </div>
        </div>
    );



}
