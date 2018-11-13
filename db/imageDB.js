const db = require('../db');

const recentImage = () =>{
    return db.any(`SELECT name, high_res, description FROM image ORDER BY id DESC`);
};

const highResImage = (imageId) => {
    return db.one(`SELECT name, high_res, description FROM image WHERE id = ${imageId}`);
};

const uploadImage = (imageBuff, imageThumbnailBuff, imageMedResBuff, imageName,
                     imageDescription, imageResolution, imageSize, imageCategoryId) =>{

    return db.any(`INSERT INTO image("high_res", "thumbnail", "med_res", "name", "description", "resolution", "size", "categoryId") 
                VALUES ('${imageBuff}',
                        '${imageThumbnailBuff}', 
                        '${imageMedResBuff}',
                        '${imageName}', 
                        '${imageDescription}',
                        '${imageResolution}',
                        ${imageSize}, 
                        ${imageCategoryId})`
    );
};

const imageCategories = () =>{
    return db.any(`SELECT * FROM category`);
};

const imageSearch = (categoryId, userSearch) =>{
    return db.tx(task =>{
        return task.batch([
            task.any(`SELECT * FROM category`),
            task.any(`SELECT id, name, thumbnail, description FROM image WHERE "categoryId" = ${categoryId}
                      AND (name iLIKE '%${userSearch}%' OR description iLIKE '%${userSearch}%')`)
        ]);
    });
};


module.exports = {
    recentImage,
    highResImage,
    uploadImage,
    imageCategories,
    imageSearch
};