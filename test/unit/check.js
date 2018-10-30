const test = require('tap').test;
const wash = require('../../index');

test('unsupported locale', t => {
    const result = wash.check('zzz', 'The fox jumped over the lazy dog.');
    t.type(result, 'boolean');
    t.false(result);
    t.end();
});

test('false (en)', t => {
    const result = wash.check('en', 'The fox jumped over the lazy dog.');
    t.type(result, 'boolean');
    t.false(result);
    t.end();
});

test('true (en)', t => {
    const result = wash.check('en', 'The fox was a bit of an asshole.');
    t.type(result, 'boolean');
    t.true(result);
    t.end();
});

test('false (en + emoji)', t => {
    const result = wash.check('en', 'This is 🔥.');
    t.type(result, 'boolean');
    t.false(result);
    t.end();
});

test('true (en + emoji)', t => {
    const result = wash.check('en', 'This 👻 is an asshole.');
    t.type(result, 'boolean');
    t.true(result);
    t.end();
});

test('false (en + punctuation)', t => {
    const result = wash.check('en', 'This is sh!t.');
    t.type(result, 'boolean');
    t.false(result);
    t.end();
});

test('true (en + punctuation)', t => {
    const result = wash.check('en', 'This is shit!');
    t.type(result, 'boolean');
    t.true(result);
    t.end();
});

test('false (ru)', t => {
    const result = wash.check('ru', 'рад тебя видеть');
    t.type(result, 'boolean');
    t.false(result);
    t.end();
});

test('true (ru)', t => {
    const result = wash.check('ru', 'ты мудак');
    t.type(result, 'boolean');
    t.true(result);
    t.end();
});
