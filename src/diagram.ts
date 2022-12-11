import mermaid from 'mermaid';

function show(instructions: string) {
    var graph = '';
    const cb = function (svgGraph: string) {
        graph = svgGraph;
    };
    
    mermaid.render('id'+Date.now(),instructions,cb);
    return graph;
}

export default show;