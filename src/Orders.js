import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Breadcrumb, Table, Button } from 'react-bootstrap'
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from 'react-router'
import LeftNav from './LeftNav'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'

const Orders = () => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth)
    console.log(currentUser)
    useEffect(() => {
        currentUser && currentUser.roles[0] === "ROLE_ADMIN" ?
            console.log(currentUser)
            :
            navigate('/login');
    }, [currentUser]);
    const [orders, setOrders] = useState();
    useEffect(() => {
        axios
            .get("http://localhost:8090/api/orders")
            .then((res) => {
                console.log(res.data);
                setOrders(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);
    // const product = [
    //     {
    //         "image": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
    //         "name": "Essence Mascara Lash Princess",
    //         "quantity": [1, 2, 3, 4, 5],
    //         "status": "Change Status"
    //     },
    //     {
    //         "image": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
    //         "name": "Eyeshadow Palette with Mirror",
    //         "quantity": [1, 2, 3, 4, 5],
    //         "status": "Change Status"
    //     },
    //     {
    //         "image": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
    //         "name": "Powder Canister",
    //         "quantity": [1, 2, 3, 4, 5],
    //         "status": "Change Status"
    //     },
    //     {
    //         "image": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
    //         "name": "Red Lipstick",
    //         "quantity": [1, 2, 3, 4, 5],
    //         "status": "Change Status"
    //     },

    // ]
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col md={3}>
                            <LeftNav></LeftNav>
                        </Col>

                        <Col md={8}>
                            <Table striped bordered hover>
                                <thead>
                                    {/* <tr>

            <th>Image</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Actions</th>

          </tr> */}
                                </thead>
                                <tbody>

                                    {
                                        orders?.length > 0 ? (
                                            orders.map((order, index) => (
                                                <React.Fragment key={index}>
                                                    <tr key={index}>
                                                        {/*<td><img src={`http://localhost:8090/upload/${order.productId.image}`} className='xyz' /></td> */}
                                                        <td><h3>Order ID: </h3>{order.id}</td>
                                                        <td><p>Total:</p>{order.totalAmount}</td>
                                                        <td><p>Status:</p>{order.orderStatus}</td>
                                                    </tr>

                                                    {order.items?.map((item, i) => (
                                                        <tr key={i}>
                                                            <td>
                                                                <img src={`http://localhost:8090/upload/${item.productId.image}`} alt="product" width="100" />
                                                                <p>{item?.productId.name}</p></td>
                                                            <td><p>Price: {item.price}</p></td>
                                                            <td><p>Quantity: {item.quantity}</p></td>
                                                        </tr>
                                                    ))}
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4">No Orders Found</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={1}>
                        </Col>
                    </Row>
                </Container>
            </section>

        </div>
    )
}

export default Orders
