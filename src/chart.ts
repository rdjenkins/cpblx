import { BarChart, LineChart } from 'chartist';
import 'chartist/dist/index.css';
import { cpblxgen } from './cpblxgen';

function chart(elementID: string, dialect = 1, title='', description='', data='') {
    if (!elementID) {
        throw new Error("missing SVGcontainer HTML element in chart()");
    }

    if (!document.getElementById(elementID)) {
        throw new Error(elementID + ' HTML element not found');
    }

    function makeChart(id="0", d=dialect, title='', description='', data='') {
        return chart(id, d, title, description, data);
    }

    if (document.getElementById(elementID)?.innerHTML.match(/{##chartist figure## package={(.*?)}}/gm)) {
        console.log('chartist figure detected');

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
//            var titleDiv = document.createElement("div");
//            titleDiv.id = elementID + '_chart_title' + counter;
//            document.getElementById(elementID)?.append(titleDiv);
//            var titleElem = document.createElement("h1");
//            titleElem.id = elementID + '_chart_titleh1' + counter;
//            document.getElementById(elementID + '_chart_title' + counter)?.appendChild(titleElem);
//            titleElem.innerHTML = m[1];
            var thisChartId = elementID + '_chart' + counter;
            tempstr = tempstr.replace(/{##chartist figure## package={{title\. (.*?)} {description\. (.*?)} (.*?}})}}/, '<div id="' + thisChartId + '"></div>');
//            str = str.replace(/{##chartist figure## package={(.*?)}}}}/m, '<div id="' + thisChartId + '"></div>');

            // The result can be accessed through the `m`-variable.
            chartIDs.push([thisChartId, m[1], m[2], m[3]]);
            m.forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
            });
            counter++;
        }
        replacing.innerHTML = tempstr;
        console.log({chartIDs});
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

    function truefalse(cutoff = 0.3) {
        return (Math.random() > cutoff) ? true : false;
    }

    // a title div for the chart
    if (!document.getElementById(elementID + '_chart_title')) {
        const titleDiv = document.createElement("div");
        titleDiv.id = elementID + '_chart_title';
        document.getElementById(elementID)?.prepend(titleDiv);
    }
    // the title itself
    if (document.getElementById(elementID + '_chart_titleh1')) {
        document.getElementById(elementID + '_chart_titleh1')?.remove();
    }
    var titleH1 = document.createElement("h1");
    titleH1.id = elementID + '_chart_titleh1';
    document.getElementById(elementID + '_chart_title')?.appendChild(titleH1);
    titleH1.innerHTML = (title != '') ? title : getLabel(dialect);

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

    function intFromRange(low: number, high: number) {
        return Math.floor(Math.random() * (1 + high - low)) + low;
    }

    var height = window.innerHeight * 0.5;

    if (Math.random() > 0.3) {

        // pick number
        var n = intFromRange(5, 9);
        // pick range
        var upper = intFromRange(20, 50);
        var lower = intFromRange(0, 10);
        // generate n labels and data points
        var labels = [];
        var series1 = [];
        var series2 = [];
        var series3 = [];
        for (let i = 0; i < n; i++) {
            labels.push(getLabel(dialect));
            series1.push(intFromRange(lower, upper));
            series2.push(intFromRange(lower, upper));
            series3.push(intFromRange(lower, upper));
        }
        if (Math.random() > 0.5) {
            series1.sort();
        }
        if (Math.random() > 0.5) {
            series2.sort();
        }
        if (Math.random() > 0.5) {
            series3.sort();
        }
        new LineChart(
            '#' + elementID + '_chart',
            {
                labels: labels,
                series: [
                    series1,
                    series2,
                    series3
                ]
            },
            {
                low: 0,
                height: height + 'px',
                showArea: truefalse(),
            }
        );

    } else {

        // pick number
        var n = intFromRange(3, 7);
        // pick range
        var upper = intFromRange(5, 10);
        var lower = intFromRange(-3, 3);
        // generate n labels and data points
        var labels = [];
        var series1 = [];
        for (let i = 0; i < n; i++) {
            labels.push(getLabel(dialect));
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
                horizontalBars: truefalse(),
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