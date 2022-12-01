// Dean Jenkins December 2019
// Basically a word salad maker, a Corpora Ipsum or Corpora Loqui, a generator of word art.

// Origins
// Heavily modified from https://www.atrixnet.com/bs-generator.html
// Made up words (e.g. myocardinate) mostly removed (I think). Hyphenated more of the compound adjectives.
// I left in 'evisculate' as it makes me laugh.
// I doubt though if that bs-generator was actually the first.
// I'm not sure where the original code came from but if you search the web for "myocardinate", "energistically", "rapidiously",
// or "monotonectally" you'll find examples of blurb for websites. It may have been from a Wordpress tool perhaps?

// Anyhow, extended it with some more buzzwords, made it create whole sentences, and arbitrary numbers of sentences.
// Added some words from Shakespeare who seems to invented many. https://www.litcharts.com/blog/shakespeare/words-shakespeare-invented/
// TODO more dialects - IT / Silicon Valley / 'tech bro', FinTech
// TODO somehow preserve phrases as they appear in the wild in their full form. e.g. 'online grocery penetration'. This is an adjective noun pair (possibly?) and could be used as an authentic whole rather than splitting up into 'online' adjective, and 'grocery penetration' which sounds bizarre in isolation.
// TODO other sentence formats. "Having [] is crucial for growth in []".
// TODO This is hand-coded bollox. What would Markov chain or neural network generated bollox look like?

// Further reading: https://en.wikipedia.org/wiki/Syntactic_category, http://research.cs.queensu.ca/CompLing/whatis.html, https://en.wikipedia.org/wiki/List_of_buzzwords


import animals from './animals';
import colours from './crayola';
import dialectData from './dialect/dialects'

var hashtags = []; // make hashtags global

