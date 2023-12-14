const multer = require("multer");
const path = require("path")

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // cb(null, __basedir + "/resources/static/assets/uploads/");
    // cb(null, __dirname + "/../resources/static/assets/uploads/");
    const destinationPath = path.join(__dirname, "..", "resources", "static", "assets", "uploads");
    cb(null, destinationPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-pressti-${file.originalname}`);
  },
});

const uploadFile = multer({ 
  storage: storage, 
  fileFilter: imageFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, 
});

// uploadFile.single('image'), (req, res, next) => {
//   console.log('Request File :', req.file)
//   console.log('Request headers:', req.headers);
//   console.log('Request body:', req.body);
//   next()
// }

module.exports = uploadFile;
