import mermaid from 'mermaid';

function show(instructions: string) {
    var graph = '';
    const cb = function (svgGraph: string) {
        graph = svgGraph;
    };
    
    mermaid.render('null',instructions,cb);
    return graph;
}

export default show;