import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './expenses.css';

import AdminNavBar from "../components/adminNavBar";
function ExpensesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [inventory, setInventory] = useState([]);
  const [expense, setExpense] = useState([]);
  const [inputExpensesone, setInput1] = useState("");
  const [inputExpensesAmount, setInput2] = useState("");
  const [inputExpensesTwo, setInput3] = useState("");
  const [inputExpensesAmountTwo, setInput4] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const updateExpense = (Id) => {
    navigate(`/updateExpense/${Id}`);
  };

  useEffect(() => {
    const fetchAllInventory = async () => {
      try {
        const response = await axios.get("http://localhost:8000/inventory/getallItems");
        setInventory(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAllInventory();
  }, []);

  const deleteInventory = async (Id) => {
    try {
      await axios.delete(`http://localhost:8000/inventory/deleteInv/${Id}`);
      navigate("/deleteInventory");
    } catch (error) {
      console.error("Error deleting inventory:", error);
    }
  };

  const deleteExpense = async (Id) => {
    try {
      await axios.delete(`http://localhost:8000/espense/deleteExpense/${Id}`);
      navigate("/deleteInventory");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send input data to the server
    axios
      .post("http://localhost:8000/espense/addexpenses", {
        inputExpensesone,
        inputExpensesAmount,
        inputExpensesTwo,
        inputExpensesAmountTwo,
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
        setErrorMessage("Enter only digits to amount");
        setSuccessMessage("");
      });
  };

  useEffect(() => {
    const fetchAllExpense = async () => {
      try {
        const response = await axios.get("http://localhost:8000/espense/getExpenses");
        setExpense(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchAllExpense();
  }, []);

  // Calculate the sum of inputExpensesAmount
  const totalInputExpensesAmount = expense.reduce((acc, expenseItem) => {
    return acc + parseFloat(expenseItem.inputExpensesAmount);
  }, 0);

  // Calculate the sum of inputExpensesAmountTwo
  const totalInputExpensesAmountTwo = expense.reduce((acc, expenseItem) => {
    return acc + parseFloat(expenseItem.inputExpensesAmountTwo);
  }, 0);
  // Calculate the sum of external expenses amounts
  const totalExternalExpenses = expense.reduce((acc, expenseItem) => {
    return acc + parseFloat(expenseItem.inputExpensesAmount) + parseFloat(expenseItem.inputExpensesAmountTwo);
  }, 0);

  return (
    <div className="container my-5 backgr">
       <AdminNavBar />
      <div className="col-md-9">
        <h3 className="underline-bold expenseHead">Monthly expenses</h3>
        <div className="inputs">
          <p style={{ textAlign: "left", fontWeight: "bold", fontStyle: "italic" }}>
            Add external expenses
          </p>
          <div className="inputTypes">
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter expense"
                value={inputExpensesone}
                onChange={(e) => setInput1(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter amount"
                value={inputExpensesAmount}
                onChange={(e) => setInput2(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter expense"
                value={inputExpensesTwo}
                onChange={(e) => setInput3(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Enter amount"
                value={inputExpensesAmountTwo}
                onChange={(e) => setInput4(e.target.value)}
              />
            </div>
          </div>
          <button type="submit" className="btn-primary externalBtn" onClick={handleSubmit}>
            Add external expense
          </button>
          {/* Display success and error messages */}
          {successMessage && <p className="text-success">{successMessage}</p>}
          {errorMessage && <p className="text-danger">{errorMessage}</p>}
        </div>
        <h2 className="bold IncHead">Inventory Expenses</h2>
        <table className="table table-striped table-bordered custom-table invExpenses">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Reorder</th>
              <th>Item code</th>
              <th>Category</th>
              
            </tr>
          </thead>
          <tbody>
            {inventory.map((inventoryItem) => (
              <tr key={inventoryItem._id}>
                <td>{inventoryItem.name}</td>
                <td>{inventoryItem.description}</td>
                <td>{inventoryItem.quantity}</td>
                <td>{inventoryItem.reorder}</td>
                <td>{inventoryItem.itemcode}</td>
                <td>{inventoryItem.category}</td>
               
                <td>
                  <button onClick={() => deleteInventory(inventoryItem._id)} className="btn btn-primary mr-2" style={{width:"10vh"}}>
                    Delete 
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2 className="bold IncHead">External expenses</h2>
        <table className="table table-striped table-bordered custom-table invExpenses">
          <thead>
            <tr>
              <th>Income from</th>
              <th>Amount</th>
              <th>Income from</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {expense.map((expenseItem) => (
              <tr key={expenseItem._id}>
                <td>{expenseItem.inputExpensesone}</td>
                <td>{expenseItem.inputExpensesAmount}</td>
                <td>{expenseItem.inputExpensesTwo}</td>
                <td>{expenseItem.inputExpensesAmountTwo}</td>
                <td>
                  <button onClick={() => deleteExpense(expenseItem._id)} className="btn btn-primary mr-2" style={{width:"10vh"}}>
                    Delete 
                  </button>
                  <button onClick={() => updateExpense(expenseItem._id)} className="btn btn-primary mr-2 incomeUpdate">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="1" className="text-right">
                <strong>Total amount:</strong>
              </td>
              <td>{totalInputExpensesAmount}</td>
              <td colSpan="1" className="text-right">
                
              </td>
              <td>{totalInputExpensesAmountTwo}</td>
            </tr>
          </tfoot>
        </table>
        <h2 className="bold IncHead">Overall expenses for the company</h2>

          <table className="table table-striped table-bordered custom-table invExpenses">
  <thead>
    <tr>
      <th>Total expense from external income</th>
      <th>Total income from inventory</th>
      <th>Overall Expense</th>
      
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{totalExternalExpenses}</td>
      
    </tr>
  </tbody>
</table>
<button
              onClick={() => navigate(`/admin-dashbord`)}
              className="btn btn-primary mr-2  expensssbutt"
              style={{ width: "200px", height: "50px" }}
            >
              Back to dashboard
            </button>
      </div>
    </div>
  );
}

export default ExpensesPage;
