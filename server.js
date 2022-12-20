const cors = require("cors");
const express = require("express");
const app = express();
const multer = require('multer')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images', )
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + '-' + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if(file.mimetype == 'image/png' ||
     file.mimetype == 'image/jpg' ||
     file.mimetype == 'image/jpeg'
  ){
    cb(null, true)
  } else {
    cb(null, false)
  }
}

app.use(multer({storage: fileStorage, fileFilter: fileFilter}).single('image'))

app.post("/upload", (req, res) => {
  if(!req.file){
    // const err = new Error('Image Harus di upload')
    // err.errorStatus = 422
    // throw err
    res.status(422).json({
      message: "image harus di upload",
      data: []
    })
  }

  const image = req.file.path
  res.status(201).json({
    message: "images berhasil di upload",
    data: image
  })
})

app.get("/", (req, res) => res.status(200).json({status: "OK"}))

let port = 8080;
app.listen(port, () => {
  console.log(`Running at localhost:${port}`);
});
