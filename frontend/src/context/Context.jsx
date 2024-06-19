import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
// import form rtk query
import { useGetProductQuery } from '../redux/apiSlice';


const API_BASE_URL = 'http://localhost:5000';
const USER_BASE_URL = '/user';
const PRODUCT_BASE_URL = '/product'

const MainContext = createContext();

const Context = (props) => {

  const [user, setUser] = useState('');

  // get all products
  const {data} = useGetProductQuery()

  const product = data?.product
  const imageBaseUrl = data?.imageBaseUrl


   // get user from localstorage
   useEffect(() => {
    let lsData = localStorage.getItem("user");
    setUser(JSON.parse(lsData));
  }, []);


  return (
    <MainContext.Provider value={{API_BASE_URL,USER_BASE_URL,user,PRODUCT_BASE_URL,product,imageBaseUrl}}>{props.children}</MainContext.Provider>
  )
}

export {MainContext}

export default Context
