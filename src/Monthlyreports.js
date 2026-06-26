import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

const Monthlyreports = () => {
    let navigate = useNavigate();

    const { user: currentUser } = useSelector((state) => state.auth)
    const[orders,setorders]=useState([])
    const [Monthlyreports, setMonthlyreports] = useState([]);

    useEffect(() => {
        currentUser ?
            console.log(currentUser)
            :
            navigate('/login');
    }, [currentUser]);

    useEffect(() => {
        axios
            .get("http://localhost:8090/api/orders/reports/monthly/2026/6")
            .then((res) => {
                console.log(res.data);
                setMonthlyreports(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);

    return (
        <div>
            <h2>{Monthlyreports.month}</h2>
            <h3>{Monthlyreports.totalAmount}</h3>
            <h4>{Monthlyreports.year}</h4>
            <h5>
                {
                    orders?
                    orders.map((order,index)=>{
                        return(
                            <h2>{order.totalAmount}</h2>
                        )
                    })
                    :"Data Not Found"
                }
            </h5>
        </div>
        
    )
}

export default Monthlyreports
