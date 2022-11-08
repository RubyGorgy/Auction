var express = require("express");
var router = express.Router();
const Product = require("../models/Product");

/* GET products listing. */

/* REST API */

// Getting all products
router.get("/", async function (req, res, next) {
  const products = await Product.find({});

  if (!products) {
    res.status(404).json({
      message: "No products found",
    });
  }

  res.json({
    data: products,
  });

  //   res.send('respond with a resource');
});

//Getting one product
router.get("/:id", async function (req, res, next) {
  const id = req.params.id;
  console.log(`got id ${id}`);
  const product = await Product.findOne({ _id: id });
  if (!product) {
    res.status(404).json({
      message: `product not found`,
    });
  }

  res.json({
    product,
  });
});

//Create a one product
router.post("/", async function (req, res, next) {
  const newProductData = req.body;
  console.log(newProductData);
  const newProduct = await Product.create(newProductData);

  if (!newProduct) {
    res.status(403).json({
      message: `bad data product not created`,
    });
  }

  res.json({
    product: newProduct,
  });
});

//Update a product
router.put("/:id", function (req, res, next) {
  const productID = req.params.id;
  const updateProductData = req.body;
  Product.findByIdAndUpdate(productID, updateProductData, (err, data) => {
    if (err) {
      res.status(400).json({
        message: `Couldn't update product`,
      });
    }

    console.log(data);
    res.json({
      product: data,
    });
  });
});

//Delete a product
router.delete("/:id", function (req, res, next) {
  //   res.send("respond with a resource");
  const productID = req.params.id;
  console.log("Product id is", productID);

  try {
    Product.findByIdAndDelete(productID, (err, products) => {
      if (err) {
        console.log(err.message);
        return res.status(400).json({
          message: `Couldn't delete product`,
        });
      }

      console.log("SUCCYAS");
      return res.json({
        Product: "delete successfully",
      });
    });
  } catch (error) {}
});

module.exports = router;
