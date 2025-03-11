const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "../uploadFiles"));
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});
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
// Set upload constraints
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
        files: 5, // Limit number of files per request (should match array limit)
    }
}).array("files", 5); // Accept up to 5 files

// Controller function to handle file upload
const handleUpload = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            if (err instanceof multer.MulterError) {
                if (err.code === "LIMIT_FILE_SIZE") {
                    return res.status(400).json({ error: "File size exceeds 5MB limit!" });
                }
                if (err.code === "LIMIT_FILE_COUNT") {
                    return res.status(400).json({ error: "Exceeded the maximum file upload limit (5 files)!" });
                }
            }
            return res.status(500).json({ error: err.message });
        }

        console.log("Files received on server:", req.files);

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded!" });
        }

        const filePaths = req.files.map(file => `/uploadFiles/${file.filename}`);

        return res.json({ message: "Files uploaded successfully!", files: filePaths });
    });
};
const handleMessageShow= (req, res) => {
    res.send("Server is running...");
    console.log("hello from server")
}
module.exports = { handleUpload ,handleMessageShow};
