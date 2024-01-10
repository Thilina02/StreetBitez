import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function UpdateIncome() {
  const navigate = useNavigate();
  const { Id } = useParams();
  const [updatedIncomeItem, setUpdatedIncomeItem] = useState({
    inputTypeOne: "",
    inputTypeTwo: "",
    inputTypeThree: "",
    inputTypeFour: "",
    // Add more fields for other income properties
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getIncome/${Id}`);
        setUpdatedIncomeItem(response.data); // Update the state with the fetched data
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedIncomeItem({ ...updatedIncomeItem, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/updateIncome/${Id}`, updatedIncomeItem);
      navigate("/IncomePage");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container my-5 backgr">
      <div className="col-md-9">
        <h3 className="underline-bold">Update Income</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Income from:</label>
            <input
              type="text"
              name="inputTypeOne"
              value={updatedIncomeItem.inputTypeOne}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="text"
              name="inputTypeTwo"
              value={updatedIncomeItem.inputTypeTwo}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Income from:</label>
            <input
              type="text"
              name="inputTypeThree"
              value={updatedIncomeItem.inputTypeThree}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Amount:</label>
            <input
              type="text"
              name="inputTypeFour"
              value={updatedIncomeItem.inputTypeFour}
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

export default UpdateIncome;
