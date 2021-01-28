const util = require('util')
const multer = require('multer');
const fs = require('fs');
const maxSize = 2 * 1024 * 1024;


let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (req.params.idUser && req.params.idGrade && req.params.idMatter) {
            cb(null, __basedir + `../../resources/static/assets/uploads/${req.params.idUser}/${req.params.idGrade}/${req.params.idMatter}`);
        } else {
            cb(null, __basedir + "../../resources/static/assets/uploads/");
        }

    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, file.originalname);
    },
});


let uploadFile = multer({

    storage: storage,
    limits: { fileSize: maxSize }
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware