// Extra configuration
require('./animals.js');
require('./crayola.js');
require('./dialect/load_dialects-node.js');

var cpblx = require('./cpblx.js');

const dialects = new Array(
    1, //general
    2, //healthcare
    3, //publishing
    4, //learning
    5, //voluntary
    6, //COVID-19
    7, //Brexiteer
    8, //consipracy theory
    9, //STEM
    10, //legal
    11, //entertainment
    12, //craftale
    13, //greenwash
);

function random_choice(anArray: any[]) {
    return anArray[(Math.random() * anArray.length) | 0]
}

const txt = cpblx(random_choice(dialects),-5).replace(/(<([^>]+)>)/gi, "");

console.log(txt);