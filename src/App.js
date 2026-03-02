import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './AdminDashboard';
import Orders from './Orders';
import Products from './Products';
import Offers from './Offers';
import Sales from './Sales';
import Customers from './Customers';
import Settings from './Settings';
import Categories from './Categories';
import Home from './Home';
import Cart from './Cart';
import Category from './Category';

function App() {
  return (
    <div>
      <Routes>
        <Route path="" element={<Home/>} />
        <Route path="/Home" element={<Home/>} />
        <Route path="/Dashboard" element={<AdminDashboard/>} />
        <Route path="/Orders" element={<Orders/>} />
        <Route path="/Products" element={<Products/>} />
        <Route path="/Offers" element={<Offers/>} />
        <Route path="/Sales" element={<Sales/>} />
        <Route path="/Categories" element={<Categories/>} />
        <Route path="/Settings" element={<Settings/>} />
        <Route path="/Customers" element={<Customers/>} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/Category/:categoryName" element={<Category/>} />
      </Routes>
    </div>
  );
}

export default App;
