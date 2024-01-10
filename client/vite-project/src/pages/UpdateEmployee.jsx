import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from '../components/adminNavBar';

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        idNumber: '',
        phoneNumber: '',
        team: '',
        password: '',
        cPassword: '',
    });

    useEffect(() => {
        const getEmployee = async () => {
            try {
                const { data } = await axios.get(`/employee/getEmployee/${_id}`);
                setFormData({
                    name: data.name,
                    email: data.email,
                    idNumber: data.idNumber,
                    phoneNumber: data.phoneNumber,
                    team: data.team,
                    password: data.password,
                    cPassword: data.cPassword,
                });
            } catch (error) {
                console.error(error);
            }
        };
        getEmployee();
    }, [_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { name, email, idNumber, phoneNumber, team, password, cPassword } = formData;
        try {
            await axios.post(`/employee/updateEmployee/${_id}`, {
                name,
                email,
                idNumber,
                phoneNumber,
                team,
                password,
                cPassword,
            });
            navigate('/getEmployee');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className=''>
            <AdminNavBar />
            <div className='d-flex vh-100 justify-content-center align-items-center'>
                <div className='w-50 bg-white rounded p-3'>
                    <form onSubmit={handleUpdate}>
                        <h2>Update Employee</h2>
                        <div className='mb-2'>
                            <label htmlFor='name'>Name</label>
                            <input
                                type='text'
                                placeholder='Enter Name'
                                className='form-control'
                                name='name'
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='email'>Email</label>
                            <input
                                type='email'
                                placeholder='Enter Email'
                                className='form-control'
                                name='email'
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='idNumber'>ID Number</label>
                            <input
                                type='text'
                                placeholder='Enter ID Number'
                                className='form-control'
                                name='idNumber'
                                value={formData.idNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input
                                type='number'
                                placeholder='Enter Phone Number'
                                className='form-control'
                                name='phoneNumber'
                                value={formData.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='team'>Team</label>
                            <select
                                name='team'
                                className='form-control'
                                value={formData.team}
                                onChange={handleChange}
                            >
                                <option value='teamA'>Team A</option>
                                <option value='teamB'>Team B</option>
                                <option value='teamC'>Team C</option>
                                <option value='teamD'>Team D</option>
                                <option value='teamE'>Team E</option>
                            </select>
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='password'>Password</label>
                            <input
                                type='password'
                                placeholder='Enter Password'
                                className='form-control'
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='cPassword'>Confirm Password</label>
                            <input
                                type='password'
                                placeholder='Confirm Password'
                                className='form-control'
                                name='cPassword'
                                value={formData.cPassword}
                                onChange={handleChange}
                            />
                        </div>
                        <button className='btn btn-success'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateEmployee;
