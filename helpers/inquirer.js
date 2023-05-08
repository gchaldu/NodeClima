const inquirer = require('inquirer');
require('colors')

const preguntas = {
    type: 'list',
    name: 'opcion',
    message: '¿Qué desea hacer?',
    choices: [
        { value: 1, name: `${'1.'.green} Buscar ciudad`},
        { value: 2, name: `${'2.'.green} Historial`},    
        { value: 0, name: `${'0.'.green} Salir`}
    ]
}
const listadoDeTareasABorrar = async (tareas=[]) =>{

    const arregloOp = tareas.map((tarea, i) => {
        const {id, desc} = tarea;
        const idx = `${i + 1}`.green;
        const op = { value: id , name: `${idx}. ${desc}` }
        return op;
    })

    arregloOp.unshift({ value: '0', name: '0. '.green + 'Cancelar'})
    const listadoTareas = {
        type: 'list',
        name: 'id',
        message: '¿Qué tarea desea Borrar?',
        choices: arregloOp
    }

    const {id} = await inquirer.prompt(listadoTareas);
    return id;
}

/* const listadoDeTareasACompletar = async (tareas=[]) =>{

    const arregloOp = tareas.map((tarea, i) => {
        const {id, desc, completadoEn} = tarea;
        const idx = `${i + 1}`.green;
        const op = { value: id , name: `${idx}. ${desc}`, checked: (completadoEn) ? true : false }
        return op;
    })

    const listadoTareas = {
        type: 'checkbox',
        name: 'ids',
        message: '¿Qué tarea desea Completar?',
        choices: arregloOp
    }

    const {ids} = await inquirer.prompt(listadoTareas);
    return ids;
} */

const listadoDeCiudades = async (ciudades=[]) =>{

    const lugares = ciudades.map((city, i) => {
        const {nombre, id} = city;
        const idx = `${i+1}`.green;
        const op = { 
            value: id,
            name: `${idx} ${nombre}`
        }
        return op;
    })
    lugares.unshift(
        { value: '0',
            name: '0. '.green + 'Cancelar'
        });
    const preguntas = {
        type: 'list',
        name: 'ciudad',
        message: '¿Qué ciudad desea seleccionar?',
        choices: lugares
    }
    const {ciudad} = await inquirer.prompt(preguntas);
    return ciudad;
}

const inquirerMenu = async() => {
        //console.clear();
        console.log('==================='.green);
        console.log('Seleccione un opción'.green);
        console.log('==================='.green);

        const {opcion} = await inquirer
            .prompt(
                preguntas
            )
        return opcion;

}

const leerImput = async(mensaje) =>
{
    const question = [
        {
            type: 'input', 
            name: 'desc', 
            message: mensaje,
            validate( value ){
                if(value.length === 0 )
                {
                    return 'Por favor ingrese una ciudad';
                }
                return true;
            }
        }
    ];
     const {desc} = await inquirer.prompt(question);
     return desc;
}

const pausar = async() => {

    const questionPause = {
        type: 'input',
        name: 'enter',
        message: `\nPresione ${'ENTER'.green}: para continuar\n`,
    }
    console.log('\n');
    const {enter} = await inquirer
        .prompt(questionPause)

    return enter;
}

const confirmar = async(message) => {

    const question = {
        type: 'confirm',
        name: 'ok',
        message,
    }
    console.log('\n');
    const {ok} = await inquirer
        .prompt(question)

    return ok;
}

module.exports = {
    inquirerMenu,
    pausar,
    leerImput,
    listadoDeTareasABorrar,
    confirmar,
    listadoDeCiudades
}