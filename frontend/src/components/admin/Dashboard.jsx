import React from 'react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  return (
    <>
    <Link  to="/admin/addProduct">
    <li>Add Product</li>
    </Link>
    <br/>
    <Link  to="/admin/productList">
    <li>Product List</li>
    </Link>
    </>
  )
}

export default Dashboard