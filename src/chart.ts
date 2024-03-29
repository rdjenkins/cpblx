import { BarChart, LineChart, PieChart, Interpolation } from 'chartist';
import 'chartist/dist/index.css';
import { cpblxgen } from './cpblxgen';

function intFromRange(low: number, high: number) {
    return Math.floor(Math.random() * (1 + high - low)) + low;
}

function chooseLabellingSystem() {
    // Further reading
    // https://en.wikipedia.org/wiki/Note_(typography)
    var choice = [
        ['i','ii','iii','iv','v','vi','vii','viii','ix','x','xi','xii','xiii','xiv'],
        ['I','II','III','IV','V','VI','VII','VIII','IX','X','XI','XII','XIII','XIV'],
        ['a','b','c','d','e','f','g','h','i','j','k','l','m','n'],
        ['A','B','C','D','E','F','G','H','I','J','K','L','M','N'],
        ['*','†','‡','¶','§','||','#','**','††','‡‡','¶¶','§§','##','***'],
    ];
    return choice[intFromRange(0,choice.length - 1)];
}

function chart(elementID: string, dialect = 1, title='', description='', data='') {
    if (!elementID) {
        throw new Error("missing target HTML element for chart()");
    }

    if (!document.getElementById(elementID)) {
        throw new Error(elementID + ' HTML element not found');
    }

    // makeChart() function sends data to chart() to draw a chart
    // only used when we are sure there are DIV tags ready for the chart
    function makeChart(id="0", d=dialect, title='', description='', data='') {
        return chart(id, d, title, description, data);
    }

    // if there are charts from the SciGen output then replace them with DIV tags
    if (document.getElementById(elementID)?.innerHTML.match(/{##chartist figure## package={(.*?)}}/gm)) {

        // in a DOM-safe way manipulate the text in the HTML element
        // and store the content in 'str'
        var str = document.getElementById(elementID)?.innerHTML; // get all the content of the element
        if (typeof str === 'undefined') { str=''};
        var placing = document.getElementById(elementID)?.previousSibling;
        var replacing = document.createElement("div");
        replacing.id = elementID+'X';
        var elementClass = document.getElementById(elementID)?.getAttribute('class');
        if (!elementClass) { elementClass = ''}; // if it is NULL or undefined then just make it empty
        replacing.setAttribute('class', elementClass); 
        document.getElementById(elementID)?.insertAdjacentElement('afterend',replacing);
        document.getElementById(elementID)?.remove();        
        replacing.id = elementID;

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
        while (!(point || line || area || counter>100)) { // counter just in case it gets stuck for some bizarre reason
            point = truefalse();
            line = truefalse();
            area = truefalse();
            counter++;
        }
        return {"point": point, "line": line, "area": area};
    }

    // a title div for the chart
    if (!document.getElementById(elementID + '_chart_title')) {
        const titleDiv = document.createElement("div");
        titleDiv.id = elementID + '_chart_title';
        document.getElementById(elementID)?.prepend(titleDiv);
    }
    // the title itself
    if (document.getElementById(elementID + '_chart_titleh')) {
        document.getElementById(elementID + '_chart_titleh')?.remove();
    }
    var titleH = document.createElement("h2");
    titleH.id = elementID + '_chart_titleh';
    document.getElementById(elementID + '_chart_title')?.appendChild(titleH);
    titleH.innerHTML = (title != '') ? title : getLabel(dialect);

    // space for the chart itself
    if (document.getElementById(elementID + '_chart')) {
        document.getElementById(elementID + '_chart')?.remove();
    }
    var theChart = document.createElement("div");
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

    if (mostlytrue()) { // mostly do a line chart

        const lineChartStyle = lineChartStylePicker();
        var lineChartSmoothing = [Interpolation.none(), Interpolation.simple(), Interpolation.monotoneCubic(), Interpolation.cardinal()][intFromRange(0,3)];
        if (lineChartStyle.area || lineChartStyle.line) { // 'step' smoothing only makes sense when there is an area or a line
            if (truefalse(0.1)) { // so give step a 10% chance here
                lineChartSmoothing = Interpolation.step();
            }
        }
        // labels from cpblx are too long to look neat so replace them in the chart
        const labelMarkers = chooseLabellingSystem();

        function choose(things = Array([''])) {
            return things[Math.floor(Math.random() * things.length)];
        }

        var labelSeparator = choose(Array([")"], ["."], [" -"],[": "]));

        // pick number (the number of data matches passed or a random one)
        var n = (matches)? matches.length : intFromRange(5, 9);
        // pick range
        var upper = intFromRange(20, 50);
        var lower = intFromRange(0, 10);
        // generate n labels and data points
        var labels = [];
        var series1 = [];
        var series2 = [];
        var series3 = [];
        var tableExplainingLabels = "<p><i>(" + title + '. <i>';
        for (let i = 0; i < n; i++) {
            if (matches) {
                labels.push(labelMarkers[i]);
                tableExplainingLabels = tableExplainingLabels + labelMarkers[i] + labelSeparator + " " + matches[i]+ ", ";
            } else {
                labels.push(getLabel(dialect));
            }
            series1.push(intFromRange(lower, upper));
            series2.push(intFromRange(lower, upper));
            series3.push(intFromRange(lower, upper));
        }
        tableExplainingLabels = tableExplainingLabels.replace(/,\s*$/,'.) <br>'); // trims the trailing comma (and any whitespace after)
        if (Math.random() > 0.5) {
            series1.sort();
        }
        if (Math.random() > 0.5) {
            series2.sort();
        }
        if (Math.random() > 0.5) {
            series3.sort();
        }

        // add explanatory table for the labels in the chart
        descriptionP.innerHTML = tableExplainingLabels + descriptionP.innerHTML + "</i></p>";

        new LineChart(
            '#' + elementID + '_chart',
            {
                labels: labels,
                series: [
                    series1,
                    series2,
                    series3,
                ]
            },
            {
                low: 0,
                height: height + 'px',
                showArea: lineChartStyle.area,
                showLine: lineChartStyle.line,
                showPoint: lineChartStyle.point,
                fullWidth: true,
                lineSmooth: lineChartSmoothing,
            }
        );

    } else if(truefalse()) { // do a donut chart

        // labels from cpblx are too long to look neat so replace them in the chart
        const labelMarkers = chooseLabellingSystem();

        function choose(things = Array([''])) {
            return things[Math.floor(Math.random() * things.length)];
        }

        var labelSeparator = choose(Array([")"], ["."], [" -"],[": "]));

        // pick number (the number of data matches passed or a random one)
        var n = (matches)? matches.length : intFromRange(5, 9);
        // pick range
        var upper = intFromRange(20, 50);
        var lower = intFromRange(0, 10);
        // generate n labels and data points
        var labels = [];
        var series1 = [];
        var seriesTotal = 0;
        let dataPoint;
        var tableExplainingLabels = "<p><i>(" + title + '. <i>';
        for (let i = 0; i < n; i++) {
            if (matches) {
                labels.push(labelMarkers[i]);
                tableExplainingLabels = tableExplainingLabels + labelMarkers[i] + labelSeparator + " " + matches[i]+ ", ";
            } else {
                labels.push(getLabel(dialect));
            }
            dataPoint = intFromRange(lower, upper);
            seriesTotal = seriesTotal + dataPoint;
            series1.push(dataPoint);
        }
        tableExplainingLabels = tableExplainingLabels.replace(/,\s*$/,'.) <br>'); // trims the trailing comma (and any whitespace after)
        if (Math.random() > 0.5) {
            series1.sort();
        }

        // add explanatory table for the labels in the chart
        descriptionP.innerHTML = tableExplainingLabels + descriptionP.innerHTML + "</i></p>";


        new PieChart(
            '#' + elementID + '_chart',
            {
              series: series1,
              labels: labels,
            },
            {
              donut: true,
//              labelPosition: truefalse() ? 'inside' : 'outside',
              total: truefalse() ? seriesTotal : seriesTotal * 2, // * 2 draws a gauge chart
              donutWidth: truefalse() ? '50%' : '30%',
              startAngle: 270,
              showLabel: true
            }
          );
    }
    else { // a bar chart

        descriptionP.innerHTML = "<p><i>" + descriptionP.innerHTML + "</i></p>";

        // pick number
        var n = (matches)? matches.length : intFromRange(3, 7);
        // pick range
        var upper = intFromRange(5, 10);
        var lower = intFromRange(-3, 3);
        // generate n labels and data points
        var labels = [];
        var series1 = [];
        for (let i = 0; i < n; i++) {
            if (matches) {
                labels.push(matches[i]);
            } else {
                labels.push(getLabel(dialect));
            }
            series1.push(intFromRange(lower, upper));
        }
        if (Math.random() > 0.5) {
            series1.sort();
        }
        new BarChart(
            '#' + elementID + '_chart',
            {
                labels: labels,
                series: [
                    series1
                ]
            },
            {
                horizontalBars: mostlytrue(),
                height: height + 'px',
                axisY: {
                    offset: 120,
                },
                axisX: {
                    onlyInteger: true,
                }
            });
    }
}

export default chart;