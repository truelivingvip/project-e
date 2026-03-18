import React from 'react'
import { Col, Row, Container, Carousel } from 'react-bootstrap'
import Header from './Header'
const Home = () => {
  const deal = [
    {
      "title":"Watches",
      "description":"MIN.50% OFF",
      "images":"https://g.sdlcdn.com/imgs/a/b/c/feedConfig/Watches17thMar26DODytrew.jpg?q=40"
    },
    {
      "title":"Sarees",
      "description":"MIN.50% OFF",
      "images":"https://g.sdlcdn.com/imgs/a/b/c/feedConfig/Sarees17thMar26DODytrew.jpg?q=40"
    },
    {
      "title":"Salwar suits",
      "description":"MIN.60% OFF",
      "images":"https://g.sdlcdn.com/imgs/a/b/c/feedConfig/SalwarSuits17thMar26DODytrew.jpg?q=40"
    },
    {
      "title":"Designer"
    }
  ]
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
      <section>
        <Container fluid>
          <Row>
            <Col>
              <Carousel data-bs-theme="dark">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/Mentees_HPMNT22NdFeb26ytrr.jpg?q=40"
                    alt="First slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/Saree_HPMNT22NdFeb26ytrr.jpg?q=40"
                    alt="Second slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/CasualShirts_HPMNT22NdFeb26ytrr.jpg?q=40"
                    alt="Third slide"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="https://g.sdlcdn.com/imgs/a/b/c/feedConfig/KurtaSets_HPMNT22NdFeb26ytrr.jpg?q=40"
                    alt="Fourth slide"
                  />
                </Carousel.Item>
              </Carousel>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='delivery'>
        <Container fluid>
          <Row>
            <Col>
              <a href='#'><img src='https://g.sdlcdn.com/imgs/a/b/c/feedConfig/freedeliverystripwebupdated.jpg'/></a>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='deal'>
        <Container>
          <Row>
            <Col>
              <h1>Deal Of The Day</h1>
            </Col>
          </Row>
          <Row>
            <Col>

            </Col>
          </Row>
        </Container>
      </section>
    </div>
  )
}

export default Home
