import axios from 'axios';
import { address } from 'framer-motion/client';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Address = () => {
  let navigate = useNavigate();
  const {user : currentUser} = useSelector((state) => state.auth)
  const [Address, setAddress] = useState();
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
                setAddress(res.data);
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
            {
              address.map((address,index))
            }
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Address
