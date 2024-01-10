import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateExpense() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [updatedExpenseItem, setupdatedExpenseItem] = useState({
    inputExpensesone: "",
    inputExpensesAmount: "",
    inputExpensesTwo: "",
    inputExpensesAmountTwo: "",
    // Add more fields for other income properties
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/espense/getExpenses/${Id}`);
        setupdatedExpenseItem(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setupdatedExpenseItem({ ...updatedExpenseItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/espense/updateExpense/${Id}`, updatedExpenseItem);
      navigate("/Expenses");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container my-5 backgr">
      <div className="col-md-9">
        <h3 className="underline-bold">Update Expense</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Income from:</label>
            <input
              type="text"
              name="inputExpensesone"
              value={updatedExpenseItem.inputExpensesone}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="text"
              name="inputExpensesAmount"
              value={updatedExpenseItem.inputExpensesAmount}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Income from:</label>
            <input
              type="text"
              name="inputExpensesTwo"
              value={updatedExpenseItem.inputExpensesTwo}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="text"
              name="inputExpensesAmountTwo"
              value={updatedExpenseItem.inputExpensesAmountTwo}
              onChange={handleInputChange}
            />
          </div>
          {/* Add more fields for editing other properties of incomeItem */}
          <button type="submit" className="btn-primary">
            Update Income
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateExpense;
