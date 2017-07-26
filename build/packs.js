const fs = require('fs');
require('colors');

const buildJson = require('./json');
const generateSprite = require('./sprite');

const packs = [
    {
        name: 'emojione',
        location: 'node_modules/emojione',
        findFile: unicode => `node_modules/emojione/assets/svg/${unicode}.svg`
    }
];

const build = pack => {
    try {
        fs.statSync(pack.location);

        return generateSprite(pack);
    } catch(err) {
        return Promise.reject(err);
    }
};

const buildNext = () => {
    const pack = packs.shift();

    if(pack) {
        return build(pack)
            .then(() => buildNext())
            .catch(err => console.log(err));
    } else {
        console.log('Complete!'.inverse.green)
    }
};

buildJson(packs[0]);
module.exports = buildNext();
