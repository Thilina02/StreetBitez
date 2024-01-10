import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate ,useParams} from "react-router-dom";
import './getAllOrderdata.css';
import NavBar from '../components/NavBar';


function GetOrder() {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    const fetchAllorder = async () => {
      try {
        const response = await axios.get("http://localhost:8000/orders");
        console.log(response)
        setOrder(response.data.orders);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAllorder();
  }, []);

  const deleteCard = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/delete/${orderId}`);
      navigate("/DeleteCard");
    } catch (error) {
      console.error("Error deleting order:",error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredorder = order.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="container my-5 backgr" >
      
      <div className="col-md-9">
      <NavBar/>
      <h3 className="underline-bold headdforr">Your all orders</h3>
     
        <table className="table table-striped table-bordered orderTableeeee">
          
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {filteredorder.map((order) => (
              <tr key={order._id}>
                <td>{order.name}</td>
                <td>{order.quantity}</td>
                <td>{order.price}</td>
                <td>{order.total}</td>
                <td>{order.image}</td>
                <td>
                 
                <button
                      onClick={() => deleteCard(order._id)}
                      className="btn btn-primary mr-2 btnForDeleteOrder"
                    >
                      Delete Card
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
        <button
          onClick={() => navigate(`/ReceiptForOrder/${id}`)}
          className="btn btn-primary btn09"
          style={{ marginRight: "-180vh" }}
        >
          Back to payment
        </button>
      </div>
      <div className="right-align-container searchbar" >
        <div className="my-3 searchBar">
          <input
            type="text"
            placeholder="Search by order name"
            className="form-controlll"
            value={searchTerm}
            onChange={handleSearch}

          />
        </div>
        
      </div>
     
    </div>
  );
}

export default GetOrder;
