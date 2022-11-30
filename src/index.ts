import cpblx from './cpblx';

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

const quantity = new Array(
    -2, // The why how what
    -1, // The Why
    -3, // Five things
    -4, // Appraisal
    0, // A brief bullet point
    5, // 5 sentences
    10, // 10 sentences
    -5, // Tweet with hashtags
    // -6, -7, and -8 get images so not implemented yet
)

function random_choice(anArray: any[]) {
    return anArray[(Math.random() * anArray.length) | 0]
}

const txt = cpblx(random_choice(dialects),random_choice(quantity));

console.log(txt);