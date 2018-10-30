const test = require('tap').test;
const wash = require('../../index');

test('includes supported locales', t => {
    const result = wash.supported();
    t.type(result, 'object');
    t.true(Array.isArray(result));
    t.true(result.length > 0);
    t.true(result.indexOf('en') !== -1);
    t.end();
});
