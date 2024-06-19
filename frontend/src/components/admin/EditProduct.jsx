import React, { useContext, useEffect, useState } from "react";
import { MainContext } from "../../context/Context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import { useUpdateProductMutation } from "../../redux/apiSlice";

const EditProduct = () => {
  const { API_BASE_URL, PRODUCT_BASE_URL, getAllProductHandler } =
    useContext(MainContext);

  const [editProduct, setEditProduct] = useState();

  const { id } = useParams();

  const [updateProduct] = useUpdateProductMutation();

  //findSingle Product details
  useEffect(() => {
    axios
      .get(API_BASE_URL + PRODUCT_BASE_URL + "/getAllProduct/" + id)
      .then((success) => {
        setEditProduct(success.data.product);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };


  // product edit function
  const productEditHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("price", e.target.price.value);
    formData.append("description", e.target.description.value);
    formData.append("image", file);
    formData.append("qty", e.target.qty.value);

    updateProduct({ id, formData });
  };

  return (
    <div>
      <div className=" flex justify-center items-center ">
        <form onSubmit={productEditHandler}>
          <div className=" bg-gray-800 px-10 py-10 rounded-xl ">
            <div className="">
              <h1 className="text-center text-white text-xl mb-4 font-bold">
                Edit Product
              </h1>
            </div>
            <FileUploader handleChange={handleChange} name="file" />
            <div>
              <input
                type="text"
                name="name"
                value={editProduct?.name}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, name: e.target.value })
                }
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product title"
              />
            </div>
            <div>
              <input
                type="text"
                name="price"
                value={editProduct?.price}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, price: e.target.value })
                }
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product price"
              />
            </div>
            <div>
              <input
                type="text"
                name="description"
                value={editProduct?.description}
                onChange={(e) =>
                  setEditProduct({
                    ...editProduct,
                    description: e.target.value,
                  })
                }
                className=" bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none"
                placeholder="Product description"
              />
            </div>
            <div>
              <input
                type="number"
                name="qty"
                value={editProduct?.qty}
                onChange={(e) =>
                  setEditProduct({ ...editProduct, qty: e.target.value })
                }
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
