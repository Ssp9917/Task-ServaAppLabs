import React, { useContext } from 'react'
import { MainContext } from '../../context/Context'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProductList = () => {

  const {product,imageBaseUrl,API_BASE_URL,PRODUCT_BASE_URL,getAllProductHandler,productEditHandler} = useContext(MainContext)

  
  const deleteProductHandler = (id) => {
    axios.delete(API_BASE_URL+PRODUCT_BASE_URL+'/deleteProduct/'+id).then(
      (success)=>{
        alert(success.data.success)
        getAllProductHandler()
      }
    ).catch((err)=>{
      console.log(err)
    })

  }

  return (
    <div className="relative overflow-x-auto ">
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400  ">
        <thead className="text-xs border border-gray-600 text-black uppercase bg-gray-200 shadow-[inset_0_0_8px_rgba(0,0,0,0.6)]">
            <tr>
                <th scope="col" className="px-6 py-3">
                    S.No
                </th>
                <th scope="col" className="px-6 py-3">
                    Image
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
      {
        product.map(
            (d,i)=>{
                console.log(API_BASE_URL+imageBaseUrl+d.image)
                return(
                    <tbody className='' key={i}>
                    <tr className="bg-gray-50 border-b  dark:border-gray-700">
                        <td className="px-6 py-4 text-black ">
                            {i+1}
                        </td>
                        <th scope="row" className="px-6 py-4 font-medium text-black whitespace-nowrap">
                            <img className='w-16' src={API_BASE_URL+imageBaseUrl+d.image} alt="img" />
                        </th>
                        <td className="px-6 py-4 text-black ">
                            {d.name}
                        </td>
                        <td className="px-6 py-4 text-black ">
                            ₹{d.price}
                        </td>
                        <td className="px-6 py-4">
                            <div className=" flex gap-2">
                                <div className=" flex gap-2 cursor-pointer text-black ">
                                    <div onClick={()=>{deleteProductHandler(d._id)}} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </div>
                                   <Link to='/admin/editProduct'>
                                   <div onClick={productEditHandler(d._id)} >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </div>
                                   </Link>
                                </div>
                            </div>
                        </td>
                    </tr>

                </tbody>
                )
            }
        )
      }
    </table>

</div>
  )
}

export default ProductList