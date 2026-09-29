const multer = require("multer");
const path = require("path");

// Storage Configuration

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null,Date.now() + path.extname(file.originalname))
    }
})

// File Filter (Optional - to restrict file types)
const fileFilter = (req, file, cb) => {
    const allowedTypes = /pdf/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) {
        cb(null, true);
    } else {
        cb(new Error("Only PDF files are allowed."));
    }
}

const upload = multer({storage, fileFilter});

module.exports = upload;