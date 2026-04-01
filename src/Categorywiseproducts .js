import React, { useState } from 'react'
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react'


const Categorywiseproducts = () => {
    const { categoryName } = useParams();
    const [products, setProducts]=useState([]);
    useEffect(() => {
        axios
            .get(`http://localhost:8090/api/products/category/${categoryName}`)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);
    return (
        <div>
            <h1>{categoryName}</h1>
        </div>
    )
}

export default Categorywiseproducts 
