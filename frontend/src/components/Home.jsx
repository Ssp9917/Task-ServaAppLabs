import React, { useContext } from 'react'
import ProductBox from './ProductBox'
import { MainContext } from '../context/Context'

const Home = () => {

  const {product} = useContext(MainContext)


  return (
    <div className='flex flex-wrap'>
    {
      product.map((d,i)=>{
        return(
          <ProductBox {...d} key={i}/>
        )
      })
    }
    </div>
  )
}

export default Home