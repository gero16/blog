const generarToken = () => {
    const result = Date.now().toString(32) + Math.random().toString(32).substring(2)
    console.log(result)
    return result

}

module.exports = {
    generarToken
}

