import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router'


const Shop = () => {
    const dispatch = useDispatch();
    let navigate=useNavigate();
    const { user: currentUser } = useSelector((state) => state.auth)
    console.log(currentUser)
    useEffect(()=>{
        currentUser && currentUser.roles[0]==="ROLE_ADMIN"?
        console.log(currentUser)
        :
        navigate('/login');
    },[currentUser]);
  return (
    <div>
      <h1>Shop Now</h1>
    </div>
  )
}

export default Shop
