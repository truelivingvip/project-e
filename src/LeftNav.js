import React from 'react'
import { Col, Container, Row, Navbar, Nav } from 'react-bootstrap'
import pixel from './pixel-logo.png'
import { Link } from 'react-router'
import { CiHome } from "react-icons/ci";
import { MdOutlineShoppingBag } from "react-icons/md";
import { BiBasketball } from "react-icons/bi";
import { CiDiscount1 } from "react-icons/ci";
import { MdOutlineInventory2 } from "react-icons/md";
import { GrDocumentPerformance } from "react-icons/gr";
import { MdOutlineContacts } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";


// import './App.css';
const LeftNav = () => {
    return (
        <div>
            <section className='pix'>
                <Container>
                    <Row>
                        <Col>
                            <div className='pix1'>
                                <img src={pixel} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='order'>
                                <ul>
                                    <li><Link to={'/dashboard'}><CiHome />Dashboard</Link></li>
                                    <li><Link to={'/orders'}><MdOutlineShoppingBag />Orders</Link></li>
                                    <li><Link to={'/products'}><BiBasketball />Products</Link></li>
                                    <li><Link to={'/offers'}><CiDiscount1 />Offers</Link></li>
                                    <li><Link to={'/inventory'}><MdOutlineInventory2 />Inventory</Link></li>
                                    <li><Link to={'/sales'}><GrDocumentPerformance />Sales</Link></li>
                                    <li><Link to={'/customer'}><MdOutlineContacts />Customers</Link></li>
                                    <li><Link to={'/setting'}><IoSettingsOutline />Settings</Link></li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default LeftNav
