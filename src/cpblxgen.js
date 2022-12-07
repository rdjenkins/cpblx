
var _cpblxrules = _interopRequireDefault(require("./dialect/cpblxrules.json"));


// function taken from scigen.js
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// function taken from scigen.js
var generate = function generate(rules, start) {
  var rx = new RegExp("^(" + Object.keys(rules).sort(function (a, b) {
    return b.length - a.length;
  }).join("|") + ")");

  var expand = function expand(key) {
    var pick = function pick(array) {
      return array[Math.floor(Math.random() * array.length)];
    };

    var plusRule = key.match(/(.*)[+]$/);
    var sharpRule = key.match(/(.*)[#]$/);

    if (plusRule) {
      if (plusRule[1] in rules) {
        rules[plusRule[1]] += 1;
      } else {
        rules[plusRule[1]] = 1;
      }

      return rules[plusRule[1]] - 1;
    } else if (sharpRule) {
      if (sharpRule[1] in rules) {
        return Math.floor(Math.random() * (rules[sharpRule[1]] + 1));
      } else {
        return 0;
      }
    } else {
      var process = function process(rule) {
        var text = "";

        for (var i in rule) {
          var match = rule.substring(i).match(rx);

          if (match) {
            return text + expand(match[0]) + process(rule.slice(text.length + match[0].length));
          } else {
            text += rule[i];
          }
        }

        return text;
      };

      return process(pick(rules[key]));
    }
  };

  return {
    text: prettyPrint(expand(start)),
    rules: rules
  };
};

// function taken from scigen.js
var prettyPrint = function prettyPrint(text) {
  text = text.split("\n").map(function (line) {
    line = line.trim();
    line = line.replace(/ +/g, " ");
    line = line.replace(/\s+([.,?;:])/g, "$1");
    line = line.replace(/\ba\s+([\"']*[aeiou])/gi, "an $1"); // modified for cpblx
    line = line.replace(/\bthe\s+(["'])*the/gi, "$1the"); // sometimes the the appears in cpblx 
    line = line.replace(/^\s*[a-z]/, function (l) {
      return l.toUpperCase();
    });
    line = line.replace(/((([.:?!]\s+)|(=\s*\{\s*))[a-z])/g, function (l) {
      return l.toUpperCase();
    });
    line = line.replace(/\W((jan)|(feb)|(mar)|(apr)|(jun)|(jul)|(aug)|(sep)|(oct)|(nov)|(dec))\s/gi, function (l) {
      return l[0].toUpperCase() + l.substring(1, l.length) + ". ";
    });
    line = line.replace(/\\Em /g, "\\em");
    var titleMatch = line.match(/(\\(((sub)?section)|(slideheading)|(title))\*?)\{(.*)\}/);

    if (titleMatch) {
      line = titleMatch[1] + "{" + titleMatch[7][0].toUpperCase() + (0, _titleCase.titleCase)(titleMatch[7]).slice(1) + "}";
    }
                
    var cpblxTitleMatch = line.match(/<title>([^<]+)<\/title>(.*)/);

    if (cpblxTitleMatch) {
      if (Math.random() > 0.3) {
        // capitalise first letters of title (including the first word within quotes)
        // https://regex101.com/r/2qv4Vy/1
        var thistitle = cpblxTitleMatch[1].replace(/(^['"]{0,1}\w{1})|(\s+['"]{0,1}\w{1})/g, letter => letter.toUpperCase());
      } else {
        // capitalise all the title
        var thistitle = cpblxTitleMatch[1].toUpperCase();
      }
      line = "<strong>" + thistitle + "</strong>" + cpblxTitleMatch[2];
    }

    if (line.match(/\n$/)) {
      line += "\n";
    }

    return line;
  }).join("\n");
  return text;
};

function cpblxgen(WHAT) {
//  console.log(WHAT);
//  console.log(generate(_cpblxrules["default"], WHAT).text);
  return generate(_cpblxrules["default"], WHAT).text;
}

// cpblxgen('ENT_THE_WHY');
// cpblxgen('ENT_DOING');
// cpblxgen('ENT_THING_WE_DO');
// cpblxgen('WHY_CASE');
// cpblxgen('BREXIT_WHY_CASE');

module.exports = { cpblxgen };