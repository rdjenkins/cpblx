# Corporate Bollox Generator (cpblx)

A JavaScript function to generate random corporate quotes.

## Building

```
npm install
npm run build
```

## Usage

Include the library in your page

```
<script src="./dist/cpblx.js"></script>
```

Include a space for it to go

```
<div id="crap"></div>
```

Call the corporate bollox generator

### random

```
document.getElementById('crap').innerHTML = cpblx();
```

### default (General Corporate, Tweet)

'false' means not random dialect and quantity - it defaults to 1 , -5 (see below)

```
document.getElementById('crap').innerHTML = cpblx(false);
```

### other options

cpblx(false, dialect, quantity)

Dialects
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

Quantity
-2, // The why how what
-1, // The Why
-3, // Five things
-4, // Appraisal
0, // A brief bullet point
5, // 5 sentences
10, // 10 sentences
-5, // Tweet with hashtags