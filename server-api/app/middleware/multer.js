
// const multer = require('multer')
// const path = require('path')

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, __basedir + 'app/uploads/')
//     },

//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//         // const timestamp = new Date().getTime()
//         // console.log(file)
//         // const originalname = file.originalname
//         // //const extension = path.extname(file.originalname)

//         // cb(null, `${timestamp}-${originalname}`)
//     }
// })

// const upload = multer({
//     storage: storage,
//     // limits: {
//     //     fileSize: 5 * 1000 * 1000  //5 MB
//     // }
// }).single('image')

// module.exports = upload


// // const multer = require('multer')
// // const path = require('path')


// // const storage = multer.diskStorage({
// //     destination: '../uploads/',
// //     filename: (req, file, cb) => {
// //       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
// //       const newFileName = uniqueSuffix + path.extname(file.originalname);
// //       cb(null, newFileName);
// //     },
// //   });
  
// // export const upload = multer({ 
// //   storage: storage , 
// //   fileFilter: (req, file, cb) => {
// //     if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
// //       cb(null, true);
// //     } else {
// //       cb(new Error('Invalid file type. Only JPEG and PNG files are allowed.'));
// //     }
// //   },
// // });