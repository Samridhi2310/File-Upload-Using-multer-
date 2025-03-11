const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(cors());

// Ensure Express serves static files from "uploadFiles"
app.use("/uploadFiles", express.static(path.join(__dirname, "uploadFiles")));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "uploadFiles"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage: storage });

// app.post("/upload", upload.single("uploadFile"), (req, res) => {
//     console.log("File received on server:", req.file);

//     if (!req.file) {
//         return res.status(400).json({ message: "File upload failed." });
//     }

//     // ✅ Fix filename assignment
//     const filename = req.file.filename;


//     // ✅ Return proper JSON response
//     return res.json({ message: "File uploaded successfully!", filename });
// });
app.post("/upload", upload.array("files", 5), (req, res) => {
    console.log("Files received on server:", req.files);

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "File upload failed." });
    }

    const filePaths = req.files.map(file => `/uploadFiles/${file.filename}`);

    return res.json({ message: "Files uploaded successfully!", files: filePaths });
});



app.get("/", (req, res) => {
    console.log("Hello");
    res.send("Server is running...");
});

app.listen(8000, () => {
    console.log("Server running on http://localhost:8000");
});
