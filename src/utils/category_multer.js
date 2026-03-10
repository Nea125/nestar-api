
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const uploadFile = (folderName, fieldName = "image") => {
  // const uploadDir = path.join(__dirname, "../../uploads/category", folderName);
   const uploadDir = path.join(__dirname, "../../uploads", folderName);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = file.originalname
        .replace(ext, "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-");

      cb(null, `${Date.now()}-${name}${ext}`);
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files allowed"), false);
  };1

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  }).single(fieldName);
};

module.exports = uploadFile;