const test = require('tap').test;
const wash = require('../../index');

test('returns words for a supported locale', t => {
    const result = wash.words('en');
    t.type(result, 'object');
    t.true(Array.isArray(result));
    t.true(result.length > 0);
    t.true(result.indexOf('ass') !== -1);
    t.end();
});
