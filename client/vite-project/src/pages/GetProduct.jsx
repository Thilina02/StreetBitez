import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import './GetProduct.css';

function GetProduct() {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    axios.get('/stall/getProduct') 
    .then((result) => {       
        const dataWithIds = result.data;
        setProduct(dataWithIds);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdate = (id) => {
    // Fetch the product details by ID
    axios.get(`/stall/getProduct/${id}`)
      .then((result) => {
        const productData = result.data;
        // Check if the product data exists
        if (productData) {
          // Navigate to the update page with the product data
          navigate(`/update/${id}`, { state: { product: productData } });
        } else {
          console.log('Product not found');
        }
      })
      .catch((err) => console.log(err));
  };


  const handleDelete = (id) => {
    axios.delete(`/stall/deleteProduct/${id}`) // Use the correct route URL
        .then(res => {
            console.log(res);
            window.location.reload();
        })
        .catch(err => console.log(err));
}

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center'>
  <div className='w-100 bg-white rounded p-3'>
    <div className='table-responsive'>
      <table className='table table-striped table-bordered'>
        <thead className='thead-dark'>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.map(product => {
            return <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.description}</td>
              <td>
                            
              <Link to={`/update/${product._id}`} className="btn btn-success">UPDATE</Link>

                <button className='btn btn-danger btn-sm' 
                  onClick={(e) => handleDelete(product._id)}>DELETE
                </button>
              </td>
            </tr>
          })
        }
        </tbody>
      </table>
    </div>
  </div>
</div>

  );
}

export default GetProduct;
