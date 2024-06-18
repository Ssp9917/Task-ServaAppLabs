import React, { useContext, useState } from 'react'
import { MainContext } from '../../context/Context';
import { FileUploader } from "react-drag-drop-files";
import axios from 'axios';

const AddProduct = () => {

    const {PRODUCT_BASE_URL,API_BASE_URL,getAllProductHandler} = useContext(MainContext)

    // file drop related
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    // console.log(file)
    setFile(file);
  };

// product submit api
const productSubmitHandler = (e) =>{

    e.preventDefault()

    const formData = new FormData();
    formData.append("name",e.target.name.value);
    formData.append("price",e.target.price.value);
    formData.append("description",e.target.description.value);
    formData.append("image",file);
    formData.append("qty",e.target.qty.value);;



    axios.post(API_BASE_URL+PRODUCT_BASE_URL+'/addProduct',formData).then(
      (success)=>{

       alert("Product added successfull")
       getAllProductHandler()
      }
    ).catch(
      (err)=>{
        console.log(err)
      }
    )
  }


  return (
    <div>
    <div className=' flex justify-center items-center '>
         <form onSubmit={productSubmitHandler}>
        <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
            <div className="">
                <h1 className='text-center text-white text-xl mb-4 font-bold'>Add Product</h1>
            </div>
            <FileUploader handleChange={handleChange} name="file"  />
            <div>
                <input type="text"
                    
                    name='name'
                    className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product title'
                />
            </div>
            <div>
                <input type="text"
                
                    name='price'
                    className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product price'
                />
            </div>
            <div>
                <input type="text"
                
                    name='description'
                    className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product description'
                />
            </div>
            <div>
                <input type="number"
                
                    name='qty'
                    className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                    placeholder='Product qty'
                />
            </div>

        
            
            <div className=' flex justify-center mb-3'>
           
                <button
                   type='submit'
                    className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                    Add Product
                      
                </button>
              
            </div>
         
        </div>

        </form>
    </div>
</div>
  )
}

export default AddProduct