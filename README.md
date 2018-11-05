## washyourmouthoutwithsoap
### A list of bad words in many languages.

`washyourmouthoutwithsoap` is a simple module that provides a list (or *lists*) of bad words in many languages as well as a simple string matching utility to check arbitrary strings for the existence of words on the list. The source (English) bad word list is based on [Google's Bad Word List](https://github.com/MauriceButler/badwords) originally used in the "What Do You Love" project.

## Basic Use
### Getting the List of Supported Locales
```js
const wash = require('washyourmouthoutwithsoap');
wash.supported(); // Returns an array of ISO 639-1  locale codes
```

### Checking a String Against the Word List
```js
const wash = require('washyourmouthoutwithsoap');
wash.check('en', 'The quick brown fox jumped over the lazy dog.'); // false
wash.check('en', 'The fox was a bit of an asshole.'); // true
```

### Getting All Words for a Specified Locale
```js
const wash = require('washyourmouthoutwithsoap');
wash.words('en'); // Returns an array of words for the specified locale
```

## Available Languages
| Language   | Locale |
| ---------- | ------ |
| Belarusian | `be`   |
| Bulgarian  | `bg`   |
| Catalan    | `ca`   |
| Czech      | `cs`   |
| Welsh      | `cy`   |
| Danish     | `da`   |
| German     | `de`   |
| Greek      | `el`   |
| English    | `en`   |
| Spanish    | `es`   |
| Estonian   | `et`   |
| Basque     | `eu`   |
| Farsi      | `fa`   |
| Finnish    | `fi`   |
| French     | `fr`   |
| Gaelic     | `gd`   |
| Galician   | `gl`   |
| Hindi      | `hi`   |
| Croatian   | `hr`   |
| Hungarian  | `hu`   |
| Armenian   | `hy`   |
| Indonesian | `id`   |
| Icelandic  | `is`   |
| Italian    | `it`   |
| Japanese   | `ja`   |
| Kannada    | `kn`   |
| Korean     | `ko`   |
| Latin      | `la`   |
| Lithuanian | `lt`   |
| Latvian    | `lv`   |
| Macedonian | `mk`   |
| Malayalam  | `ml`   |
| Mongolian  | `mn`   |
| Marathi    | `mr`   |
| Malay      | `ms`   |
| Maltese    | `mt`   |
| Burmese    | `my`   |
| Dutch      | `nl`   |
| Polish     | `pl`   |
| Portuguese | `pt`   |
| Romanian   | `ro`   |
| Russian    | `ru`   |
| Slovak     | `sk`   |
| Slovenian  | `sl`   |
| Albanian   | `sq`   |
| Serbian    | `sr`   |
| Swedish    | `sv`   |
| Telugu     | `te`   |
| Thai       | `th`   |
| Turkish    | `tr`   |
| Ukrainian  | `uk`   |
| Uzbek      | `uz`   |
| Vietnamese | `vi`   |
| Zulu       | `zu`   |

## To Test
```bash
npm test
```

## To Build
While this library requires zero dependencies to run, it does use a build process to generate the large lists of bad words for each language using Google Translate. This data can be regenerated or modified yourself, but you will need to get access to your own [Google Cloud Platform](https://cloud.google.com/) credentials. Once setup, you can build via:

```bash
node bin/build.js path/to/credentials.json
```
