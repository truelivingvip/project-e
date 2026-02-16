import React from 'react'
import { Col, Container, Row, Breadcrumb, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import LeftNav from './LeftNav'
import { useFormik } from 'formik'
const Categories = () => {
    const categories = [
        {
            "title": "Home & Living",
            "image": "https://i5.walmartimages.com/asr/b38c79ec-09a3-4c23-b88d-9aa6eda2db4e.cca72575f78129850e104c54fa8206b7.jpeg"
        },
        {
            "title": "Clothing & Shoes",
            "image": "https://i5.walmartimages.com/seo/Kricely-Men-s-Trail-Running-Shoes-Fashion-Walking-Hiking-Sneakers-Men-Tennis-Cross-Training-Shoe-Outdoor-Snearker-Mens-Casual-Workout-Footwear-Tie-dy_b4edf81c-4a0e-494f-ab8f-5310ea0dc80d.102205b429f8869dc851a8dc5c548ced.jpeg"
        },
        {
            "title": "Toys & Entertainment",
            "image": "https://th.bing.com/th/id/OIP.WAJVvxoRwo1VeMY-VwNTOAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
        },
    ]
    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
        },
        onSubmit: values => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <div>
            <section>
                <Container>
                    <Row>
                        <Col md={3}>
                            <LeftNav></LeftNav>

                        </Col>
                        <Col md={7}>
                            <Row>
                                <Col>
                                    <h2>Categories</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

                                        <Breadcrumb.Item active>Categories</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <div className='pro'>
                                        <h1>Product Category Section</h1>
                                    </div>
                                </Col>
                            </Row>
                            <Row>
                                {
                                    categories.map((categorie, index) => {
                                        return (
                                            <Col>
                                                <Card style={{ width: '18rem' }}>
                                                    <Card.Img variant="top" src={categorie.image} />
                                                    <Card.Body>
                                                        <Card.Title>{categorie.title}</Card.Title>
                                                        <Button variant="primary">Shop Now</Button>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        )
                                    }
                                    )
                                }
                            </Row>
                            <Row>
                                <Col>


                                </Col>
                            </Row>
                        </Col>
                        <Col md={2}>
                            <div className='add'>
                                <h3>Add Categorie</h3>
                                <form onSubmit={formik.handleSubmit}>
                                    <Row>
                                        <Col>
                                            <label htmlFor="firstName" className='category'>Categorie Name</label>
                                            <input
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                onChange={formik.handleChange}
                                                value={formik.values.firstName}
                                            />
                                            {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <label htmlFor="lastName">Image</label>
                                            <input
                                                id="lastName"
                                                name="lastName"
                                                type="file"
                                                accept='image/*'
                                                onChange={formik.handleChange}
                                                value={formik.values.lastName}
                                            />
                                            {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}
                                        </Col>
                                    </Row>
                                    <button type="submit">Add</button>
                                </form>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

export default Categories
