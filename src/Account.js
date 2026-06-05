import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { FaBox } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from 'react-router';
import { LiaCreditCardSolid } from "react-icons/lia";
import Header from './Header';

const Account = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col>
              <Header></Header>
            </Col>
          </Row>
        </Container>
      </section>
      
      <section className="account-page">
        <Container>
          <Row className="justify-content-center">
            <Col md={8}>
              <div className="profile-card">
                <FaUserCircle className="profile-icon" />
                <h3>Hello, {currentUser?.firstName}</h3>
                <p>{currentUser?.email}</p>
              </div>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={4}>
              <Link to="/orders" className="account-link">
                <div className="option-card">
                  <FaBox className="card-icon" />
                  <h5>My Orders</h5>
                </div>
              </Link>
            </Col>

            <Col md={4}>
              <Link to="/wishlist" className="account-link">
                <div className="option-card">
                  <FaHeart className="card-icon" />
                  <h5>Wishlist</h5>
                </div>
              </Link>
            </Col>

            <Col md={4}>
              <Link to="/address" className="account-link">
                <div className="option-card">
                  <FaMapMarkerAlt className="card-icon" />
                  <h5>Addresses</h5>
                </div>
              </Link>
            </Col>
            <Col md={4}>
              <Link to="/payments" className="account-link">
                <div className="option-card">
                  <LiaCreditCardSolid className="card-icon" />
                  <h5>Payments</h5>
                </div>
              </Link>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Account