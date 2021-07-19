const Products = require("../models/Products");
const upload = require("../middleware/multer");

// @description Get all products
// @route GET / api/brands
// @acces Public
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Products.find({})
      .populate("productCategory", "category")
      .populate("productBrand", "title");

    res.status(200).json({
      successMessage: "get all products success",
      products,
    });
  } catch (error) {
    console.log("get all products error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Get single product
// @route GET / api/products/:id
// @acces Public
exports.getProductById = async (req, res) => {
  try {
    const prod = await Products.findById(req.params.id);
    const { ...product } = prod._doc;
    res.status(200).json({
      successMessage: "Get single product success",
      product,
    });
  } catch (error) {
    console.log("single product error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Create product
// @route POST / api/products
// @acces Private/admin
exports.createProduct = async (req, res) => {
  const [{ filename }] = req.files.productImage;

  const {
    productCategory,
    productBrand,
    title,
    description,
    sku,
    price,
    size,
    material,
    countryOrigin,
    quantity,
    inStock,
  } = req.body;

  try {
    let product = new Products();
    product.productImage = filename;

    product.productCategory = productCategory;
    product.productBrand = productBrand;
    product.title = title;
    product.description = description;
    product.sku = sku;
    product.price = price;
    product.size = size;
    product.material = material;
    product.countryOrigin = countryOrigin;
    product.quantity = quantity;
    product.inStock = inStock;

    await product.save();
    res.status(200).json({
      successMessage: `${product} added`,
      product,
    });
  } catch (error) {
    console.log("products create error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description Updated product
// @route PUT / api/products/:id
// @acces Private/admin
exports.updateProduct = async (req, res) => {
  const {
    productCategory,
    productBrand,
    title,
    description,
    sku,
    price,
    size,
    material,
    countryOrigin,
    quantity,
    inStock,
  } = req.body;
  try {
    const product = await Products.findOneAndUpdate(req.params.id);
    if (product) {
      product.productCategory = productCategory;
      product.productBrand = productBrand;
      product.title = title;
      product.description = description;
      product.sku = sku;
      product.price = price;
      product.size = size;
      product.material = material;
      product.countryOrigin = countryOrigin;
      product.quantity = quantity;
      product.inStock = inStock;
    }
    const updateProduct = await product.save();
    res.status(200).json({
      successMessage: `${updateProduct} added`,
      updateProduct,
    });
  } catch (error) {
    console.log("product update error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};

// @description delete product
// @route DELETE / api/products/:id
// @acces Private/admin
exports.deleteProduct = async (req, res) => {
  const product = await Products.findById(req.params.id);
  try {
    if (product) {
      await product.remove();
    }
    res.status(200).json({
      successMessage: "Product removed",
    });
  } catch (error) {
    console.log("product delete error", error);
    res.status(500).json({
      errorMessage: "Please try again later",
    });
  }
};
