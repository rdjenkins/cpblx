import { BarChart, LineChart } from 'chartist';
import 'chartist/dist/index.css';
import { cpblxgen } from './cpblxgen';

function chart(elementID: string, dialect = 1) {
    if (!elementID) {
        throw new Error("missing SVGcontainer HTML element in chart()");
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

    if (document.getElementById(elementID)) {
        // a title div for the chart
        if (!document.getElementById(elementID+'_chart_title')) {
            const titleDiv = document.createElement("div");
            titleDiv.id = elementID+'_chart_title';
            document.getElementById(elementID)?.prepend(titleDiv);    
        }
        // the title itself
        if (document.getElementById(elementID+'_chart_titleh1')) {
            document.getElementById(elementID+'_chart_titleh1')?.remove();
        }
        var title = document.createElement("h1");
        title.id = elementID+'_chart_titleh1';
        document.getElementById(elementID+'_chart_title')?.appendChild(title);
        title.innerHTML = getLabel(dialect);

        // space for the chart itself
        if (document.getElementById(elementID+'_chart')) {
            document.getElementById(elementID+'_chart')?.remove();
        }
        var theChart = document.createElement("div");
        theChart.id = elementID + '_chart';
        document.getElementById(elementID)?.appendChild(theChart);
        
        // a description about the chart
        if (document.getElementById(elementID+'_chart_description')) {
            document.getElementById(elementID+'_chart_description')?.remove();
        }
        var description = document.createElement("p");
        description.id = elementID+'_chart_description';
        document.getElementById(elementID)?.appendChild(description);
        description.innerHTML = getDescription(dialect);
    } else {
        throw new Error(elementID + ' HTML element not found');
    }

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