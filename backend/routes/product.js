import express from "express";
import { addProduct, deleteProduct, getAllProduct, updateProduct } from "../controllers/product.js";
import fileUpload from "express-fileupload";


const router = express.Router();

router.post(
  "/addProduct",
  fileUpload({
    createParentPath: true,
  }),
  addProduct
);
router.get("/getAllProduct/:id", getAllProduct);
router.delete('/deleteProduct/:id',deleteProduct);
router.put('editProduct/:id',updateProduct)


export default router;