function cpblx(rand=true, dialect = 1, x = -5) {

    if (rand){
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
        );
        
        function random_choice(anArray: any[]) {
            return anArray[(Math.random() * anArray.length) | 0]
        };

        dialect = random_choice(dialects);
        x = random_choice(quantity);
    }

    var image_search_term = ""; // blank term for the Pixabay search


    // Outstanding adjective noun pairs found in the wild. No really. These are examples from the wild.
    // Just collecting these for the moment ... will use them somehow.
    var adjective_noun_pair = new Array(
        '\"online grocery penetration\"',
        '\"hyperconnected experience\"'
    );



    // Mechanism for generating hashtags (hashtags is global)
    var thedate = new Date();
    var theday = thedate.getDay();

    switch (theday) {
        case 0:
            hashtags = new Array('#SundayThoughts', '#SundayVibes', '#SundayMorning', '#SundayMotivation', '#SundayFunday', '#SundayBrunch', '#weekend');
            break;
        case 1:
            hashtags = new Array('#MondayThoughts', '#MondayVibes', '#MondayMorning', '#MondayMotivation', '#MondayMood');
            break;
        case 2:
            hashtags = new Array('#TuesdayThoughts', '#TuesdayVibes', '#TuesdayMorning', '#TuesdayMotivation', '#TuesdayTip');
            break;
        case 3:
            hashtags = new Array('#WednesdayThoughts', '#WednesdayVibes', '#WednesdayMorning', '#WednesdayMotivation', '#WednesdayWisdom');
            break;
        case 4:
            hashtags = new Array('#ThursdayThoughts', '#ThursdayVibes', '#ThursdayMorning', '#ThursdayMotivation', '#ThursdayThrill', '#ThursdayAesthetic');
            break;
        case 5:
            hashtags = new Array('#FridayThoughts', '#FridayVibes', '#FridayMorning', '#FridayMotivation', '#FridayFeeling');
            break;
        case 6:
            hashtags = new Array('#SaturdayThoughts', '#SaturdayVibes', '#SaturdayMorning', '#SaturdayMotivation', '#SaturdayStunner', '#weekend');
            break;
        default:
            hashtags = new Array('#dailythought'); // probably never used but just in case theday is broke
    }
    hashtags = shuffle(hashtags);




    // colour animal ... pool writer ... now replaces the cheesy individual dialect authors
    var author = colours[Math.floor(Math.random() * colours.length)] + " " + animals[Math.floor(Math.random() * animals.length)];



    // we slice these as there is popping later on
    var adjectives = shuffle(dialectData.adjectives.slice());
    var verbs = shuffle(dialectData.verbs.slice());
    var verbs_with_ing = shuffle(dialectData.verbs_with_ing.slice());
    var whw_start = shuffle(dialectData.whw_start.slice());
    var links = shuffle(dialectData.links.slice());
    var nouns = shuffle(dialectData.nouns.slice());
    var adverbs = shuffle(dialectData.adverbs.slice());

    // appraisal or performance review starters
    // With apologies to https://www.tinypulse.com/blog/sk-useful-phrases-performance-reviews
    // and https://www.myhubintranet.com/performance-review-example-phrases/
    var appraise_starts = shuffle(dialectData.appraise_starts.slice());
    var appraise_quant = shuffle(dialectData.appraise_quant.slice());

    switch (dialect) {
        case 5: // use voluntary sector nouns and adverbs
            nouns = shuffle(dialectData._VSnouns.slice());
            adverbs = shuffle(dialectData._VSadverbs.slice());
            var VStags = shuffle(dialectData._VStags.slice());
            hashtags = shuffle(Array(hashtags[0], VStags.pop()));
            image_search_term = shuffle(Array('volunteer', 'volunteering', 'charity')).pop();
            break;
        case 4: // use learning industry nouns and adverbs
            nouns = shuffle(dialectData._EDnouns.slice());
            adverbs = shuffle(dialectData._EDadverbs.slice());
            var EDtags = shuffle(dialectData._EDtags.slice())
            hashtags = shuffle(Array(hashtags[0], shuffle(EDtags).pop()));
            image_search_term = shuffle(Array('learning', 'education')).pop();
            break;
        case 3: // use publishing industry nouns and adverbs
            nouns = shuffle(dialectData._PUBnouns.slice());
            adverbs = shuffle(dialectData._PUBadverbs.slice());
            var PUBtags = shuffle(dialectData._PUBtags.slice())
            hashtags = shuffle(Array(hashtags[0], shuffle(PUBtags).pop()));
            image_search_term = shuffle(Array('publishing', 'publishers')).pop();
            break;
        case 2: // use healthcare industry nouns and adverbs
            nouns = shuffle(dialectData._NHSnouns.slice());
            adverbs = shuffle(dialectData._NHSadverbs.slice());
            var NHStags = shuffle(dialectData._NHStags.slice());
            hashtags = Array(hashtags[0], NHStags.pop(), NHStags.pop());
            image_search_term = shuffle(Array('healthcare', 'paramedic', 'patient', 'anesthesia', 'hospital', 'doctor', '"emergency room"')).pop();
            break;
        case 6: // use COVID-19 pandemic nouns and adverbs
            nouns = shuffle(dialectData._COVIDnouns.slice()); // using slice() duplicates the array not just copy the reference to the array
            adverbs = shuffle(dialectData._COVIDadverbs.slice());
            links = shuffle(links.concat(dialectData._COVIDlinks.slice())); // add the extended list
            verbs_with_ing = shuffle(verbs_with_ing.concat(dialectData._COVIDverbs_with_ing.slice())); // add the extended list
            adjectives = shuffle(adjectives.concat(dialectData._COVIDadjectives.slice())); // add the extended list
            hashtags = shuffle(Array(hashtags[0], dialectData._COVIDtags[Math.floor(Math.random() * dialectData._COVIDtags.length)]));
            image_search_term = shuffle(Array('coronavirus', 'covid-19', 'covid')).pop();
            break;
        case 7: // use Brexiteer nouns and adverbs and extended links choice
            nouns = shuffle(dialectData._BREXITEERnouns.slice());
            adverbs = shuffle(dialectData._BREXITEERadverbs.slice());
            links = shuffle(links.concat(dialectData._BREXITEERlinks.slice())); // add the extended list
            verbs_with_ing = shuffle(verbs_with_ing.concat(dialectData._BREXITEERverbs_with_ing.slice())); // add the extended list
            adjectives = shuffle(adjectives.concat(dialectData._BREXITEERadjectives.slice())); // add the extended list
            var BREXITEERtags = shuffle(dialectData._BREXITEERtags.slice());
            hashtags = shuffle(Array(hashtags[0], BREXITEERtags.pop(), BREXITEERtags.pop()));
            image_search_term = shuffle(Array('brexit', 'britannia', 'british', 'european union')).pop();
            break;
        case 8: // use Conspiracy nouns and adverbs and extended links choice
            nouns = shuffle(dialectData._CONnouns.slice());
            adverbs = shuffle(dialectData._CONadverbs.slice());
            links = shuffle(links.concat(dialectData._CONlinks.slice())); // add the extended list
            var CONtags = shuffle(dialectData._CONtags.slice());
            hashtags = shuffle(Array(hashtags[0], CONtags.pop(), CONtags.pop()));
            image_search_term = shuffle(Array('conspiracy', 'alien', 'illuminati')).pop();
            break;
        case 9: // use STEM nouns and adverbs and extended links choice
            nouns = shuffle(dialectData._STEMnouns.slice());
            adverbs = shuffle(dialectData._STEMadverbs.slice());
            links = shuffle(links.concat(dialectData._STEMlinks.slice())); // add the extended list
            var STEMtags = shuffle(dialectData._STEMtags.slice())
            hashtags = shuffle(Array(hashtags[0], STEMtags.pop()));
            image_search_term = shuffle(Array('engineering', 'science', 'technology', 'mathematics')).pop();
            break;
        case 10: // use Legal nouns and adverbs and extended links choice
            nouns = shuffle(dialectData._LEGALnouns.slice());
            adverbs = shuffle(dialectData._LEGALadverbs.slice());
            links = shuffle(links.concat(dialectData._LEGALlinks.slice())); // add the extended list
            verbs_with_ing = shuffle(verbs_with_ing.concat(dialectData._LEGALverbs_with_ing.slice())); // add the extended list
            adjectives = shuffle(adjectives.concat(dialectData._LEGALadjectives.slice())); // add the extended list
            var LEGALtags = shuffle(dialectData._LEGALtags.slice())
            hashtags = shuffle(Array(hashtags[0], LEGALtags.pop()));
            image_search_term = shuffle(Array('law', 'barrister', 'contract')).pop();
            break;
        case 11: // use Entertainment nouns and adverbs etc.
            nouns = shuffle(dialectData._ENTnouns.slice());
            verbs = shuffle(dialectData._ENTverbs.slice());
            adverbs = shuffle(dialectData._ENTadverbs.slice());
            links = shuffle(links.concat(dialectData._ENTlinks.slice()));
            verbs_with_ing = shuffle(dialectData._ENTverbs_with_ing.slice());
            adjectives = shuffle(dialectData._ENTadjectives.slice());
            var ENTtags = shuffle(dialectData._ENTtags.slice());
            hashtags = Array(hashtags[0], ENTtags.pop(), ENTtags.pop(), ENTtags.pop(), ENTtags.pop(), ENTtags.pop(), ENTtags.pop(),);
            image_search_term = shuffle(Array('london+night', 'london+pub', 'london+bar', 'westminster', 'city+of+london', 'trafalgar+square', 'london+underground', 'london+bridge', 'london+shard', 'londoner')).pop();
            break;
        case 12: // use Craft Ale nouns and adverbs etc.
            nouns = shuffle(dialectData._ALEnouns.slice());
            verbs = shuffle(dialectData._ALEverbs.slice());
            adverbs = shuffle(dialectData._ALEadverbs.slice());
            links = shuffle(links.concat(shuffle(dialectData._ALElinks.slice())));
            verbs_with_ing = shuffle(dialectData._ALEverbs_with_ing.slice());
            adjectives = shuffle(dialectData._ALEadjectives.slice());
            var ALEtags = shuffle(dialectData._ALEtags.slice());
            hashtags = Array(hashtags[0], ALEtags.pop(), ALEtags.pop(), ALEtags.pop(), ALEtags.pop(), ALEtags.pop(), ALEtags.pop(),);
            image_search_term = shuffle(Array('ale', 'beer', 'pub')).pop();
            break;
        case 13: // use Greenwash nouns and adverbs etc.
            nouns = shuffle(dialectData._GREENnouns.slice());
            verbs = shuffle(dialectData.verbs);
            adverbs = shuffle(dialectData._GREENadverbs.slice());
            links = shuffle(links.concat(shuffle(dialectData._GREENlinks.slice())));
            verbs_with_ing = shuffle(dialectData._GREENverbs_with_ing.slice());
            adjectives = shuffle(adjectives.concat(dialectData._GREENadjectives.slice()));
            var GREENtags = shuffle(dialectData._GREENtags.slice());
            hashtags = Array(hashtags[0], GREENtags.pop(), GREENtags.pop(), GREENtags.pop(), GREENtags.pop(), GREENtags.pop(), GREENtags.pop(),);
            image_search_term = shuffle(Array('renewable energy', 'tidal power', 'solar panel', 'wind turbine')).pop();
            break;
        default:
            hashtags = Array(hashtags[0]);
            image_search_term = shuffle(Array('business', 'industry', 'collaboration', 'office')).pop();
        //            author = shuffle(Array('Executive Comms', 'Operations manager', 'Human talent coordinator', 'Agile coordinator', 'Chief Operating Officer', 'Head of Alignment Strategy')).pop();
    }


    //    array_to_console(links);

    var statement = "";

    if (x == -2) { // The why how what
        statement = whw_start.pop();
        statement = statement + " " + adjectives.pop();
        statement = statement + " " + nouns.pop();
        statement = statement + " through ";
        statement = statement + " " + adjectives.pop();
        statement = statement + " " + nouns.pop();
        statement = statement + " by ";
        statement = statement + adverbs.pop().toLowerCase();
        statement = statement + " " + verbs_with_ing.pop();
        statement = statement + " " + adjectives.pop();
        statement = statement + " " + nouns.pop();
        statement = statement + ".";
    }


    if (x == -1) { // The why
        statement = adjectives.pop();
        statement = statement + " " + nouns.pop();
        statement = statement.charAt(0).toUpperCase() + statement.slice(1) + "! ";
    }


    if (x == -3) { // 5 things (i.e. 5 bullet points)
        statement = "FIVE things for " + adverbs.pop().toLowerCase() + " " + verbs_with_ing.pop() + "!";
        var i;
        for (i = 1; i < 6; i++) {
            statement = statement + " " + i + ") ";
            statement = statement + adverbs.pop();
            statement = statement + " " + verbs.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
        }
        statement = statement + ". ";
    }

    if (x == -4) { // appraisal bollox
        var i;
        var gain;
        for (i = 1; i < 4; i++) {
            if (Math.random() > 0.2) { // standard statement of appraisal
                statement = statement + appraise_starts.pop() + " ";
                statement = statement + " " + adjectives.pop();
                statement = statement + " " + nouns.pop();
                statement = statement + ". ";
            } else {
                statement = statement + appraise_quant.pop() + " ";
                statement = statement + " " + adjectives.pop();
                statement = statement + " " + nouns.pop();
                gain = 10 * (Math.floor(Math.random() * 10) + 3);
                statement = statement + " by " + gain.toString() + "%. ";
            }
        }
    }

    if (x == 0) { // A brief bullet point
        statement = statement + adverbs.pop();
        statement = statement + " " + verbs.pop();
        statement = statement + " " + adjectives.pop();
        statement = statement + " " + nouns.pop();
        statement = statement + ". ";
    }

    while (x > 0) { // number of sentences
        if (Math.random() > 0.2 || x === 1) { // standard sentence (or single glorious statement)
            statement = statement + adverbs.pop();
            statement = statement + " " + verbs.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
            statement = statement + " " + links.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop() + ". ";
        } else { // why how what sentence
            statement = statement + whw_start.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
            statement = statement + " through";
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
            statement = statement + " by ";
            statement = statement + adverbs.pop().toLowerCase();
            statement = statement + " " + verbs_with_ing.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
            statement = statement + ". ";
        }
        x = x - 1;
    }

    if (x == -5) { // Tweet with hashtags
        if (Math.random() > 0.2) { // standard sentence (or single glorious statement)
            statement = statement + adverbs.pop();
            statement = statement + " " + verbs.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
            statement = statement + " " + links.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop() + ". ";
        } else { // why how what sentence
            statement = statement + whw_start.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
            statement = statement + " through";
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
            statement = statement + " by ";
            statement = statement + adverbs.pop().toLowerCase();
            statement = statement + " " + verbs_with_ing.pop();
            statement = statement + " " + adjectives.pop();
            statement = statement + " " + nouns.pop();
            statement = statement + ". ";
        }
        statement = statement + hashtags.join(" ");
    }

    return statement;
}



function shuffle(array: any[]) {
    // source: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array#2450976
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function array_to_console(array: any[], sort = true) { // prints out a one-dimensional string array
    if (sort) { array.sort(); }
    var output = "";
    for (var x in array) {
        output = output + " '" + array[x] + "',";
    }
    output = output.replace(/^\s+|,$/gm, ''); // remove spaces at the beginning and comma at end
    console.log(output);
}


function makeid(length: number) { // source: https://stackoverflow.com/a/1349426/4066963
    var result = 'A'; // to avoid errors where a DOM element id starts with a number
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


export default cpblx;