import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


export default function DriverAdmin() {
  const [driversList, setDriversList] = useState([]);
  const [filteredDriversList, setFilteredDriversList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  useEffect(() => {
    // Fetch driver data from the backend API
    fetch('http://localhost:8000/drivers/getDrivers')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch drivers data');
        }
        return response.json();
      })
      .then((data) => {
        setDriversList(data);
        setFilteredDriversList(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query === "") {
      setFilteredDriversList([...driversList]);
    } else {
      const filtered = driversList.filter((driver) =>
        driver.username.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDriversList(filtered);
    }
  };
  const generatePDFReport = () => {
    const doc = new jsPDF();
    doc.text('Drivers Report', 15, 10);
  
    const headers = [['Username', 'Email', 'Mobile', 'NIC', 'Province', 'Gender']];
    const data = filteredDriversList.map((driver) => [
      driver.username,
      driver.email,
      driver.mobile,
      driver.nic,
      driver.province,
      driver.gender,
    ]);
    console.log(filteredDriversList);
    doc.autoTable({
      head: headers,
      body: data,
      startY: 20,
      theme: 'grid', // 'striped', 'grid', 'plain'
      margin: { top: 15 },
      styles: {
        overflow: 'linebreak',
        fontSize: 10,
      },
    });
  
    doc.save('drivers_report.pdf');
  };
  // Handle delete driver item
  const handleDeleteDriverItem = () => {
    if (selectedDriverId) {
      fetch(`http://localhost:8000/drivers/deleteDriver/${selectedDriverId}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to delete driver item');
          }
          const updatedList = driversList.filter((driver) => driver._id !== selectedDriverId);
          setDriversList(updatedList);
          setFilteredDriversList(updatedList);
          setShowDeleteModal(false);
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <div className="pb-5 row" style={{ width: '1280px' }}>
      <div className="container-fluid mt-5 col-12" style={{ minWidth: '100%' }}>
        <div className="row justify-content-between mb-4" >
          <div className="col-8 text-center">
            <div className='row'>
              <div className='col-8'>
                <h2 className=''>Admins Dashboard</h2>
              </div>
            </div>
          </div>
          <button className="btn btn-primary col-3  btn-sm mx-1 my-2" onClick={generatePDFReport}>
            Generate a Report
          </button>
          <div className="col-4">
            <div className="input-group">
              <input
                type="search"
                className="form-control"
                placeholder="Search Driver"
                aria-label="Search Driver"
                aria-describedby="search-button"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className="input-group-append">
                <button
                  className="btn btn-primary"
                  type="button"
                  id="search-button"
                >
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">NIC</th>
              <th scope="col">Province</th>
              <th scope="col">Gender</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDriversList.map((driver) => (
              <tr key={driver._id}>
                <td>{driver.username}</td>
                <td>{driver.email}</td>
                <td>{driver.mobile}</td>
                <td>{driver.nic}</td>
                <td>{driver.province}</td>
                <td>{driver.gender}</td>
                <td>
                  <Link to={`/driver-update/${driver._id}`}>
                    <button className="btn btn-success btn-sm mx-1">
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </Link>
                  <button
                    className="btn btn-danger btn-sm mx-1"
                    onClick={() => {
                      setSelectedDriverId(driver._id);
                      setShowDeleteModal(true);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {error && <div className="alert alert-danger">{error}</div>}
      </div>
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this driver?
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDeleteDriverItem}>
            Delete
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
