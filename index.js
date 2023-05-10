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
                if(id==='0')
                {
                    continue;
                }
                //seleccionar el lugar
                const ciudadSeleccionada = lugares.find((city)=> city.id === id )
                
                //Guardar en DB
                busqueda.agregarHistorial(ciudadSeleccionada.nombre);
                const {nombre, lng, lat} = ciudadSeleccionada;
                const temperaturas = await busqueda.temperaturaCiudad(ciudadSeleccionada);
                //Mostrar resultados
                const {desc, min, max, temp} = temperaturas;
                console.log('Información del Clima'.green);
                console.log('Ciudad: ' + nombre.green);
                console.log(`Lat: ${lat}`.blue);
                console.log(`Long: ${lng}`.blue);
                console.log(`Temperatura: ${temp}`.blue);
                console.log(`Máxima: ${max}`.blue);
                console.log(`Minima: ${min}`.blue);
                console.log(`¿Cómo esta el clima? ${desc}`.green);
                
            break;

            case 2:
                busqueda.historialCapitalizado.forEach((lugar, i)=>{
                    const idx = `${i+1}`.cyan
                    console.log(`${idx}. Ciudad: ${lugar}`.green);
                })
            break;

        }

        if (op!==0) await pausar();
    }while (op !== 0);
    
    
}

main();