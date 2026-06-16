import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Form, Button, Dropdown } from 'react-bootstrap'
import DropdownButton from 'react-bootstrap/DropdownButton';
import snap from './snap.jpeg'
import { TfiBasketball, TfiHelpAlt } from "react-icons/tfi";
import { RiShoppingBag3Line, RiShoppingBasketLine } from "react-icons/ri";
import { LiaOpencart } from "react-icons/lia";
import { CgProfile } from "react-icons/cg";
import { MdArrowOutward, MdManageAccounts } from "react-icons/md";
import { Link, useNavigate } from 'react-router'; // Imported useNavigate for redirecting
import { useDispatch, useSelector } from 'react-redux'
import { logout } from './slices/auth';
import axios from 'axios';
import { FiUser } from "react-icons/fi";
import { HiHeart } from "react-icons/hi";
import { PiAddressBookFill } from "react-icons/pi";
import { IoLogOut } from "react-icons/io5";
import Autosuggest from 'react-autosuggest';

// 1. Text assignment strategy targeting your backend data model properties (Assuming 'name' or 'title')
const getSuggestionValue = suggestion => suggestion.name;

// 2. Custom visual dropdown row blueprint featuring matching live layout data
const renderSuggestion = suggestion => (
  <div style={{ display: 'flex', alignItems: 'center', padding: '8px', cursor: 'pointer' }}>

    <div>
      <div style={{ fontWeight: '500', fontSize: '14px' }}>{suggestion.name}</div>
      {suggestion.price && <small style={{ color: '#888' }}>₹{suggestion.price}</small>}
    </div>
  </div>
);

const Header = () => {
  const [value, setValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); // Filled via your useEffect hook

  const dispatch = useDispatch();
  const navigate = useNavigate(); // Used to redirect to selected products
  const { user: currentUser } = useSelector((state) => state.auth);

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  // 3. Filter criteria querying your cached state memory array safely
  const getFilteredSuggestions = (inputValue) => {
    const cleanQuery = inputValue.trim().toLowerCase();
    console.log(cleanQuery)
    if (cleanQuery.length === 0 || !products) return [];

    return products.filter(product =>
      product.name && product.name.toLowerCase().includes(cleanQuery)


    );
  };

  // 4. Update dropdown options as the user enters characters
  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getFilteredSuggestions(value));
  };

  // 5. Instantly clear suggestion overlay context elements
  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    navigate(`/Product/${suggestion.id}`);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/cats")

      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.log("Error-fetching Categories", error);
      });
  }, [])

  useEffect(() => {
    axios
      .get("http://localhost:8090/api/products")
      .then((res) => {
        setProducts(res.data); // Hydrates filtering matrix memory layout space
      })
      .catch((error) => {
        console.log("Error-fetching Products", error);
      });
  }, [])

  const handleLogout = () => {
    dispatch(logout());
    window.location.reload();
  }

  return (
    <div>
      <section className='free'>
        <Container>
          <Row>
            <Col>
              <div className='fre'>
                <ul>
                  <li><h6>FREE Delivery</h6></li>
                  <li><h6>7Days Easy Returns</h6></li>
                  <li><h6>Best Prices</h6></li>
                </ul>
              </div>
            </Col>
            <Col>
              <div className='our'>
                <ul>
                  <li><Link to={'/sell_on_snapdeal'}><RiShoppingBag3Line /> Sell on Snapdeal</Link></li>
                  <li><Link to={'/help_center'}><TfiHelpAlt /> Help Center</Link></li>
                  <li><Link to={'/our_blog'}><TfiBasketball /> Our Blog</Link></li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='snap'>
        <Container>
          <Row>
            <Col>
              <img src={snap} />
            </Col>
            <Col>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={{ placeholder: 'Type...', value, onChange }}
                onSuggestionSelected={onSuggestionSelected}
              />

            </Col>
            <Col>
              <div className='snap1'>
                <ul>
                  <li><Link to={'/cart'}><LiaOpencart size={30} /> Cart</Link></li>
                  {
                    !currentUser ?
                      <li><Link to={'/login'}><CgProfile /> Login</Link></li>
                      :
                      <li style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
                        <FiUser /> {currentUser?.firstName}
                        <DropdownButton id="dropdown-basic-button">
                          <Dropdown.Item><Link to={'/Account'}><MdManageAccounts /> Account</Link></Dropdown.Item>
                          <Dropdown.Item><Link to={'/Orders1'}><RiShoppingBasketLine /> Orders</Link></Dropdown.Item>
                          <Dropdown.Item><Link to={'/Wishlist'}><HiHeart /> Wishlist</Link></Dropdown.Item>
                          <Dropdown.Item><Link to={'/Address'}><PiAddressBookFill /> Address</Link></Dropdown.Item>
                          <div onClick={handleLogout} className='log'><IoLogOut /> Logout</div>
                        </DropdownButton>
                      </li>
                  }
                </ul>
              </div>
            </Col>
            <Col>
              <Button className='app' variant="primary" size="lg" href='https://play.google.com/store/search?q=snapdeal&c=apps&pli=1'><MdArrowOutward />
                Download App
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
      <section className='cate'>
        <Container fluid>
          <Row>
            <Col>
              <ul>
                {
                  categories ?
                    categories.map((category, index) => {
                      return (
                        <li key={index}><Link to={`/Categorywiseproducts/${category.name}`}><img src={`http://localhost:8090/upload/${category.image}`}/>{category.name}{}</Link></li>
                        
                      )

                    })
                    :
                    "Not Available"
                }

                {/* <li>
                  <h6><Link to={"/Category/Men's Fashion"}><img src="https://g.sdlcdn.com/imgs/l/c/0/mensnavigationwebhome-92990.jpeg"/>
                    Men's Fashion</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Women's Fashion"}><img src="https://g.sdlcdn.com/imgs/l/c/1/WoMen_sitenavne-d9da9.jpeg" />
                    Women's Fashion</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Home & Kitchen"}><img src="https://g.sdlcdn.com/imgs/l/c/1/homesiteiconne-d6c37.jpeg" />
                    Home & Kitchen</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Kid's Fashion"}><img src="https://g.sdlcdn.com/imgs/l/c/1/kidshomeico-c52fa.jpeg" />
                    Kid's Fashion</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Beauty & Health"}><img src="https://g.sdlcdn.com/imgs/l/c/1/Beauty_Site_homene-162a5.jpeg" />
                    Beauty & Health</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Automotives"}><img src="https://g.sdlcdn.com/imgs/l/d/h/Automotive1-56b92.jpg" />
                    Automotives</Link></h6>
                </li>
                <li>
                  <h6><Link to={"/Category/Mobile Accessories"}><img src="https://g.sdlcdn.com/imgs/l/d/h/MobileAccessories1-32874.jpg" />
                    Mobile Accessories</Link></h6>
                </li>
                 <li>
                  <h6><img src="https://g.sdlcdn.com/imgs/l/d/h/elctronic1-cbb06.jpg" />
                    Electronics</h6>
                </li>
                <li>
                  <h6><img src="https://g.sdlcdn.com/imgs/l/d/h/sportsandfitnes1-b8667.jpg" />
                    Sports & Fitness</h6>
                </li> */}
              </ul>
            </Col>
          </Row>
        </Container>
      </section>
    </div >
  )
}

export default Header
