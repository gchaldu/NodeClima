const { leerImput } = require ('./helpers/inquirer')

const main = async() => {
    const texto = await leerImput('Hola');
    console.log(texto);
}

main();