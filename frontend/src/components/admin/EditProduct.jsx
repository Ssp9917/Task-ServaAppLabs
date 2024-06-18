import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import { useParams } from "react-router-dom";
import axios from "axios"

const EditProduct = () => {
  const { productEditHandler } = useContext(MainContext);

  const [editProduct, setEditProduct] = useState();

  const { id } = useParams();

  const {API_BASE_URL,PRODUCT_BASE_URL} = useContext(MainContext)

  //findSingle Product details
  useEffect(() => {
    axios
      .get(API_BASE_URL + PRODUCT_BASE_URL + "/" + id)
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <div className=" flex justify-center items-center ">
        <form >
          <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
            <div className="">
              <h1 className="text-center text-white text-xl mb-4 font-bold">
                Edit Product
              </h1>
            </div>
            {/* <FileUploader handleChange={handleChange} name="file" /> */}
            <div>
              <input
                type="text"
                name="name"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product title"
              />
            </div>
            <div>
              <input
                type="text"
                name="price"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product price"
              />
            </div>
            <div>
              <input
                type="text"
                name="description"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product description"
              />
            </div>
            <div>
              <input
                type="number"
                name="qty"
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product qty"
              />
            </div>

            <div className=" flex justify-center mb-3">
              <button
                type="submit"
                className=" bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg"
              >
                Save Product
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
