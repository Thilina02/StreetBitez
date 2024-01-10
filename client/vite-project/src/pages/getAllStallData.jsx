import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import "./getAllStallData.css";
import NavBar from '../components/NavBar';
function Getstall() {
  const [isLoading, setIsLoading] = useState(true);
  const [stall, setStall] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchAllstall = async () => {
      try {
        const response = await axios.get("http://localhost:8000/stall/getAllStall");
        setStall(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAllstall();
  }, []);

  const deleteCard = async (stallId) => {
    try {
      await axios.delete(`http://localhost:8000/stall/deleteStall/${stallId}`, {
        withCredentials: true, // Include credentials (cookies) in the request
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the stall items by stallId that match the search term
  const filteredStall = stall.filter((stallItem) => stallItem.stallId.toString().includes(searchTerm));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container my-5 bacgr " style={{width:"500vh"}}>
      
      <div className="col-md-9">
      <NavBar/>
      <div className="my-3 searchBar">
          <input
            type="text"
            placeholder="Search by stall ID"
            className="form-controlll"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <h3 className="underline-bold">Your all stall payments</h3>
        
        <div className="allstall">
       
       
        
      
          <table className="table table-striped table-bstalled ">
            <thead>
              <tr>
                <th>Stall Id</th>
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
              {filteredStall.map((stallItem) => (
                <tr key={stallItem._id}>
                  <td>{stallItem.stallId}</td>
                  <td>{stallItem.fName}</td>
                  <td>{stallItem.lName}</td>
                  <td>{stallItem.stallName}</td>
                  <td>{stallItem.type}</td>
                  <td>{stallItem.amount}</td>
                  <td>{stallItem.mType}</td>
                  <td>{stallItem.phonenumber}</td>
                  <td>{stallItem.email}</td>
                  <td>{stallItem.payment}</td>
                  <td>
                    <button onClick={() => deleteCard(stallItem._id)} className="btn btn-primary mr-2 btnForDelete">
                      Delete Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={() => navigate(`/ReceiptForStall/${id}`)} className="btn btn-primary btn7">Ok</button>
      </div>
      
    </div>
  );
}

export default Getstall;
