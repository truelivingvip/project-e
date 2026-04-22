import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import axios from "axios";
import { useNavigate } from 'react-router'
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const Success = () => {
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="rounded-2xl shadow-xl">
          {/* <CardContent className="p-8 text-center"> */}
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="flex justify-center mb-4"
          >
            <CheckCircle size={60} className="text-green-500" />
          </motion.div>

          {/* Title */}
          <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>

          {/* Subtitle */}
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order is being processed and will be delivered soon.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-sm text-left">
            {
              orders.map((order, index) => {
                return (
                  <p key={index}>
                    <span className="font-semibold">{order.id}</span>{" "}
                    <span className="font-semibold">{order.status}</span>
                  </p>
                );
              })
            }
          </div>

          {/* Buttons */}
          <div className="flex gap-3">
            <Button className="w-full">Track Order</Button>
            <Button variant="outline" className="w-full">Continue Shopping</Button>
          </div>

        </Card>
      </motion.div>
    </div>
  );

}
export default Success
