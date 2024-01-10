import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import './UpdateProduct.css';

function UpdateProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/stall/getProduct/${id}`)
      .then((result) => {
        const dataWithIds = result.data;
        if (dataWithIds && dataWithIds.name && dataWithIds.price && dataWithIds.description) {
          setProduct(dataWithIds);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`/stall/update/${id}`, product) // Use axios.put to send a PUT request with the updated product data
      .then((result) => {
        console.log(result);
        navigate('/StallOwnerDashboard');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="upcard">
              <div className="card-body">
                <h2 className="text-center">Update Product</h2>
                <form onSubmit={handleUpdate}>
                  <div className="form-group">
                    <label htmlFor="name">Product Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter Product Name"
                      value={product.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="price">Price:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="price"
                      name="price"
                      placeholder="Enter Price"
                      value={product.price}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="description">Description:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="description"
                      name="description"
                      placeholder="Enter Description"
                      value={product.description}
                      onChange={handleInputChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block"
                  >
                    UPDATE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
