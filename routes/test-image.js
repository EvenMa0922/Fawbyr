const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const imageDB = require('../db/imageDB');
const jimp = require('jimp');

router.get('/', (request, response) => {
    imageDB.imageCategories()
        .then(data => {
            console.log(data);
            response.render('pages/upload-image', {
                category: data
            });
        }).catch(error => {
            console.log(error);
        })
});

router.post('/upload', (request, response) => {
    upload(request, response, (error) => {
        if (error) {
            console.log(error);
            //non-image format error can go here
        } else {
            if (request.file !== undefined) {
                let imageBuff = "data:" + request.file.mimetype + ";base64," + request.file.buffer.toString('base64');
                let imageName = request.body.imageName;
                let imageDescription = request.body.imageDescription;
                let imageCategoryId = request.body.imageCategory;
                let imageSize = Number(request.file.size); //bytes

                jimp.read(request.file.buffer)
                    .then((result) => {
                        let imageWidth = result.bitmap.width;
                        let imageHeight = result.bitmap.height;
                        let resolutionStr = imageWidth + ' x ' + imageHeight;
                        let resizeWidth = Math.floor(imageWidth) / 2;
                        let resizeHeight = Math.floor(imageHeight) / 2;

                        if (resizeWidth <= 200) resizeWidth = imageWidth;
                        if (resizeHeight <= 200) resizeHeight = imageHeight;

                        let imageMedRes = result.resize(resizeWidth, resizeHeight).quality(50).getBuffer(request.file.mimetype, (err, buff) => {
                            return "data:" + request.file.mimetype + ";base64," + buff.toString('base64');
                        });

                        let imageThumb = result.resize(200, 200).quality(30).getBuffer(request.file.mimetype, (err, buff) => {
                            return "data:" + request.file.mimetype + ";base64," + buff.toString('base64');
                        });

                        imageDB.uploadImage(imageBuff, imageThumb, imageMedRes, imageName, imageDescription, resolutionStr, imageSize, imageCategoryId)
                            .then(() => {
                                response.redirect('/image');
                            }).catch((error) => {
                                console.log(error);
                                response.send('error');
                        });
                    }).catch((err) => {
                        console.log("error: " + err);
                    });
            } else {
                response.redirect('/image');
            }
        }
    })
});

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5000000
    },
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = router;