const regalos = ['cat', 'game', 'socks']
let asteriscos = "*"

const cantidadDeLetras = (cantidad) => { 
        return asteriscos.repeat(cantidad + 2) 
}

function envolverRegalos(regalos) {
    const regalosEnvueltos = regalos.map((regalo) => {
        const numAsteriscos = cantidadDeLetras(regalo.length)
        const regaloEnvuelto = ` \n ${ numAsteriscos } \n *${ regalo }* \n ${ numAsteriscos } ` 
        return regaloEnvuelto 
    })
    return regalosEnvueltos
}

const resultado = envolverRegalos(regalos)
console.log(resultado)
