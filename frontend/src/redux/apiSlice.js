import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // get all product
    getProduct: builder.query({
      query: () => "/product/getAllProduct",
      providesTags: ["Products"],
    }),

    // add product logic
    addProduct: builder.mutation({
      query: (product) => ({
        url: "/product/addProduct",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["Products"],

      async onQueryStarted(product, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getProduct", undefined, (draft) => {
            console.log(draft);
            // draft.pop({...product})
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),

    // delete product logic
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/deleteProduct/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],

      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          api.util.updateQueryData("getProduct", undefined, (product) => {
            console.log(product)
            const taskIndex = product.findIndex((el) => el._id == id);
            product.splice(taskIndex, 1);
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),


    // update product logic
    updateProduct: builder.mutation({
        query:({id,...updatedProduct})=>({
            url:`/product/editProduct/${id}`,
            method:"PUT",
            body:updatedProduct
        }),
        invalidatesTags:["Products"],

        // async onQueryStarted(
        //     {id,...updateProduct},
        //     {dispatch,queryFulfilled},

        // ){
        //     const patchResult = dispatch(
        //         api.util.updateQueryData('getProduct',undefined,(product)=>{
        //             const productIndex = product.findIndex((el)=>el._id==id);
        //             product[productIndex]= {...product[productIndex],updateProduct}
        //         })
        //     )

        //     try {
        //         await queryFulfilled;
        //     } catch (error) {
        //         patchResult.undo()
        //     }
        // }
    })
  }),
});

export const {
  useGetProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} = api;
