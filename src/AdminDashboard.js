import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import LeftNav from './LeftNav'



const AdminDashboard = () => {
const config = {
  type: 'polarArea',
  data: data,
  options: {}
},
const data = {
  labels: [
    'Red',
    'Green',
    'Yellow',
    'Grey',
    'Blue'
  ]
  return (
    <div>
      <section>
        <Container>
          <Row>
            <Col md={3}>
              <LeftNav></LeftNav>
            </Col>
            <Col md={9}>
              new Chart(ctx, {
                type: 'bar',
              data: {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
              datasets: [{
                label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              borderWidth: 1
      }]
    },
              options: {
                scales: {
                y: {
                beginAtZero: true
        }
      }
    }
  });
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default AdminDashboard
