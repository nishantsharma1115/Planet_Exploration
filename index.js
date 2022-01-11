const fs = require('fs');
const parse = require('csv-parse');
const constants = require('./constants.js');

const isHabitablePlanets = [];

// These are the factors that Kapler found in order to determine
// whether a planet is habitable or not.
function isHabitablePlanet(planet) {
    return planet[constants.KOI_DISPOSITION] === constants.CONFIRMED_PLANET
        && planet[constants.KOI_INSOL] > constants.LOWEST_KOI_INSOL
        && planet[constants.KOI_INSOL] < constants.HIGHEST_KOI_INSOL
        && planet[constants.KOI_PRAD] < constants.TIMES_EARTH_RADII;
}

fs.createReadStream(constants.FILE_PATH)
    .pipe(parse.parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        if (isHabitablePlanet(data)) {
            isHabitablePlanets.push(data);
        }
    })
    .on('error', (err) => {
        console.error(err);
    })
    .on('end', () => {
        console.log(isHabitablePlanets);
        console.log('Done!!');
    });

