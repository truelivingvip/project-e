import React, {useState} from 'react'
import { Col, Container, Row, Breadcrumb, Card, Button, Table } from 'react-bootstrap'
// import { Link } from 'react-router'
import axios from 'axios';
import LeftNav from './LeftNav'
import { FaRegEye } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useFormik } from 'formik';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router'
import * as Yup from "yup";

const Products = () => {
    const [categories, setProducts] = useState();
        const [selectedImages, setSelectedImages] = useState([]);
    const ProductSchema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        price: Yup.number().required("number is required"),
        categories: Yup.string().required("at_least one option is required"),
    });
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
    useEffect(() => {
        axios
            .get("http://localhost:8090/api/products")
            .then((res) => {
                console.log(res.data);
                setProducts(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);
    const product = [
        {
            "id": 1,
            "title": "Essence Mascara Lash Princess",
            "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            "category": "beauty",
            "price": 9.99,
            "discountPercentage": 10.48,
            "rating": 2.56,
            "stock": 99,
            "tags": [
                "beauty",
                "mascara"
            ],
            "brand": "Essence",
            "sku": "BEA-ESS-ESS-001",
            "weight": 4,
            "dimensions": {
                "width": 15.14,
                "height": 13.08,
                "depth": 22.99
            },
            "warrantyInformation": "1 week warranty",
            "shippingInformation": "Ships in 3-5 business days",
            "availabilityStatus": "In Stock",
            "reviews": [
                {
                    "rating": 3,
                    "comment": "Would not recommend!",
                    "date": "2025-04-30T09:41:02.053Z",
                    "reviewerName": "Eleanor Collins",
                    "reviewerEmail": "eleanor.collins@x.dummyjson.com"
                },
                {
                    "rating": 4,
                    "comment": "Very satisfied!",
                    "date": "2025-04-30T09:41:02.053Z",
                    "reviewerName": "Lucas Gordon",
                    "reviewerEmail": "lucas.gordon@x.dummyjson.com"
                },
                {
                    "rating": 5,
                    "comment": "Highly impressed!",
                    "date": "2025-04-30T09:41:02.053Z",
                    "reviewerName": "Eleanor Collins",
                    "reviewerEmail": "eleanor.collins@x.dummyjson.com"
                }
            ],
            "returnPolicy": "No return policy",
            "minimumOrderQuantity": 48,
            "meta": {
                "createdAt": "2025-04-30T09:41:02.053Z",
                "updatedAt": "2025-04-30T09:41:02.053Z",
                "barcode": "5784719087687",
                "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
            },
            "images": [
                "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"
            ],
            "thumbnail": "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp"
        }


    ]
    const formik = useFormik({
        initialValues: {
            ProductName: '',
            price: '',
            categories: '',
            image: '',

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
                                    <h2>Products</h2>
                                    <Breadcrumb>
                                        <Breadcrumb.Item><Link to={'/Dashboard'}>Dashboard</Link></Breadcrumb.Item>

                                        <Breadcrumb.Item active>Products</Breadcrumb.Item>
                                    </Breadcrumb>
                                    <Table striped bordered hover>
                                        <tbody>
                                            {
                                                products ?
                                                    product.map((product, index) => {
                                                        return (
                                                            <tr key={index}>

                                                                <td><img src={product.thumbnail} className='xyz' /></td>
                                                                <td>{product.title}</td>
                                                                <td>{product.price}</td>
                                                                <td><Link to={'/edit'}><Button variant="edit"><FaEdit /></Button></Link>
                                                                    <Link><Button variant="delete"><MdDeleteOutline /></Button></Link>
                                                                    <Link to={'/view'}><Button variant="view"><FaRegEye /></Button></Link></td>

                                                            </tr>
                                                        )
                                                    }
                                                    )
                                                    : "Data not found"
                                            }
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={2}>
                            <div className='add'>
                                <h2>Add Product</h2>
                                <Formik
                                    initialValues={{
                                        name: "",
                                        price: "",
                                        categories: "",
                                        image: null
                                    }}
                                    validationSchema={ProductSchema}
                                    onSubmit={(values) => {
                                        console.log("Form Data:", values);
                                    }}
                                >

                                    {({ setFieldValue, values, errors, touched }) => (
                                        <Form>
                                            <Row>
                                                <Col>
                                                    <label htmlFor="name" className="category">
                                                        Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        placeholder="Enter product name"
                                                    />
                                                    <ErrorMessage
                                                        name="name"
                                                        component="p"
                                                        style={{ color: "red" }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <label htmlFor="price" className='category'>
                                                        Price
                                                    </label>
                                                    <Field
                                                        type="number"
                                                        name="price"
                                                    />
                                                    <ErrorMessage
                                                        name="price"
                                                        component="p"
                                                        style={{ color: "red" }}
                                                    />
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <label htmlFor="categories" className='category'>
                                                        Categories
                                                    </label>
                                                    <Field as="select" name="categories">
                                                        <option value="">Select Category</option>
                                                        <option value="men's fashion">Men's Fashion</option>
                                                    </Field>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col>
                                                    <label htmlFor="image" >Image</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={(event) => {
                                                            setFieldValue("image", event.currentTarget.files[0]);
                                                        }}
                                                    />
                                                    {errors.image && touched.image && <p>{errors.image}</p>}
                                                </Col>
                                            </Row>
                                            <button type="submit" className="button">
                                                Add
                                            </button>
                                            {console.log("Values:", values)}
                                            {console.log("Errors:", errors)}
                                        </Form>
                                    )}
                                </Formik>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div >
    )
}

export default Products
