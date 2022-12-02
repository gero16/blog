const jwt = require('jsonwebtoken');
const colors = require('colors')

const generarJWT = async (req, res) => {
    const id = Date.now();
    try {
        const token = jwt.sign(id, process.env.SECRETORPRIVATEKEY);
        console.log(colors.bgGreen(token))
        
        return token
    } catch (error) {
        console.log(error)
    }
   
}



module.exports = {
    generarJWT,
}

