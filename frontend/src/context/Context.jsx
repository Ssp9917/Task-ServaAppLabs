import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'


const API_BASE_URL = 'http://localhost:5000';
const USER_BASE_URL = '/user';
const PRODUCT_BASE_URL = '/product'

const MainContext = createContext();

const Context = (props) => {

  const [user, setUser] = useState('');
  const [product,setProduct] = useState([])
  const [imageBaseUrl,setImageBaseUrl] = useState('')



  // get all product function
  const getAllProductHandler = ()=>{
    axios.get(API_BASE_URL+PRODUCT_BASE_URL+'/getAllProduct').then(
      (success)=>{
        setProduct(success.data.product)
        setImageBaseUrl(success.data.imageBaseUrl)
      }
    ).catch((err)=>{
      console.log(err)
    })
  }

   // get user from localstorage
   useEffect(() => {
    let lsData = localStorage.getItem("user");
    setUser(JSON.parse(lsData));
    getAllProductHandler()
  }, []);

  console.log(user)


 

  return (
    <MainContext.Provider value={{API_BASE_URL,USER_BASE_URL,user,PRODUCT_BASE_URL,product,getAllProductHandler,imageBaseUrl}}>{props.children}</MainContext.Provider>
  )
}

export {MainContext}

export default Context
