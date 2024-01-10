import React, { useState } from 'react';
import axios from 'axios';

function UploadSlip() {
  const [selectedFile, setSelectedFile] = useState(null);

  // Define the function to handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log('Selected File:', file);
    setSelectedFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('slip', selectedFile);

    try {
      const response = await axios.post('http://localhost:8000/upload', formData);
    
      if (response.status === 200) {
        console.log('Slip uploaded successfully');
      } else {
        console.error('Failed to upload slip');
      }
    } catch (error) {
      console.error('Error uploading slip', error);
    }
    
  }

  return (
    <div className="mainDiv">
      <div className="container-fluid">
        <div className="row caaardd">
          <div className="col-md-6 divvv1">
            <div className="line-by-line">
              <strong>Acc No:</strong> 1234566
            </div>
            <div className="line-by-line">
              <strong>Bank name:</strong> Commercial bank
            </div>
            <div className="line-by-line">
              <strong>Name:</strong> Street Bitez
            </div>
          </div>

          <div className="col-md-5 divvv2">
            <h2>Upload Slip</h2>
            <form onSubmit={handleSubmit}>
              <input type="file" name="slip" onChange={handleFileChange} />
              <button type="submit">Upload</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadSlip;
