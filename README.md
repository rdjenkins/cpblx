# Corporate Bollox Generator (cpblx)

A JavaScript function to generate random corporate quotes.

## Building

Install dependencies and build with webpack

```
npm install
npm run build
```

This updates the cpblx package in the dist/ folder

## Usage

Include the library in your page

```
<script src="dist/cpblx.js"></script>
```

Include a space on the pages to display it e.g.

```
<div id="crap"></div>
```

Put the corporate bollox generator to work


### default is random dialect and random quantity


```
document.getElementById('crap').innerHTML = cpblx();
```

### options

```
cpblx()
cpblx(dialect)
cpblx(dialect, quantity)
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

-5 - Tweet with hashtags

-4 - Appraisal

-3 - Five things

-2.1 - The why how what

-2 - The Why

-1 - A brief bullet point

0 - random

5 - 5 sentences

10 - 10 sentences
