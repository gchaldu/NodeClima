const axios = require('axios');

class Busqueda{
    historial = ['Mar del Plata', 'Madrid', 'New York', 'Buenos Aires'];

    constructor()
    {
        //TO DO: LEER DB SI EXISTE
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
        } 
    }
    async temperaturaCiudad(lugar)
    {
            const instance = new axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?lat=${lugar.lat}&lon=${lugar.lng}`,
                params: this.paramsWeather
            })
            const res = await instance.get();
            //console.log(res.data.main)
            return res.data.main;
    }   
}


module.exports = {Busqueda}