const db = require("../models")
const Face = db.face
const faceapi = require('face-api.js')
const { Canvas, Image, ImageData } = require('canvas');


// Set up face-api.js with the custom canvas
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });


//Inisialisasai face-api.js
async function loadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk('./models')
  await faceapi.nets.faceRecognitionNet.loadFromDisk('./models')
  await faceapi.nets.faceLandmark68Net.loadFromDisk('./models')
}


exports.detectFace = async (req, res) => {
  try{
    // Determine the image type based on the file's MIME type
  let imageType;
  switch (req.file.mimetype) {
    case 'image/jpeg':
      imageType = 'image/jpeg';
      break;
    case 'image/png':
      imageType = 'image/png';
      break;
    // Add more cases for other supported image types if needed
    default:
      return res.status(400).json({
        success: false,
        error: 'Unsupported image type'
      });
  }

  // Additional console log to display information about the image buffer
  console.log('Buffer Information:', {
    size: req.file.buffer ? req.file.buffer.length : "undefiend",
    type: req.file.mimetype,
  });

  //lakukan face detection pada gambar 
  
  const buffer = req.file.buffer
  // const buffer = Buffer.from(req.body.image, 'base64');
  const blob = new Blob([buffer], { type: imageType })
  const image = await faceapi.bufferToImage(blob);

   // Additional console log to display information about the image
  console.log('Image Information:', {
    width: image.width,
    height: image.height,
    type: image.type,
  });

    //Load models
    await loadModels()

    //Mendeteksi wajah
    const detections = await faceapi.detectAllFaces(image).withFaceLandmarks().withFaceDescriptors()

    // Simpan gambar ke database
    console.log('Before Face.create', detections);
    const face = await Face.create({ image: buffer });
    console.log('Face created:', face);

    res.status(200).send({
      success : true,
      statusCode : 200,
      detections,
      faceId: face.id
    })


  } catch (error){
    console.error('Error creating face:', error);
    return res.status(500).send({
      success: false, 
      error: 'Internal Server Error' 
    });
  }
}

