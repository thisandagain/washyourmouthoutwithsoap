const _ = require('lodash');
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

const OUTPUT_PATH = path.resolve(__dirname, '../data/build.json');

module.exports = function (stream, delimiter, callback) {
    // Storage object
    const obj = {};

    // Write each property to disk as JSON
    function write (callback) {
        // Ensure build path is clean
        rimraf.sync(OUTPUT_PATH);

        // Write to disk as JSON
        fs.writeFile(OUTPUT_PATH, JSON.stringify(obj, null, 4), callback);
    }

    // Pipe stream and push results into storage object
    stream
        .on('data', function (data) {
            const locale = data.key.toString().split(delimiter)[0];
            if (typeof obj[locale] === 'undefined') obj[locale] = [];
            obj[locale].push(data.value.toString());
        })
        .on('error', callback)
        .on('end', () => {
            // De-duplicate each locale
            for (let i in obj) {
                obj[i] = _.uniq(obj[i])
            }

            // Write to disk
            write(callback);
        });
}
