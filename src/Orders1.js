import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { useNavigate } from 'react-router'
import { Container, Row, Col, Table } from "react-bootstrap";



const Orders1 = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { user: currentUser } = useSelector((state) => state.auth)
  console.log(currentUser)
  useEffect(() => {
    currentUser ?
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
  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col>
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
                    orders ?
                      orders.map((order, index) => {
                        return (
                          <tr key={index}>
                            {/* <td><img src={order.image} className='xyz' /></td> */}
                            <td>{order.id}</td>
                            <td>{order.totalAmount}</td>
                            <td>{order.paymentStatus}</td>
                          </tr>
                        )
                      }
                      )
                      : "NotFound"
                  }
                </tbody>
              </Table>
            </Col>
          </Row>
        </Container>
      </section>

    </div>
  )
}

export default Orders1
