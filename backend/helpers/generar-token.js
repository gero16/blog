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


const generarToken = () => {
    const result = Date.now().toString(32) + Math.random().toString(32).substring(2)
    console.log(result)
    return result

}

module.exports = {
    generarJWT,
    generarToken
}

