import React, {use, useState} from 'react'
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
import {Bar} from 'react-chartjs-2';
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
      let navigate=useNavigate();
      const { user: currentUser } = useSelector((state) => state.auth)
      console.log(currentUser)
      useEffect(()=>{
          currentUser && currentUser.roles[0]==="ROLE_ADMIN"?
          console.log(currentUser)
          :
          navigate('/login');
      },[currentUser]);

      const[Summary, setSummary] = useState();
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
        <Container>
          <Row>
            <Col md={3}>
              <LeftNav></LeftNav>
            </Col>
            <Col>
              {
                Summary?
                <h1>{Summary.totalOrders}{Summary.totalRevenue}</h1>
                
                :"Loading ..."
              }
            </Col>
            <Col md={7}>
              {
                chartData ? 

                <Bar options={options} data={chartData} />
                : "Loading ..."
              }
            </Col>
          </Row>
        </Container>
      </section>
    </div >
  )
}

export default AdminDashboard
