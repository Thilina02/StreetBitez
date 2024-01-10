import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminNavBar from '../components/adminNavBar';

const UpdateEmployeeShift = () => {
    const navigate = useNavigate();
    const { _id } = useParams();
    const [data, setData] = useState({
        team: '',
        date: '',
        time: '',
        venue: '',
        task: '',
    
    });

    useEffect(() => {
        const getEmployeeShift = async () => {
            try {
                const { data } = await axios.get(`/employee/getEmployeeShift/${_id}`);
                setData({
                    team: data.team,
                    date: data.date,
                    time: data.time,
                    venue: data.venue,
                    task: data.task,
                   
                });
            } catch (error) {
                console.error(error);
            }
        };
        getEmployeeShift();
    }, [_id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const { team, date, time, venue, task } = data;
        try {
            await axios.post(`http://localhost:8000/updateEmployeeShift/${_id}`, {
                team, 
                date, 
                time, 
                venue, 
                task
            });
            navigate('/getEmployeeShift');
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
                            <label htmlFor='team'>Team</label>
                            <select
                                name='team'
                                className='form-control'
                                value={data.team}
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
                            <label htmlFor='name'>Date</label>
                            <input
                                type='date'
                                placeholder='Enter Date'
                                className='form-control'
                                name='date'
                                value={data.date}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='email'>Time</label>
                            <input
                                type='time'
                                placeholder='Enter Time'
                                className='form-control'
                                name='time'
                                value={data.time}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='venue'>ID Number</label>
                            <input
                                type='text'
                                placeholder='Enter Venue'
                                className='form-control'
                                name='venue'
                                value={data.venue}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor='task'>Phone Number</label>
                            <input
                                type='text'
                                placeholder='Enter Task'
                                className='form-control'
                                name='task'
                                value={data.task}
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

export default UpdateEmployeeShift;
