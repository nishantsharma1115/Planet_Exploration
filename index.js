const fs = require('fs');
const parse = require('csv-parse');

const results = [];

fs.createReadStream('planet_data.csv')
    .pipe(parse.parse({
        comment: '#',
        columns: true
    }))
    .on('data', (data) => {
        results.push(data);
    })
    .on('error', (err) => {
        console.error(err);
    })
    .on('end', () => {
        console.log(results);
        console.log('Done!!');
    });

