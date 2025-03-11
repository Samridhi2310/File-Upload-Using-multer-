const express = require("express");
const cors = require("cors");
const path = require("path");
const fileRoutes = require("./routes/fileRoute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON data
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files (uploaded files)
app.use("/uploadFiles", express.static(path.join(__dirname, "uploadFiles")));

// Mount routes
app.use("/", fileRoutes);

// Start server
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
