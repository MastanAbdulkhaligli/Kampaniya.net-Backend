const router = require("express").Router();
const Header = require("../models/Header");
const { verifyTokenAndAdmin } = require("./verifyToken");

router.post("/add", async (req, res) => {
  const newHeader = new Header({
    content: req.body.content,
    color: req.body.color,
    isActive: req.body.isActive,
  });

  try {
    const savedHeader = await newHeader.save();
    res.status(201).json(savedHeader);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const oldHeader = await Header.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(oldHeader);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const header = await Header.find();
    return res.status(200).json(header);
  } catch (err) {
    response.status(500).json(err);
  }
});

module.exports = router;
