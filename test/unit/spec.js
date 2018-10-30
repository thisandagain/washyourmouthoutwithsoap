const test = require('tap').test;
const wash = require('../../index');

test('matches spec', t => {
    t.type(wash, 'object');
    t.type(wash.supported, 'function');
    t.type(wash.words, 'function');
    t.type(wash.check, 'function');
    t.end();
});
