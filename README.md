# Corporate Bollox Generator (cpblx)

A JavaScript function to generate random corporate quotes and 'scientific' output.

"We exist to build end-to-end Diverse Remote Teams through dynamic leadership skills by escalatingly envisioneering meta-services. Who wouldn't want to deliver resource-sucking markets? Why fail to supply future-proof blockchains? Before 5 years ago there were only supply chains or enabled UX. That's why we fashion, we fabricate, and we whiteboard - competently encapsulating our client-focused USPs.

Our purpose is to add imploratory outsourcing by building inexpensive sprints and using credibly centering our people-centric digital business transformation (DBT). When will we achieve inexpensive functionalities? What drives our cross-platform scrums? We started with efficient vertically aligned portals. We are not ashamed to build, to optimize, and to onboard - always completely generating our business conversion and storytelling."

## (optional) Building

Install dependencies for npm and build with webpack

```
npm install
npm run build
```

This updates the cpblx bundle in the dist/ folder

## Usage

Include the library in your page

```
<script src="dist/cpblx.js"></script>
```

Include a space on the pages to display it e.g.

```
<div id="crap"></div>
```

Then put the corporate bollox generator to work.


### default is random dialect and random quantity

e.g.

```
<script>
document.getElementById('crap').innerHTML = cpblx();
</script>
```

See an example [here on github](https://rdjenkins.github.io/cpblx/).

View more corporate guff [on our server](https://agnate.co.uk/cpblx/). (We are working on how to get image options to work in this library).

### options for calling cpblx

```
cpblx()                           // random dialect and quantity
cpblx(dialect)                    // define the dialect, random quantity
cpblx(dialect, quantity)          // define dialect and quantity
cpblx(dialect, quantity, options) // define dialect, quantity, and
                                     other options (see below)
```

#### Dialects

0 - random

1 - general

2 - healthcare

3 - publishing

4 - learning

5 - voluntary

6 - COVID-19

7 - Brexiteer

8 - consipracy theory

9 - STEM

10 - legal

11 - entertainment

12 - craftale

13 - greenwash

#### Quantity

-12 - A chart in SVG format (generic dialect only)

-11 - A diagram in SVG format (some dialects only)

-10 - An abstract (healthcare dialect only)

-9 - The Why Case (only delivers some dialects)

-5 - Tweet with hashtags

-4 - Appraisal

-3 - Five things

-2.1 - The why how what

-2 - The Why

-1 - A brief bullet point

0 - random

5 - 5 sentences

10 - 10 sentences

#### Options

Send a JSON string of options

```
var cpblxoptions = `{
    "showlink": true
}`;
document.getElementById('crap').innerHTML = cpblx(0,0,cpblxoptions);
```

* *showlink* adds a URL to the end of the generated text - see examples for a demo
* *pid* presented in the URL (provided by using the *showlink* option) which sends the encoded details to recreate the exact same (memorable) cpblx output. *pid* includes everything it needs - dialect and amount options are ignored

### TODO

Move the generation mechanism to the same as used by the original nonsense generator [SciGen as ported to JavaScript by David Pomerenke](https://github.com/davidpomerenke/scigen.js). Note: [SciGen.js has been forked for cpblx](https://github.com/rdjenkins/scigen.js).

* reformat the cpblx rules to the [original SciGen (2005)](https://github.com/strib/scigen) text format ([done](https://github.com/rdjenkins/scigen.js/blob/master/rules/rules-original/cpblxrules.in))
* rework the rules generator files in Perl and JavaScript by adapting those from SciGen.js ([done](https://github.com/rdjenkins/scigen.js/blob/master/rules/compile-rules-cpblx.pl))
* add the mechanism to this TypeScript Library ([done](https://github.com/rdjenkins/cpblx/blob/main/src/cpblxgen.js))

Make use of the animals and colours somewhere.

* they are used on the [cpblx website](https://agnate.co.uk/cpblx/?n=-7&d=2) for the Blog-it feature but not used (yet) in this library
