import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import LeftNav from './LeftNav'
import { Chart as ChartJS } from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'

const AdminDashboard = () => {
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };
  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col md={3}>
              <LeftNav></LeftNav>
            </Col>
            <Col md={9}>
              
            </Col>
          </Row>
        </Container>
      </section>
    </div >
  )
}

export default AdminDashboard
