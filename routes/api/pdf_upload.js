const express = require('express');
const router = express.Router();
const multer = require("multer");
const File = require('../../models/pdf_files');

const date = Date.now();
let file_path = ''

const storage = multer.diskStorage({
  destination: "./upload/",
  filename: function(req, file, cb){
    file_path =  date + file.originalname
    cb(null, date + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000 },
});

router.post('/', upload.single("doc_file"),(req , res) => {
  const newData = new File({
    name: req.file['originalname'],
    type: req.file.mimetype.split('/')[1],
    uri: file_path
  })

  newData.save((data)=>{
    res.json({
      status: true, 
      url: `https://192.168.109.85/upload/${data}`
    })
  });
});

module.exports = router;