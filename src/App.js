import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <div>
      <AdminDashboard></AdminDashboard>
    </div>
  );
}

export default App;
