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
    cb(null, date + file.originalname.replace( / +/g, ''));
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
    uri:  "https://192.168.109.85:5000/api/pdfs/"+file_path
  })

  newData.save(()=>{
    let newUrl = "https://192.168.109.85:5000/api/pdfs/"+file_path;
    console.log("Successfully uploaded!", newUrl);
    let data = {url: newUrl, status:200};
    res.json(data).status(200)
  });
});

module.exports = router;