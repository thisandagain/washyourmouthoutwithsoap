const levelup = require('levelup');
const leveldown = require('leveldown');
const path = require('path');

class DB {
    /**
     * Creates a new database instance.
     * @constructor
     */
    constructor () {
        const uri = path.resolve(__dirname, '../.db');
        return levelup(leveldown(uri));
    }
}

module.exports = new DB();
