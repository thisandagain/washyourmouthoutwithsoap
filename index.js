const data = require('./data/build.json');

class Wash {
    /**
     * Creates a new instance of WashYourMouthOutWithSoap.
     * @constructor
     */
    constructor () {
        this.locales = Object.keys(data);
    }

    /**
     * Normalize case and remove excess whitespace from input string.
     * @param  {string} phrase Input phrase
     * @return {string}        Cleaned phrase
     */
    static clean (phrase) {
        return phrase
            .toLowerCase()
            .replace(/[\s+]+/g, ' ');
    }

    /**
     * Split input phrase into an array of tokens both with and without
     * punctuation.
     * @param  {string} phrase Input phrase
     * @return {array}         Array of tokens
     */
    static tokenize (phrase) {
        const withPunctuation = phrase
            .replace('/ {2,}/', ' ')
            .split(' ');
        const withoutPunctuation = phrase
            .replace(/[^\w\s]/g, '')
            .replace('/ {2,}/', ' ')
            .split(' ');

        return withPunctuation.concat(withoutPunctuation);
    }

    /**
     * Returns an array of supported locales.
     * @return {array} Array of ISO 639-1 locales.
     */
    supported () {
        return this.locales;
    }

    /**
     * Returns an array of bad words for the specified locale.
     * @param  {string} locale ISO 639-1 locale code
     * @return {Array}         Array of bad words
     */
    words (locale) {
        return data[locale];
    }

    /**
     * Checks an arbitrary input string against the bad word list for the
     * specified locale.
     * @param  {string} locale ISO 639-1 locale code
     * @param  {string} phase  Input phrase
     * @return {boolean}       Does the phrase contain a bad word?
     */
    check (locale, phrase) {
        // Check to see if locale is supported. If not, return false.
        if (typeof data[locale] === 'undefined') return false;

        // Clean and tokenize user input
        const tokens = Wash.tokenize(Wash.clean(phrase));

        // Check against list
        for (let i in tokens) {
            if (this.words(locale).indexOf(tokens[i]) !== -1) return true;
        }

        return false;
    }
}

module.exports = new Wash();
