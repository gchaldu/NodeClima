const axios = require('axios');

class Busqueda{
    historial = ['Mar del Plata', 'Madrid', 'New York', 'Buenos Aires'];

    constructor()
    {
        //TO DO: LEER DB SI EXISTE
    }

    async ciudad (lugar = '')
    {
        //peticion http
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/mar%20del%2C-37.86172915727613.json?limit=5&language=es&access_token=pk.eyJ1IjoiZ2NoYWxkdSIsImEiOiJjbGhkb3h4aW8xOTRyM3NwaDc5NG95ZGhlIn0.1gQdkCQRYuHgZgLJzhpyng`
        
        try{
            const res = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/mar%20del%2C-37.86172915727613.json?limit=5&language=es&access_token=pk.eyJ1IjoiZ2NoYWxkdSIsImEiOiJjbGhkb3h4aW8xOTRyM3NwaDc5NG95ZGhlIn0.1gQdkCQRYuHgZgLJzhpyng');
                    console.log(res.data);
        }catch (error) {
            return []
        }
    }
}


module.exports = {Busqueda}