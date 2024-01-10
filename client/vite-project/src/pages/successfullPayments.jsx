import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


function ViewSuccessPayments() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [stall, setStall] = useState([]);
    const [order, setOrder] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllStall = async () => {
            try {
                const response = await axios.get("http://localhost:8000/stall/getAllSuccess");
                setStall(response.data.stall);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchAllStall();
    }, []);

    useEffect(() => {
        const fetchCardById = async (orderId) => {
            if (!orderId) {
                alert("Order ID is not set.");
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8000/orderPayment`);
                setOrder(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };

        fetchCardById(id);
    }, [id]);

    return (
        <div>
            <table className="table table-striped table-bordered custom-table totalIncome">
                <thead>
                    <tr>
                        <th>Stall Id</th>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Stall name</th>
                        <th>Stall type</th>
                        <th>Amount</th>
                        <th>M type</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {stall.map((stallItem) => (
                        <tr key={stallItem._id}>
                            <td>{stallItem.stallId}</td>
                            <td>{stallItem.fName}</td>
                            <td>{stallItem.lName}</td>
                            <td>{stallItem.stallName}</td>
                            <td>{stallItem.type}</td>
                            <td>{stallItem.amount}</td>
                            <td>{stallItem.mType}</td>
                            <td>{stallItem.phonenumber}</td>
                            <td>{stallItem.email}</td>
                            <td>{stallItem.payment}</td>
                            <td>
                                <button
                                    onClick={() => deleteStall(stallItem._id)}
                                    className="btn btn-primary mr-2"
                                >
                                    Delete Card
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="9" className="text-right">
                            <strong>Total Order Payments:</strong>
                        </td>
                    </tr>
                </tfoot>
            </table>

            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Image</th>
                    </tr>
                </thead>
                <tbody>
                {order && Array.isArray(order) && order.map((orderItem) => (
    <tr key={orderItem._id}>
                            <td>{orderItem.name}</td>
                            <td>{orderItem.quantity}</td>
                            <td>{orderItem.price}</td>
                            <td>{orderItem.total}</td>
                            <td>{orderItem.image}</td>
                            <td>
                                <button
                                    onClick={() => deleteCard(orderItem._id)}
                                    className="btn btn-primary mr-2 btnForDeleteOrder"
                                >
                                    Delete Card
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="2" className="text-right">
                            <strong> Sub Total:</strong>
                        </td>
                        <td>${order.total}</td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}

export default ViewSuccessPayments;
