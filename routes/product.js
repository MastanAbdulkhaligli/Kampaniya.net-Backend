const router = require("express").Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  // const newProduct = new Product({
  //   kampaniyaName: req.body.kampaniyaName,
  //   owner: req.body.owner,
  //   aboutProduct: req.body.aboutProduct,
  //   startDate: req.body.startDate,
  //   endDate: req.body.endDate,
  //   price: req.body.price,
  //   category: req.body.category,
  //   image: req.body.image,
  //   address: req.body.address,
  //   hashTag: req.body.hashTag,
  // });

  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update Product
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Product
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been Deleted");
  } catch (err) {
    response.status(500).json(err);
  }
});

// Find Product
router.get("/find/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    if (productID) {
      const product = await Product.findById(productID);
      return res.status(200).json(product);
    } else {
      return res.status(200).json("axtardiginiz product movcud deyil");
    }
  } catch (error) {
    return res.status(404).json("axtardiginiz product movcud deyil");
  }
});

// Get All Products
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qDescending = req.query.descending;
  const qAscending = req.query.ascending;

  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({ created_at: -1 }).limit(3);
    } else if (qCategory) {
      products = await Product.find({ category: qCategory });
    } else if (qDescending) {
      products = await Product.find().sort({ price: -1 });
    } else if (qAscending) {
      products = await Product.find().sort({ price: 1 });
    } else {
      products = await Product.find();
    }

    return res.status(200).json(products);
  } catch (err) {
    response.status(500).json(err);
  }
});

// Get spesific category with pagination

router.get("/category", async (req, res) => {
  const qCategory = req.query.category;
  const search = req.query.search || "";

  try {
    const PAGE_SIZE = 8;
    const total = await Product.countDocuments({});
    const page = parseInt(req.query.page || "0");
    const posts = await Product.find({
      category: qCategory,
    })
      .sort({ created_at: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    return res
      .status(200)
      .json({ total, totalPages: Math.ceil(total / PAGE_SIZE), posts });
  } catch (error) {
    response.status(500).json(err);
  }
});

// Get All Product with  Pagination
router.get("/pagination", async (req, res) => {
  try {
    // Implementing search
    const search = req.query.search || "";

    // end of implementing search

    // How many items will be on display
    const PAGE_SIZE = 8;
    const total = await Product.countDocuments({});
    const page = parseInt(req.query.page || "0");
    //kampaniyaName: { $regex: search, $options: "i" },
    const posts = await Product.find({
      $or: [
        { hashTag: { $regex: search } },
        { kampaniyaName: { $regex: search, $options: "i" } },
        { owner: { $regex: search, $options: "i" } },
      ],
    })
      .sort({ created_at: -1 })
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    return res
      .status(200)
      .json({ total, totalPages: Math.ceil(total / PAGE_SIZE), posts });
  } catch (err) {
    response.status(500).json(err);
  }
});

// Find Product with Id and other product with same Owner
router.get("/others/:id", async (req, res) => {
  const productID = req.params.id;
  try {
    if (productID) {
      const product = await Product.findById(productID);
      const others = await Product.find({ owner: product.owner }).limit(8);

      let cleanedOthers = others.filter(
        (item) => item.kampaniyaName !== product.kampaniyaName
      );
      return res.status(200).json({ product, others: cleanedOthers });
    } else {
      return res.status(200).json("axtardiginiz product movcud deyil");
    }
  } catch (error) {
    return res.status(404).json("axtardiginiz product movcud deyil");
  }
});

module.exports = router;
