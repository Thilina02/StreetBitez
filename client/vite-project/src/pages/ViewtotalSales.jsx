import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './income.css';
import AdminNavBar from "../components/adminNavBar";
function IncomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [inputTypeOne, setInput1] = useState("");
  const [inputTypeTwo, setInput2] = useState("");
  const [inputTypeThree, setInput3] = useState("");
  const [inputTypeFour, setInput4] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [stall, setStall] = useState([]);
  const [income, setIncome] = useState([]);
  const navigate = useNavigate();

  const updateIncome = (Id) => {
    // Use the navigate function to go to the update income page with the income ID as a parameter
    navigate(`/updateIncome/${Id}`);
  };

  useEffect(() => {
    const fetchAllorder = async () => {
      try {
        const response = await axios.get("http://localhost:8000/order");
        console.log(response);
        setOrder(response.data.order);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAllorder();
  }, []);

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

  useEffect(() => {
    const fetchAllIncome = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getIncome");
        setIncome(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAllIncome();
  }, []);

  const deleteCard = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8000/deleteOrder/${orderId}`);
      navigate("/DeleteCard");
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const deleteIncome = async (Id) => {
    try {
      await axios.delete(`http://localhost:8000/deleteIncome/${Id}`);
      navigate("/DeleteCard");
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  const deleteStall = async (stallId) => {
    try {
      await axios.delete(`http://localhost:8000/stall/deleteStall/${stallId}`);
      navigate("/DeleteCard");
    } catch (error) {
      console.error("Error deleting stall:", error);
    }
  };
  // Function to calculate the subtotal for "Input Type Two" in external incomes
const calculateInputTypeTwoSubtotal = () => {
  const total = income.reduce((acc, incomeItem) => {
    return acc + (parseFloat(incomeItem.inputTypeTwo) || 0);
  }, 0);
  return total;
};

useEffect(() => {
  // Recalculate the "Input Type Two" subtotal whenever the 'income' state changes
  const inputTypeTwoTotal = calculateInputTypeTwoSubtotal();
  setSubtotal(inputTypeTwoTotal);
}, [income]);
//calculate subtotal of input type four
const calculateInputTypefourSubtotal = () => {
  const total = income.reduce((acc, incomeItem) => {
    return acc + (parseFloat(incomeItem.inputTypeFour) || 0);
  }, 0);
  return total;
};

useEffect(() => {
  // Recalculate the "Input Type Two" subtotal whenever the 'income' state changes
  const inputTypeFourTotal = calculateInputTypefourSubtotal();
  setSubtotal(inputTypeFourTotal);
}, [income]);


  useEffect(() => {
    const total = order.reduce((acc, currOrder) => acc + currOrder.total, 0);
    setSubtotal(total);
  }, [order]);

  // Calculate the subtotal for Income from Stalls

  // Function to calculate the total payments from stalls
  const calculateTotalStallPayments = () => {
    return stall.reduce((acc, stallItem) => acc + (parseFloat(stallItem.payment) || 0), 0);
  };

  const totalStallPayments = calculateTotalStallPayments();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send input data to the server
    axios
      .post("http://localhost:8000/Input", {
        inputTypeOne,
        inputTypeTwo,
        inputTypeThree,
        inputTypeFour,
      })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          setSuccessMessage("External income added successfully.");
          setErrorMessage("");
          navigate({
            pathname: `/GetShipping/${response.data._id}`,
          });
        }
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage("Error adding external income.");
        setSuccessMessage("");
      });
  };

  const filteredOrder = order.filter((order) =>
    order.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container my-5 backgr">
           <AdminNavBar />
      <div className="col-md-9">
        <h3 className="underline-bold salesHead" style={{marginLeft:"40vh"}}>Monthly sales</h3>
      
          <h2 className="bold IncHead" style={{marginLeft:"40vh"}}>Total income for company</h2>
          <table className="table table-striped table-bordered custom-table totalIncome" style={{marginLeft:"10vh"}}>
  <thead>
    <tr>
      <th>Total sales from external income</th>
      <th>Total sales from orders</th>
      <th>Total sales from stalls</th>
      <th>Overall sales</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>${calculateInputTypeTwoSubtotal() + calculateInputTypefourSubtotal()}</td>
      <td>${subtotal}</td>
      <td>${totalStallPayments}</td> {/* Assuming this is your total income from stalls */}
      <td>${calculateInputTypeTwoSubtotal() + subtotal + totalStallPayments}</td>
    </tr>
  </tbody>
</table>

<button
              onClick={() => navigate(`/IncomePage`)}
              className="btn btn-primary mr-2  expensesbutt"
              style={{ width: "200px", height: "50px", marginLeft:"40vh"}}
            >
             Back to dashbord
            </button>

          </div>
         
        </div>
     
    
  );
}

export default IncomePage;
