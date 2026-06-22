import axios from 'axios';
// import { address } from 'framer-motion/client';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
// import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router'
import Header from './Header';

const Address = () => {
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth)
  const [addresses, setAddresses] = useState([]);
  console.log(currentUser)
  useEffect(() => {
    currentUser ?
      console.log(currentUser)
      :
      navigate('/login');
  }, [currentUser]);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/addresses")
      .then((res) => {
        console.log(res.data);
        setAddresses(res.data);
      })
      .catch((error) => {
        console.log("Error-fetching Data");
      });
  }, []);

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
      <section>
        <Container>
          <Row className="mt-4 g-4">
            {addresses?.map((addr, index) => {
              return (
                <Col md={4} key={index}>
                  <div className="snapdeal-address-card">
                    <div className="address-type">
                      {addr.addressType}
                    </div>

                    <h5 className="customer-name">
                      {addr.name}
                    </h5>

                    <p className="address-details">
                      {addr.addressLine1}
                    </p>

                    <p className="address-details">
                      {addr.city}, {addr.state}
                    </p>

                    <p className="address-details">
                      PIN : {addr.pincode}
                    </p>

                    <div className="address-btns">
                      <button className="edit-btn">
                        Edit
                      </button>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Address
