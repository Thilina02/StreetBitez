import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './SalesStallll.css';
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter the stall items by stall ID that match the search term
  const filteredStall = stall.filter((stallItem) =>
    stallItem.stallId.toString().includes(searchTerm)
  );



  return (
    <div className="container my-5 backgr" style={{ width:"290vh"}}>
        <AdminNavBar />
      <div className="col-md-9">
        <h3 className="underline-bold salesHead">Monthly sales from stalls</h3>
        <div className="my-3 searchBar">
          <input
            type="text"
            placeholder="Search by stall ID"
            className="form-controlll"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
       
         
          <table className="table table-striped table-bordered custom-table SalesStallll" style={{ marginLeft:"10vh"}}>
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
              {filteredStall.map((stallItem, index) => (
                <tr key={index}>
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
                    <button
                      onClick={() => deleteStall(stallItem._id)}
                      className="btn btn-primary mr-2" style={{ width:"10vh"}}
                    >
                      Delete Card
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="9" className="text-right">
                  <strong>Total Stall Payments:</strong>
                </td>
                <td>${totalStallPayments}</td>
              </tr>
            </tfoot>
          </table>
         
<button
              onClick={() => navigate(`/IncomePage`)}
              className="btn btn-primary mr-2  expensesbutt"
              style={{ width: "200px", height: "50px" }}
            >
             Back to dashbord
            </button>

          </div>
         
        </div>
      
  );
}

export default IncomePage;
