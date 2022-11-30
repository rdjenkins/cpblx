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

var as_blob = false; // display Pixabay image as a blob
var copy_button = false; // display copy button (for Blog It / Picture This)
var blogit_button = false; // display the blog it button
var hashtags = []; // make hashtags global

module.exports = function cpblx(dialect=1,x=-5) {

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
            hashtags = new Array('#SundayThoughts', '#SundayVibes', '#SundayMorning', '#SundayMotivation', '#SundayFunday','#SundayBrunch', '#weekend');
            break;
        case 1:
            hashtags = new Array('#MondayThoughts', '#MondayVibes', '#MondayMorning', '#MondayMotivation', '#MondayMood');
            break;
        case 2:
            hashtags = new Array('#TuesdayThoughts', '#TuesdayVibes', '#TuesdayMorning', '#TuesdayMotivation', '#TuesdayTip');
            break;
        case 3:
            hashtags = new Array('#WednesdayThoughts', '#WednesdayVibes', '#WednesdayMorning', '#WednesdayMotivation','#WednesdayWisdom');
            break;
        case 4:
            hashtags = new Array('#ThursdayThoughts', '#ThursdayVibes', '#ThursdayMorning', '#ThursdayMotivation','#ThursdayThrill', '#ThursdayAesthetic');
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
    author = colours[Math.floor(Math.random() * colours.length)] + " " + animals[Math.floor(Math.random() * animals.length)];

    

    // we slice these as there is popping later on
    adjectives = shuffle(dialectData.adjectives.slice());
    verbs = shuffle(dialectData.verbs.slice());
    verbs_with_ing = shuffle(dialectData.verbs_with_ing.slice());
    whw_start = shuffle(dialectData.whw_start.slice());
    links = shuffle(dialectData.links.slice());
    nouns = shuffle(dialectData.nouns.slice());
    adverbs = shuffle(dialectData.adverbs.slice());

// appraisal or performance review starters
// With apologies to https://www.tinypulse.com/blog/sk-useful-phrases-performance-reviews
// and https://www.myhubintranet.com/performance-review-example-phrases/
    appraise_starts = shuffle(dialectData.appraise_starts.slice());
    appraise_quant = shuffle(dialectData.appraise_quant.slice());

    switch (dialect) {
        case 5: // use voluntary sector nouns and adverbs
            nouns = shuffle(dialectData._VSnouns.slice());
            adverbs = shuffle(dialectData._VSadverbs.slice());
            var VStags = shuffle(dialectData._VStags.slice());
            hashtags = shuffle(Array(hashtags[0],VStags.pop()));
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
            image_search_term = shuffle(Array('ale','beer', 'pub')).pop();
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
            if (Math.random()>0.2) { // standard statement of appraisal
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
        if (Math.random()>0.2 || x===1) { // standard sentence (or single glorious statement)
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
        if (Math.random()>0.2) { // standard sentence (or single glorious statement)
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

    if (x == -6) {
        var imagethis_id = makeid(9);
        getpic(image_search_term,imagethis_id, as_blob); // this is asynchronous and adds an appropriate image to the top of the bullshit box
        statement = "<div class='container'><div class='row'><div class='col-md' id='" + imagethis_id + "'>";
        statement = statement + "</div><div class='col-md'>";
        if (Math.random()>0.2) { // standard sentence (or single glorious statement)
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
        statement = statement + "<p><b>" + hashtags.join(" ") + "</b></p>";
        statement = statement + "</div></div>";
        if (copy_button===true) {
            statement = statement + "<p class='text-right'><a class='btn btn-outline-primary' onclick='copypicture(" + imagethis_id + ")'>copy</a></p>";
        }
        if (blogit_button===true && as_blob===true) {
            statement = statement + "<p class='text-right'><a class='btn btn-outline-primary' onclick='blogit(" + imagethis_id + ")'>Blog It!</a></p>";
        }

    }

    if (x == -8) { // picture and tags
        var imagethis_id = makeid(9);
        getpic(image_search_term,imagethis_id, as_blob); // this is asynchronous and adds an appropriate image to the top of the bullshit box
        statement = "<div class='container'><div class='row'><div class='col-md' id='" + imagethis_id + "'>";
        statement = statement + "</div><div class='col-md'>";
        statement = statement + "<p><b>" + hashtags.join(" ") + "</b></p>";
        statement = statement + "</div></div>";
        if (copy_button===true) {
            statement = statement + "<p class='text-right'><a class='btn btn-outline-primary' onclick='copypicture(" + imagethis_id + ")'>copy</a></p>";
        }
        if (blogit_button===true && as_blob===true) {
            statement = statement + "<p class='text-right'><a class='btn btn-outline-primary' onclick='blogit(" + imagethis_id + ")'>Blog It!</a></p>";
        }

    }


    if (x == -7) { // blog
        var imagethis_id = makeid(9);
        var headline = adjectives.pop();
        headline = headline + " " + nouns.pop();
        headline = headline.charAt(0).toUpperCase() + headline.slice(1); // no fullstop on headings!

        statement = "<div class='container'>";
        statement = statement + "<div class='row'><div class='col-md'><h1>" + headline + "</h1></div></div>";
        statement = statement + "<div class='row'><div class='col-md' id='" + imagethis_id + "'>";
        statement = statement + "</div><div class='col-md'>";
        // author
        statement = statement + "Author: <div class='small'>" + author + "</div>";
        // publication date
        var d = new Date();
        statement = statement + "Published: <div class='small'>" + d.toString() + "</div>";
        // pullquote
        statement = statement + "<p class='font-italic'>\"" + adverbs.pop();
        statement = statement + " " + verbs.pop();
        statement = statement + " " + adjectives.pop();
        statement = statement + " " + nouns.pop();
        statement = statement + ".\"</p><div>";

        var i;
        var j;
        for (j = 0; j < Math.random()*6+3; j++) { // random number of blog paragraphs
            statement = statement + "<p>";
            for (i = 0; i < Math.random()*6; i++) { // random number of sentences per paragraph
                if (verbs.length > 0 && adjectives.length > 2 && nouns.length > 2 && links.length > 0 && verbs_with_ing.length > 0) {  
                        if (Math.random()>0.2) { // standard sentence (or single glorious statement)
                            var adverb = adverbs.shift(); // remove the first one in the list
                            adverbs.push(adverb); // put it on the end of the list
                            statement = statement + adverb; // use it
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
                                var adverb = adverbs.shift(); // remove the first one in the list
                                adverbs.push(adverb); // put it on the end of the list
                                statement = statement + adverb.toLowerCase(); // use it
                                statement = statement + " " + verbs_with_ing.pop();
                                statement = statement + " " + adjectives.pop();
                                statement = statement + " " + nouns.pop();
                                statement = statement + ". ";
                        }
                } else {
                    var report = "Error. ";
                    if (verbs.length === 0) { report = report + "Ran out of verbs. "; }
                    if (adjectives.length < 3) { report = report + "Ran out of adjectives. "; }
                    if (nouns.length < 3) { report = report + "Ran out of nouns. "; }
                    if (links.length === 0) { report = report + "Ran out of links. "; }
                    if (verbs_with_ing.length == 0) { report = report + "Ran out of verbs_with_ing. "; }
                    console.log(report);
                }
            }
            statement = statement + "</p>";
        }
        statement = statement + "<p><b>" + hashtags.join(" ") + "</b></p>";
        statement = statement + "</div></div></div>";
        if (copy_button===true) {
            statement = statement + "<p class='text-right'><a class='btn btn-outline-primary' onclick='copyblog(" + imagethis_id + ")'>copy</a></p>";
        }
        if (blogit_button===true && as_blob===true) {
            statement = statement + "<p class='text-right'><a class='btn btn-outline-primary' onclick='blogit(" + imagethis_id + ")'>Blog It!</a></p>";
        }

        // as get pic uses Pixabay and is asynchronous have moved it to after the above bollox blog creation so that it doesn't deliver too early
        getpic(image_search_term,imagethis_id, as_blob); // this is asynchronous and adds an appropriate image to the top of the bullshit box
    }



    return statement;
}




function copypicture(id) {
    var thehtml = '<div class=\"row\">' + id.parentElement.innerHTML + '</div>';
    // source: https://stackoverflow.com/a/30810322/4066963
    navigator.clipboard.writeText(thehtml).then(function() {
          console.log('Async: Copying to clipboard was successful!');
          showAlert('Copied');
        }, function(err) {
          console.error('Async: Could not copy text: ', err);
    });
}

function shuffle(array) {
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

function array_to_console(array, sort=true) { // prints out a one-dimensional string array
    if (sort) { array.sort(); }
    var output = "";
    for (x in array) {
        output = output + " '" + array[x] + "',";
    }
    output = output.replace(/^\s+|,$/gm,''); // remove spaces at the beginning and comma at end
    console.log(output);
}


function makeid(length) { // source: https://stackoverflow.com/a/1349426/4066963
   var result           = 'A'; // to avoid errors where a DOM element id starts with a number
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function getpic(term, id, as_blob) { // id is the (presumably) unique element ID for the image
    var API_KEY = '18023552-650e111638d77e61f3f12b100';
    var URL = "https://pixabay.com/api/?safesearch=true&key="+API_KEY+"&q="+encodeURIComponent(term);
    $.getJSON(URL, function(data){
        if (parseInt(data.totalHits) > 0) {
            var item = data.hits[Math.floor(Math.random() * data.hits.length)];
            var thebull = document.getElementById(id);
            if (as_blob===true) {
                var pixabayimage = " <img id='" + id + "_pic' src='data:image/png;base64, " + getBase64Image(item.webformatURL, id + '_pic') + "' class='img-fluid'>"; // this works nicely but can slow the browser
            } else {
                var pixabayimage = " <img id='" + id + "_pic' src='" + item.webformatURL + "' class='img-fluid'>"; // original
            }
            thebull.innerHTML = pixabayimage + "<br><br>" + thebull.innerHTML; // add a random image
        } else {
            console.log('No images matching \'' + term + '\'');
        }
    });
}

function getBase64Image(imgUrl,id) {
// source: https://stackoverflow.com/a/41778691/4066963
  return new Promise(
    function(resolve, reject) {

      var img = new Image();
      img.src = imgUrl;
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = function() {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        var thepromisedimage = document.getElementById(id);
        thepromisedimage.src=dataURL;
        resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
      }
      img.onerror = function() {
        reject("The image could not be loaded.");
      }

    });
}

function showAlert(alertMessage) {
    var message = document.createElement("p");
    message.innerHTML = alertMessage;
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.background = 'white';
    message.style.border = '1px solid black';
    message.style.borderRadius = '10px';
    message.style.padding = '20px';
    document.body.appendChild(message);
    //    document.getElementById(id).innerHTML=alertMessage; 
    setTimeout(function() {message.parentNode.removeChild(message);},3000);
}


