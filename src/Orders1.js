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
                      orders?.length>0?(
                      orders.map((order, index) => (
                        <React.Fragment key={index}>
                          <tr key={index}>
                            {/* <td><img src={order.image} className='xyz' /></td> */}
                            <td><h3>Order ID: </h3>{order.id}</td>
                            <td><p>Total:</p>{order.totalAmount}</td>
                            <td><p>Status:</p>{order.orderStatus}</td>
                          </tr>
                        
                        {order.items?.map((item,i)=>(
                          <tr key={i}>
                            <td><img src={item?.productId?.image} alt="product" width="100"/><p>{item?.productId.name}</p></td>
                            <td><p>Price: {item.price}</p></td>
                            <td><p>Quantity: {item.quantity}</p></td>
                          </tr>
                        
                      ))}
                      </React.Fragment>
                      ))
                    ):(
                      <tr>
                        <td colSpan="4">No Orders Found</td>
                      </tr>
                    )
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
