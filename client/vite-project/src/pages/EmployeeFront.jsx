import axios from "axios";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import your CSS file
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';


function EmployeeFront() {
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8074/employee')
      .then(result => setEmployee(result.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    axios.get("http://localhost:8074/employeeshift")
      .then(result => setTodos(result.data))
      .catch(err => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:8074/deleteEmployee/${id}`)
      .then(res => {
        console.log(res);
        setEmployee(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleEdit = (id) => {
    axios.put(`http://localhost:8074/employeeshiftupdate/${id}`)
      .then(result => {
        // Reload the todos after editing
        axios.get("http://localhost:8074/employeeshift")
          .then(result => setTodos(result.data))
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }

  const teams = ['TeamA', 'TeamB', 'TeamC', 'TeamD', 'TeamE'];

  const filteredEmployees = employee.filter(employee =>
    (employee.team.toLowerCase().includes(searchQuery.toLowerCase()) || !searchQuery) &&
    (selectedTeam === '' || employee.team === selectedTeam)
  );

  return (
    <div>
      <div className='container'>
        <div className='row justify-content-center align-items-center'>
          <div className='col-md-8'>
            <div className="mb-3">
              <input
                type="text"
                placeholder="Search by Team"
                className="form-control mb-3"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <select
                className="form-control"
                value={selectedTeam}
                onChange={(e) => setSelectedTeam(e.target.value)}
              >
                <option value="">All Teams</option>
                {teams.map((team, index) => (
                  <option key={index} value={team}>
                    {team}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="row">
              {filteredEmployees.map((employee) => (
                <div className="col-md-4 mb-3" key={employee._id}>
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">{employee.name}</h5>
                      <p className="card-text">Email: {employee.email}</p>
                      <p className="card-text">ID Number: {employee.idNumber}</p>
                      <p className="card-text">Phone Number: {employee.phoneNumber}</p>
                      <p className="card-text">Team: {employee.team}</p>
                      {employee.photo && (
                        <div className="rounded-circle">
                          <img
                            src={`http://localhost:8074/${employee.photo}`}
                            alt="Employee"
                            className="card-img-top rounded-circle"
                          />
                        </div>
                      )}
                      <Link to={`/update/${employee._id}`} className='btn btn-success mr-2'>Update</Link>
                      <button className='btn btn-danger' onClick={() => handleDelete(employee._id)}>Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5">
        <h2 className="mb-4">Todo List</h2>
        
        {todos.length === 0 ? (
          <div>
            <h2>No Record</h2>
          </div>
        ) : (
          <ul className="list-group">
            {todos.map((todo) => (
              <li key={todo._id} className="list-group-item d-flex align-items-center">
                <div className="flex-grow-1" onClick={() => handleEdit(todo._id)}>
                  <div className="form-check">
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      {todo.done ? <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill> : <BsCircleFill className="icon" />}
                    </label>
                  </div>
                  <p className={todo.done ? "line_through" : ""}>{todo.team}</p>
                  <p className={todo.done ? "line_through" : ""}>{todo.date}</p>
                  <p className={todo.done ? "line_through" : ""}>{todo.time}</p>
                  <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                </div>
                <div>
                  <button className="btn btn-danger">
                    <BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EmployeeFront;
