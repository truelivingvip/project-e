import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './AdminDashboard';
import Orders from './Orders';
import Products from './Products';
import Offers from './Offers';
import Inventory from './Inventory';
import Sales from './Sales';
import Customers from './Customers';
import Settings from './Settings';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Dashboard" element={<AdminDashboard/>} />
        <Route path="/Orders" element={<Orders/>} />
        <Route path="/Products" element={<Products/>} />
        <Route path="/Offers" element={<Offers/>} />
        <Route path="/Inventory" element={<Inventory/>} />
        <Route path="/Sales" element={<Sales/>} />
        <Route path="/Settings" element={<Settings/>} />
        <Route path="/Customers" element={<Customers/>} />
        
      </Routes>
    </div>
  );
}

export default App;
