const argv = require('yargs').argv;
const async = require('async');
const path = require('path');
const {Translate} = require('@google-cloud/translate');

const db = require('../lib/db');
const persist = require('../lib/persist');

const en = require('../data/_en.json');

// Global settings & storage
const CONCURRENCY_LIMIT = 4;
const LOCALES = ['sq','hy','eu','be','bg','ca','hr','cs','da','nl','en','et','fi','fr','gl','de','el','hi','hu','is','id','it','ja','kn','ko','la','lv','lt','mk','ms','ml','mt','mr','mn','my','fa','pl','pt','ro','ru','gd','sr','sk','sl','es','sv','te','th','tr','uk','uz','vi','cy','zu'];
const BASE_LOCALE = 'en';
const DELIMITER = ':';
const ERROR_CREDENTIALS = 'Invalid credentials';

// Validate CLI argument & create translation client
if (typeof argv._[0] === 'undefined') throw new Error(ERROR_CREDENTIALS);
if (argv._[0] === '') throw new Error(ERROR_CREDENTIALS);
process.env.GOOGLE_APPLICATION_CREDENTIALS = path.resolve(__dirname, argv._[0]);
const client = new Translate();

// Create processing queue
const q = async.queue(function (job, callback) {
    const key = job.locale + DELIMITER + job.word;

    // Check to see if locale + word exists in local storage database
    db.get(key, function (err, val) {
        if (typeof val !== 'undefined') return callback();
        if (typeof err.notFound === 'undefined') return callback(err);

        // Explicitly set source and destination languages
        const options = {
          from: BASE_LOCALE,
          to: job.locale
        };

        // For output in the base locale, do not translate
        if (job.locale === BASE_LOCALE) {
          db.put(key, job.word.toLowerCase(), callback);
          return;
        }

        // Translate
        client.translate(job.word, options, (err, result) => {
            if (err) return callback(err);
            if (typeof result !== 'string') return callback();

            // Log status indicator to console
            process.stdout.write('.');

            // Write locale + delimiter + word to storage
            db.put(key, result.toLowerCase(), callback);
        });
    });
}, CONCURRENCY_LIMIT);

q.error = function (err) {
    throw new Error(err);
};

q.drain = function () {
    process.stdout.write('\n');
    persist(db.createReadStream(), DELIMITER, process.exit);
};

// Get all words from the source list and push into processing queue by locale
const tasks = [];
for (let x in en) {
    if (!en[x]) continue;
    for (let y in LOCALES) {
        tasks.push({
            word: x,
            locale: LOCALES[y]
        });
    }
}
q.push(tasks);
