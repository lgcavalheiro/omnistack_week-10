const Dev = require('../models/dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
    async index(request, response) {
        const {latitude, longitude, techs} = request.query;
        const arrTechs = parseStringAsArray(techs);

        const devs = await Dev.find({
            techs: {
                $in: arrTechs,
            },
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: 10000,
                }
            }
        });
        
        return response.json(devs);
    }
}