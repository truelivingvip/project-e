import React from 'react'
import { useParams } from 'react-router'

const Category = () => {
    const {categoryName}=useParams()
  return (
    <div>
      <h1>{categoryName}</h1>
    </div>
  )
}

export default Category
