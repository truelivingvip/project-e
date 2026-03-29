import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { Col, Container, Row, Breadcrumb, Card, Button } from "react-bootstrap";
// import { Link } from 'react-router'
import LeftNav from "./LeftNav";
// import { useFormik } from 'formik'
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { MdDeleteOutline } from "react-icons/md";
import { color } from "chart.js/helpers";

const Categories = () => {
    const [categories, setCategories] = useState();
    const [selectedImages, setSelectedImages] = useState([]);
    const CateSchema = Yup.object().shape({
        name: Yup.string().required("categorie Name is required*"),
        // image: Yup.mixed().required("image is required*"),
    });
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth);
    console.log(currentUser);
    useEffect(() => {
        currentUser && currentUser.roles[0] === "ROLE_ADMIN"
            ? console.log(currentUser)
            : navigate("/login");
    }, [currentUser]);
    useEffect(() => {
        axios
            .get("http://localhost:8090/api/cats")
            .then((res) => {
                console.log(res.data);
                setCategories(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);
    const handleFileChange = (e) => {
        setSelectedImages(e.target.files);
    };
    // const categories = [
    //     {
    //         "title": "Men's Fashion",
    //         "image": "https://tse4.mm.bing.net/th/id/OIP.knE7EgYQC-pcBGHZeLiVEgAAAA?rs=1&pid=ImgDetMain&o=7&rm=3"
    //     },
    //     {
    //         "title": "Women's Fashion",
    //         "image": "https://th.bing.com/th/id/OIP.IHrRasAUbKQrzDI1uDgexQHaLH?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
    //     },
    //     {
    //         "title": "Home & Kitchen",
    //         "image": "https://tse3.mm.bing.net/th/id/OIP.AJ1jhYu23jZcW0-l7lRvJAHaHa?rs=1&pid=ImgDetMain&o=7&rm=3"
    //     },
    //     {
    //         "title": "Home & Living",
    //         "image": "https://i5.walmartimages.com/asr/b38c79ec-09a3-4c23-b88d-9aa6eda2db4e.cca72575f78129850e104c54fa8206b7.jpeg"
    //     },
    //     {
    //         "title": "Clothing & Shoes",
    //         "image": "https://i5.walmartimages.com/seo/Kricely-Men-s-Trail-Running-Shoes-Fashion-Walking-Hiking-Sneakers-Men-Tennis-Cross-Training-Shoe-Outdoor-Snearker-Mens-Casual-Workout-Footwear-Tie-dy_b4edf81c-4a0e-494f-ab8f-5310ea0dc80d.102205b429f8869dc851a8dc5c548ced.jpeg"
    //     },
    //     {
    //         "title": "Toys & Entertainment",
    //         "image": "https://th.bing.com/th/id/OIP.WAJVvxoRwo1VeMY-VwNTOAHaHa?o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3"
    //     },
    // ]
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
                                    categories ?
                                        categories.map((categorie, index) => {
                                            return (
                                                <Col>
                                                    <Card style={{ width: '18rem' }} className="img-container">
                                                        <Card.Img variant="top" src={`http://localhost:8090/upload/${categorie.image}`} />
                                                        <Button variant="delete" className="delete-btn"><MdDeleteOutline color="pink" className="delete-icon"/></Button>
                                                        <Card.Body>
                                                            <Card.Title>{categorie.name}</Card.Title>
                                                            {/* <Button variant="primary">Shop Now</Button> */}
                                                        </Card.Body>
                                                    </Card>
                                                </Col>
                                            )
                                        }
                                        )
                                        : "Data not found"
                                }
                            </Row>
                        </Col>
                        <Col md={2}>
                            <div className='add'>
                                <h3>Add Categorie</h3>
                                <Formik
                                    initialValues={{
                                        categorieName: "",
                                        image: null
                                    }}
                                    validationSchema={CateSchema}
                                    onSubmit={async (values, { resetForm }) => {
                                        const formData = new FormData();

                                        //   formData.append("userId", currentUser.id);

                                        Object.keys(values).forEach((key) => {
                                            formData.append(key, values[key]);
                                        });

                                        // for (let i = 0; i < selectedImages.length; i++) {
                                        formData.append("file", selectedImages[0]);
                                        // }

                                        try {
                                            const res = await axios.post(
                                                "http://localhost:8090/api/cats",
                                                formData,
                                                {
                                                    headers: {
                                                        "Content-Type": "multipart/form-data",
                                                    },
                                                },
                                            );
                                            console.log("Upload success:", res.data);
                                            alert("Category added successfully!");
                                            resetForm();
                                            setSelectedImages([]);
                                        } catch (err) {
                                            console.error("Upload failed:", err);
                                            alert("Failed to add category");
                                        }
                                    }}
                                >
                                    {({ setFieldValue, values, errors, touched }) => (
                                        <Form>
                                            <Row>
                                                <Col>
                                                    <label htmlFor="categorieName" className="category">
                                                        Categorie Name
                                                    </label>
                                                    <Field
                                                        type="text"
                                                        name="name"
                                                        placeholder="Enter categorie name"
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
                                                    <label htmlFor="image">Image</label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handleFileChange}
                                                    />
                                                    {selectedImages.length > 0 && (
                                                        <div>{selectedImages.length} image selected</div>
                                                    )}
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
        </div>
    );
};

export default Categories;
