
const cloudinary = require("cloudinary").v2;

const addImgCloudinary = async (img) => {
    const newID = Date.now();
    return await cloudinary.uploader.upload(
        img, 
        { 
            public_id : `blog-luz-de-luna/${ newID }` 
        }, 
        function (error, result) {
            //console.log(result);
        });
        
}
const deleteImgCloudinary = async (post) => {
    const extraerImagen = post.imagen.split("/")
    const imagenId = extraerImagen[8].split(".")
    const publicId = `${ extraerImagen[7] }/${ imagenId[0] }`
    await cloudinary.uploader.destroy(`${ publicId }`, function(error, result) {
      console.log(result, error) 
    });
}

module.exports = {
    addImgCloudinary,
    deleteImgCloudinary,
}