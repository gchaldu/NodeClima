require('dotenv').config();
const { inquirerMenu, pausar, leerImput, listadoDeCiudades } = require ('./helpers/inquirer');
const { Busqueda } = require('./models/busquedas');

const main = async() => {
    let op=-1;
    const busqueda = new Busqueda();
    do{
        console.clear();    
        op = await inquirerMenu();
        switch(op)
        {
            case 1:

                //Mostrar Mensaje
                const ciudad = await leerImput('Ciudad: ');
                //Buscar los lugares
                const lugares = await busqueda.ciudad(ciudad);
                const id = await listadoDeCiudades(lugares);
                const ciudadSeleccionada = lugares.find((city)=> city.id === id )
                const {nombre, lng, lat} = ciudadSeleccionada;
                const temperaturas = await busqueda.temperaturaCiudad("main" + ciudadSeleccionada);
                //Mostrar resultados
                const {temp_min, temp_max, temp} = temperaturas;
                console.log('Información del Clima'.green);
                console.log('Ciudad: ' + nombre);
                console.log('Lat: ' + lat);
                console.log('Long: ' + lng);
                console.log('Temperatura: ' + temp);
                console.log('Máxima: ' + temp_max);
                console.log('Minima: ' + temp_min);
                //seleccionar el lugar
            break;

            case 2:
                console.log("dos " + op);
            break;

            case 0:
                console.log("Cero " + op);
            break;
        }

        if (op!==0) await pausar();
    }while (op !== 0);
    
    
}

main();