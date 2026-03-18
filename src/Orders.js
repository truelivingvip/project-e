import React from 'react'
import { Col, Container, Row, Breadcrumb, Table, Button } from 'react-bootstrap'
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from 'react-router'
import LeftNav from './LeftNav'

const Orders = () => {
    const product = [
        {
            "image": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
            "name": "Essence Mascara Lash Princess",
            "quantity": [1, 2, 3, 4, 5],
            "status": "Change Status"
        },
        {
            "image": "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp",
            "name": "Eyeshadow Palette with Mirror",
            "quantity": [1, 2, 3, 4, 5],
            "status": "Change Status"
        },
        {
            "image": "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp",
            "name": "Powder Canister",
            "quantity": [1, 2, 3, 4, 5],
            "status": "Change Status"
        },
        {
            "image": "https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp",
            "name": "Red Lipstick",
            "quantity": [1, 2, 3, 4, 5],
            "status": "Change Status"
        },

    ]
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col md={3}>
                            <LeftNav></LeftNav>

                        </Col>
                        <Col md={9}>
                            <Row>
                                <Col>
                                    <h2>Orders</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

                                        <Breadcrumb.Item active>Orders</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <Table striped bordered hover>
                                        <thead>
                                            <tr>

                                                <th>Image</th>
                                                <th>Name</th>
                                                <th>Quantity</th>
                                                <th>Status</th>
                                                <th>Actions</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                product.map((product, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td><img src={product.image} className='xyz' /></td>
                                                            <td>{product.name}</td>
                                                            <td>
                                                                <select>
                                                                    {product.quantity.map((qty, i) =>
                                                                        <option key={i} value={qty}>
                                                                            {qty}
                                                                        </option>

                                                                    )
                                                                    }
                                                                </select>
                                                            </td>
                                                            <td>{product.status}</td>
                                                            <td>
                                                                <Link to={'/view'}><Button variant="view"><FaRegEye /></Button></Link>
                                                                <Link><Button variant="delete"><MdDeleteOutline /></Button></Link>
                                                            </td>

                                                        </tr>
                                                    )
                                                }
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Orders
