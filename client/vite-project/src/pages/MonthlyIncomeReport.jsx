import React, { useState, useEffect } from 'react';
import axios from 'axios';

function MonthlyIncomeReport() {
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  useEffect(() => {
    calculateMonthlyIncome();
  }, []);

  const calculateMonthlyIncome = async () => {
    try {
      const response = await axios.get('./stall/generateMonthlyIncomeReport', { responseType: 'blob' });

      // Calculate monthly income here (if you need to display it)
      // In this example, we assume the calculation is done on the server-side
      // You can parse the response data to extract relevant information if needed

      setMonthlyIncome(0); // Set the monthly income based on your calculation logic
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button onClick={calculateMonthlyIncome}>Generate Monthly Income Report</button>
      <div>
        <p>Monthly Income: {monthlyIncome} LKR</p>
        <a href="/generateMonthlyIncomeReport" download="monthly_income_report.pdf">
          Download Monthly Income Report
        </a>
      </div>
    </div>
  );
}

export default MonthlyIncomeReport;
