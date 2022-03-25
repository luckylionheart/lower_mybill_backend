const express = require('express');
const router = express.Router();
const multer = require("multer");
const File = require('../../models/pdf_files');

const date = Date.now();
let file_path = ''

const storage = multer.diskStorage({
  destination: "./upload/",
  filename: function(req, file, cb){
    file_path =  date + "_" + file.originalname.replace( / +/g, '')
    cb(null, date+ "_" + file.originalname.replace( / +/g, ''));
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
    uri: `http://18.207.115.218/api/pdfs/${file_path}`
  })

  newData.save((data)=>{
	console.log("upload the doc", `http://18.207.115.218/api/pdfs/${file_path}`);
    res.json({
      status: true, 
      url: `http://18.207.115.218/api/pdfs/${file_path}`
    })
  });
});

module.exports = router;
