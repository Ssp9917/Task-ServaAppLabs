import Product from "../models/product.js";

export const addProduct = async (req, res) => {
  try {
    const { name, description, qty, price } = req.body;
    const image = req.files.image;

    // console.log(req.files.image);

    // console.log(name, description, qty, image, price);

    // file related code start
    const imageName =
      new Date().getTime() + Math.floor(Math.random() * 1000) + image.name;
    const destination = "./public/images/product/" + imageName;
    image.mv(destination, async (err) => {
      if (err) {
        console.log("Error in addProduct controller", err.message);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        const product = new Product({
          name,
          description,
          qty,
          price,
          image: imageName,
        });

        await product
          .save()
          .then(() => {
            res.status(200).json({ success: "Product added successfully" });
          })
          .catch((err) => {
            console.log(err);
            res.status(400).json({ error: "Invalid user data" });
          });
      }
    });
  } catch (error) {
    console.log("Error in addProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    let product = [];

    const id = req.params.id
    if(id){
      product = await Product.findOne({_id:id})
    }else{
      product = await Product.find();
    }


    if(product){
      res.status(200).json({ success: "All product found",product,imageBaseUrl:'/images/product/'});
    }

  } catch (error) {
    console.log("Error in getAllProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteProduct = async (req,res) => {
  try {
    const id = req.params.id

    await Product.deleteOne({_id:id})
    res.status(200).json({success:"Product deleted successfully"})
    
  } catch (error) {
    console.log("Error in deleteProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const updateProduct = async (req,res) => {
  try {

    const { name, description, qty, price } = req.body;
    const image = req.files?.image
    const id = req.params.id

    console.log(req.body)


    console.log(req.params.id)

    if (image == null) {
     await Product
        .findByIdAndUpdate(
          { _id: id },
          {
            name,
            price,
            qty,
            description
          }
        )
        .then(() => {
         res.status(200).json({success:"Product updated successfully"})
        })
        .catch(() => {
          res.status(401).json({error:"product not updated"})
        });
    } else {
      const imageName =
        new Date().getTime() +
        Math.floor(Math.random() * 1000) +
        image.name;

      const destination = "./public/images/product/" + imageName;
      image.mv(destination, async (err) => {
        if (!err) {
         await Product
            .updateOne(
              { _id: id },
              {
                name,
                price,
                qty,
                description,
                image:imageName
              }
            )
            .then(() => {
              res.status(200).json({success:"data updated"})
            })
            .catch(() => {
              res.status(401).json({error:"product not updated"})
            });
        } else {
          res.status(401).json({error:"unable to upload file"})
        }
      });
    }



    
  } catch (error) {
    console.log("Error in updateProduct controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
