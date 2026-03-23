import React from 'react'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'

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

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [100,150,120,180],
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: [100,110,120,50],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
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

  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col md={3}>
              <LeftNav></LeftNav>
            </Col>
            <Col md={9}>
              <Bar options={options} data={data} />
            </Col>
          </Row>
        </Container>
      </section>
    </div >
  )
}

export default AdminDashboard
