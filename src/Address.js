import axios from 'axios';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

const Address = () => {
  let navigate = useNavigate();
  const {user : currentUser} = useSelector((state) => state.auth)
  console.log(currentUser)
  useEffect(() => {
    currentUser ?
    console.log(currentUser)
    :
    navigate('/login');
  }, [currentUser]);
  
  useEffect(() => {
    axios
    .get("http://localhost:8090/api/addresses")
    .then((res) => {
                console.log(res.data);
                setCategories(res.data);
            })
            .catch((error) => {
                console.log("Error-fetching Data");
            });
    }, []);
  })
  return (
    <div>
      
    </div>
  )
}

export default Address
