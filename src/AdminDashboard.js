import React, { use, useState } from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap'
import LeftNav from './LeftNav'
import { useDispatch, useSelector } from 'react-redux'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    // legend: {
    //   position: 'top' as const,
    // },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
    },
  },
};


const AdminDashboard = () => {
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

  const [Summary, setSummary] = useState();
  const [chartData, setchartData] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8090/api/orders/chartdata")
      .then((res) => {
        console.log(res.data);
        setchartData(res.data);
      })
      .catch((error) => {
        console.log("Error-fetching Data");
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/orders/reports/summary")
      .then((res) => {
        console.log(res.data);
        setSummary(res.data);
      })
      .catch((error) => {
        console.log("Error-fetching Data");
      });
  }, []);

  return (
    <div>
      <section>
        <Container fluid className="dashboard-bg">
          <Row>
            {/* Sidebar */}
            <Col md={3} className="sidebar-col p-0">
              <LeftNav />
            </Col>

            {/* Main Content */}
            <Col md={7} className="p-4">

              <div className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <p>Welcome Back Admin 👋</p>
              </div>

              {Summary && (
                <Row className="g-4 mb-4">

                  <Col md={4}>
                    <div className="stat-card orders">
                      <h6>Total Orders</h6>
                      <h2>{Summary.totalOrders}</h2>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="stat-card revenue">
                      <h6>Total Revenue</h6>
                      <h2>₹ {Summary.totalRevenue}</h2>
                    </div>
                  </Col>

                  <Col md={4}>
                    <div className="stat-card users">
                      <h6>Total Customers</h6>
                      <h2>{Summary.totalUsers || 0}</h2>
                    </div>
                  </Col>
                </Row>
              )}

              <div className="chart-card">
                <h4>Sales Analytics</h4>

                {chartData ? (
                  <Bar options={options} data={chartData} />
                ) : (
                  "Loading..."
                )}
              </div>

            </Col>
          </Row>
        </Container>
      </section>
    </div >
  )
}

export default AdminDashboard
