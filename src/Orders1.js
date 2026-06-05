import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { useNavigate } from 'react-router'
import { Container, Row, Col, Table } from "react-bootstrap";
import Header from './Header';



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
      .get(`http://localhost:8090/api/orders/user/${currentUser.id}`)
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
              <Header></Header>
            </Col>
          </Row>
        </Container>
      </section>
      <section className="orders-section">
        <Container>
          <h2 className="mb-4">My Orders</h2>

          {orders?.length > 0 ? (
            orders.map((order, index) => (
              <div className="order-card" key={index}>

                <div className="order-header">
                  <div>
                    <h5>Order #{order.id}</h5>
                    <p>Total Amount: ₹{order.totalAmount}</p>
                  </div>

                  <span
                    className={`status-badge ${order.orderStatus === "Delivered"
                        ? "delivered"
                        : order.orderStatus === "Pending"
                          ? "pending"
                          : "processing"
                      }`}
                  >
                    {order.orderStatus}
                  </span>
                </div>

                {order.items?.map((item, i) => (
                  <div className="product-item" key={i}>
                    <img
                      src={`http://localhost:8090/upload/${item.productId.image}`}
                      alt={item.productId.name}
                      className="product-image"
                    />

                    <div className="product-details">
                      <h6>{item.productId.name}</h6>
                      <p>Price: ₹{item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="empty-orders">
              <h4>No Orders Found 😔</h4>
            </div>
          )}
        </Container>
      </section>

    </div>
  )
}

export default Orders1
