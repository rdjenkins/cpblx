import Chart from 'chart.js/auto';
import { cpblxgen } from './cpblxgen';

function intFromRange(low: number, high: number) {
    return Math.floor(Math.random() * (1 + high - low)) + low;
}

function chooseLabellingSystem() {
    // Further reading
    // https://en.wikipedia.org/wiki/Note_(typography)
    var choice = [
        ['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x', 'xi', 'xii', 'xiii', 'xiv'],
        ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV'],
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'],
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'],
        ['*', '†', '‡', '¶', '§', '||', '#', '**', '††', '‡‡', '¶¶', '§§', '##', '***'],
    ];
    return choice[intFromRange(0, choice.length - 1)];
}

function chart2(elementID: string, output = '', dialect = 1, title = '', description = '', data = '') {
    if (!elementID) {
        throw new Error("missing target HTML element for chart()");
    }

    if (!document.getElementById(elementID)) {
        throw new Error(elementID + ' HTML element not found');
    }

    // makeChart() function sends data to chart() to draw a chart
    // only used when we are sure there are CANVAS tags ready for the chart
    function makeChart(id = "0", d = dialect, title = '', description = '', data = '') {
        return chart2(id, '', d, title, description, data);
    }

    // if there are charts from the SciGen output then replace them with DIV tags
    if (output.match(/{##chartist figure## package={(.*?)}}/gm)) {
        //if (document.getElementById(elementID)?.innerHTML.match(/{##chartist figure## package={(.*?)}}/gm)) {

        // in a DOM-safe way manipulate the text in the HTML element
        // and store the content in 'str'
        var str = output; // get all the content of the element
        //        var str = document.getElementById(elementID)?.innerHTML; // get all the content of the element
        if (typeof str === 'undefined') { str = '' };
        var replacing = document.createElement("div");
        replacing.id = elementID + 'X';
        var elementClass = document.getElementById(elementID)?.getAttribute('class');
        if (!elementClass) { elementClass = '' }; // if it is NULL or undefined then just make it empty
        replacing.setAttribute('class', elementClass);

        let m; // to hold the matches
        var counter = 0; // and to count them
        var chartIDs = [];
        const regex = /{##chartist figure## package={{title\. (.*?)} {description\. (.*?)} (.*?}})}}/gm;
        var tempstr = str;
        while ((m = regex.exec(str)) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            var thisChartId = elementID + '_chart' + counter;
            tempstr = tempstr.replace(/{##chartist figure## package={{title\. (.*?)} {description\. (.*?)} (.*?}})}}/, '<div id="' + thisChartId + '"></div>');

            // The result can be accessed through the `m`-variable.
            chartIDs.push([thisChartId, m[1], m[2], m[3]]);
            counter++;
        }
        replacing.innerHTML = tempstr;
        document.getElementById(elementID)?.insertAdjacentElement('afterend', replacing);
        document.getElementById(elementID)?.remove();
        replacing.id = elementID;

        // draw all the charts
        chartIDs.forEach(chartToDo => {
            makeChart(chartToDo[0], dialect, chartToDo[1], chartToDo[2], chartToDo[3]);
        });

        return;
    }


    function getLabel(d = dialect) {
        switch (d) {
            case 2:
                return cpblxgen('NHS_THING');
            case 4:
                return cpblxgen('ED_THING');
            case 7:
                return cpblxgen('BREXIT_THING');
            case 8:
                return cpblxgen('CON_THING');
            default:
                return cpblxgen('GENERIC_THING');
        }
    }

    function getDescription(d = dialect) {
        switch (d) {
            case 2:
                return cpblxgen('NHS_RCT_METHOD_FILLER');
            case 4:
                return cpblxgen('ED_WHY_HOW_WHAT');
            case 7:
                return cpblxgen('BREXIT_WHY_HOW_WHAT_FILLER');
            case 8:
                return cpblxgen('CON_WHY_HOW_WHAT');
            default:
                return cpblxgen('EVAL_SEC_INTRO_A');
        }
    }

    function truefalse(cutoff = 0.5) {
        return (Math.random() > (1 - cutoff)) ? true : false;
    }

    function mostlytrue() {
        return truefalse(0.7);
    }

    function lineChartStylePicker() {
        var point, line, area = false;
        var counter = 0;
        while (!(point || line || area || counter > 100)) { // counter just in case it gets stuck for some bizarre reason
            point = truefalse();
            line = truefalse();
            area = truefalse();
            counter++;
        }
        return { "point": point, "line": line, "area": area };
    }

    var canvasWidth = document.getElementById(elementID)?.offsetWidth;
    if (canvasWidth) {
        if (canvasWidth > 768) {
            canvasWidth = 768;
        }
    } else {
        canvasWidth = 768;
    }

    var element = document.getElementById(elementID);
    if (element) {
        element.setAttribute('style', 'width: ' + canvasWidth + 'px;');
    }

    title = (title != '') ? title : getLabel(dialect);

    // space for the chart itself
    if (document.getElementById(elementID + '_chart')) {
        document.getElementById(elementID + '_chart')?.remove();
    }
    var theChart = document.createElement("canvas");
    theChart.id = elementID + '_chart';
    document.getElementById(elementID)?.appendChild(theChart);

    // a description about the chart
    if (document.getElementById(elementID + '_chart_description')) {
        document.getElementById(elementID + '_chart_description')?.remove();
    }
    var descriptionP = document.createElement("p");
    descriptionP.id = elementID + '_chart_description';
    document.getElementById(elementID)?.appendChild(descriptionP);
    descriptionP.innerHTML = (description !== '') ? description : getDescription(dialect);

    var height = window.innerHeight * 0.5;

    if (data !== '') {
        const regex = /{+([^}]*)}/mg;
        var matches = [];
        let m;
        while ((m = regex.exec(data)) !== null) {
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            matches.push(m[1]);
        }
    }

    // labels from cpblx are too long to look neat so replace them in the chart
    const labelMarkers = chooseLabellingSystem();
    function choose(things = Array([''])) {
        return things[Math.floor(Math.random() * things.length)];
    }
    var labelSeparator = choose(Array([")"], ["."], [" -"], [": "]));
    // pick number (the number of data matches passed or a random one)
    var n = (matches) ? matches.length : intFromRange(5, 9);
    // pick range
    var upper = intFromRange(20, 50);
    var lower = intFromRange(0, 10);
    // generate n labels and data points
    var labels = [];
    var series1 = [];
    var series1label = getLabel(1); // generic label for the moment
    var series2 = [];
    var series2label = getLabel(1); // generic label for the moment
    var tableExplainingLabels = "<p><i>(" + title + '. <i>';
    for (let i = 0; i < n; i++) {
        if (matches) {
            labels.push(labelMarkers[i]);
            tableExplainingLabels = tableExplainingLabels + labelMarkers[i] + labelSeparator + " " + matches[i] + ", ";
        } else {
            labels.push(getLabel(dialect));
        }
        series1.push(intFromRange(lower, upper));
        series2.push(intFromRange(lower, upper));
    }
    tableExplainingLabels = tableExplainingLabels.replace(/,\s*$/, '.) <br>'); // trims the trailing comma (and any whitespace after)
    if (Math.random() > 0.5) {
        series1.sort();
    }
    if (Math.random() > 0.5) {
        series2.sort();
    }
    // add explanatory table for the labels in the chart
    descriptionP.innerHTML = tableExplainingLabels + descriptionP.innerHTML + "</i></p>";

    // in the type below 'bubble' and 'scatter' excluded
    // and the use of multiline conditional operators is because
    // the type can't be easily assigned with a string 

    var fill = truefalse(); // for line charts

    new Chart(elementID + '_chart', {
        type: truefalse(0.3) ? 'bar' : 
                truefalse(0.1) ? 'polarArea' :
                    truefalse(0.6) ? 'line' : 
                        truefalse(0.3) ? 'radar' :
                            truefalse(0.2) ? 'doughnut' : 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: series1label,
                data: series1,
                borderWidth: intFromRange(1,3),
                cubicInterpolationMode: truefalse() ? 'monotone' : 'default',
                fill: fill,
            },
            {
                label: series2label,
                data: series2,
                borderWidth: intFromRange(1,3),
                cubicInterpolationMode: truefalse() ? 'monotone' : 'default',
                fill: fill,
            }]
        },
        options: {
            indexAxis: truefalse() ? 'x': 'y',
            scales: {
                y: {
                    beginAtZero: truefalse()
                }
            },
            plugins: {
                title: {
                  display: true,
                  text: title,
                }
              }
        }
    });
}

export default chart2;