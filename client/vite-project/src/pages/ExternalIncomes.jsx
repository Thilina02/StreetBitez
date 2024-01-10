import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './ExternalIncomes.css';
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
        <h3 className="underline-bold salesHead">Monthly sales</h3>
        <div className="inputsForEXTERNAL">
          <p style={{ textAlign: "left", fontWeight: "bold", fontStyle: "italic" }}>
            Add external sales
          </p>
          <div className="inputTypes">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter where the sales comes from"
                value={inputTypeOne}
                onChange={(e) => setInput1(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter amount"
                value={inputTypeTwo}
                onChange={(e) => setInput2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter where the sales comes from"
                value={inputTypeThree}
                onChange={(e) => setInput3(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter amount"
                value={inputTypeFour}
                onChange={(e) => setInput4(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary externalBtn" onClick={handleSubmit}>
            Add external sales
          </button>
          {/* Display success and error messages */}
          {successMessage && <p className="text-success">{successMessage}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
       
          <h2 className="bold IncHead">External Sales</h2>
          <table className="table table-striped table-bordered custom-table totalIncome" style={{marginLeft:"10vh",marginTop:"2vh"}}>
            <thead>
              <tr>
                <th>Income from</th>
                <th>Amount</th>
                <th>Income from</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {income.map((incomeItem) => (
                <tr key={incomeItem._id}>
                  <td>{incomeItem.inputTypeOne}</td>
                  <td>{incomeItem.inputTypeTwo}</td>
                  <td>{incomeItem.inputTypeThree}</td>
                  <td>{incomeItem.inputTypeFour}</td>
                  <td>
                    <button
                      onClick={() => deleteIncome(incomeItem._id)}
                      className="btn btn-primary mr-2"
                      style={{width:"13vh", height:"7vh"}}
                    >
                      Delete Card
                    </button>
                    <button
                    onClick={() => updateIncome(incomeItem._id)}
                    className="btn btn-primary mr-2 externInc"
                    style={{width: "13vh", height:"7vh"}}
                  >
                    Edit
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="1" className="text-right">
                  <strong> Sub Total:</strong>
                </td>
                <td>${calculateInputTypeTwoSubtotal()}</td>
                <td colSpan="1" className="text-right">
                  
                </td>
                <td>${calculateInputTypefourSubtotal()}</td>
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
