const axios = require('axios');
const fs = require('fs');
const { join } = require('path');

class Busqueda{
    historial = [];
    dbPath = './db/database.json';

    constructor()
    {
        //TO DO: LEER DB SI EXISTE
        this.leerDB();
    }
    //Un lujo capitalizo las ciudades
    get historialCapitalizado()
    {
        return this.historial.map((lugar) => {
            let palabras = lugar.split(' ');
            palabras = palabras.map((p)=>p[0].toUpperCase() + p.substring(1))
            return palabras.join(' ');
        })
    }
    get paramsMapBox()
    {
        return {
            'access_token': process.env.MAPBOX_KEY || '',
            'limit': 5,
            'language': 'es'
        } 
    }

    async ciudad (lugar = '')
    {
        //peticion http
        try{
            const instance = new axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapBox
            })
            const res = await instance.get();
            return res.data.features.map((lugar)=>{
                return{
                    nombre: lugar.place_name,
                    id: lugar.id,
                    lng: lugar.center[0],
                    lat: lugar.center[1]
                }
            });
        }catch (error) {
            return [];
        }
    }
    get paramsWeather()
    {
        return {
            'appid': process.env.OPENWEATHER_KEY || '',
            'units': 'metric',
            'lang': 'es',
        } 
    }
    async temperaturaCiudad(lugar)
    {
        try{
            const instance = new axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lugar.lat}&lon=${lugar.lng}`,
                params: this.paramsWeather
            })
            const res = await instance.get();
            const {weather, main} = res.data;
            return {
                desc: weather[0].description,
                min: main.temp,
                max: main.temp_max,
                temp: main.temp_min
            };
        }catch (error)
        {
            console.log('Ocurrio un error...')
        }
    }
    
    agregarHistorial(lugar='')
    {
        //TODO: PREVENIR DUPLICADOS
        //GRABAR al inicio y prevenir duplicados -> DOS FORMAS
        /* const res = this.historial.find((nombre) => nombre === lugar);
        if(res===undefined) this.historial.unshift(lugar); */
        if (this.historial.includes(lugar)){
            return;
        }
        this.historial.unshift(lugar);
        this.guardarDB();
    }

    guardarDB()
    {
        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB(){
        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'})
        const dataParseada = JSON.parse(info);
        this.historial = dataParseada.historial;
    }
}


module.exports = {Busqueda}