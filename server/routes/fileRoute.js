const express = require("express");
const { handleUpload,handleMessageShow } = require("../controllers/fileController");

const router = express.Router();

router.post("/upload", handleUpload);
router.get("/",handleMessageShow)

module.exports = router;
