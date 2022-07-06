const router = require("express").Router();
const Owner = require("../models/Owner");
const { verifyTokenAndAdmin } = require("./verifyToken");
const Product = require("../models/Product");

router.post("/add", verifyTokenAndAdmin, async (req, res) => {
  const newOwner = new Owner(req.body);
  try {
    const savedOwner = await newOwner.save();
    res.status(201).json(savedOwner);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const owners = await Owner.find();
    return res.status(200).json(owners);
  } catch (err) {
    response.status(500).json(err);
  }
});

router.get("/:ownerName", async (req, res) => {
  const ownerName = req.params.ownerName;
  try {
    const spesificOwner = await Owner.find({ ownerName: ownerName });
    const ownerKampaniyas = await Product.find({ owner: ownerName });

    return res.status(200).json({ spesificOwner, ownerKampaniyas });
  } catch (err) {
    response.status(500).json(err);
  }
});

module.exports = router;
