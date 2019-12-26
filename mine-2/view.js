function interpolateColor(color1, color2, factor) {
    if (arguments.length < 3) {
        factor = 0.5;
    }
    var result = color1.slice();
    for (var i = 0; i < 3; i++) {
        result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return result;
};

function interpolateColors(color1, color2, steps) {
    var stepFactor = 1 / (steps - 1),
        interpolatedColorArray = [];

    color1 = color1.match(/\d+/g).map(Number);
    color2 = color2.match(/\d+/g).map(Number);

    for (var i = 0; i < steps; i++) {
        interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
    }

    return interpolatedColorArray;
}

var colors = interpolateColors('rgb(0,224,0)', 'rgb(240, 64, 0)', 100)

//#region Raphael js
// var View = { 
//     nodeSize: 40, // width and height of a single node, in pixel
//     //#region Styles
//     nodeStyle: {
//         [NODE_STATE.EMPTY]: {
//             fill: '#fff',
//             'stroke-opacity': 0.2, // the border
//         },
//         [NODE_STATE.BLOCKED]: {
//             fill: 'grey',
//             'stroke-opacity': 0.2,
//         },
//         'start': {
//             fill: '#0d0',
//             'stroke-opacity': 0.2,
//         },
//         'end': {
//             fill: '#e40',
//             'stroke-opacity': 0.2,
//         },
//         [NODE_STATE.OPENED]: {
//             fill: '#98fb98',
//             'stroke-opacity': 0.2,
//         },
//         [NODE_STATE.CLOSED]: {
//             fill: '#afeeee',
//             'stroke-opacity': 0.2,
//         },
//     },
//     nodeColorizeEffect: {
//         duration: 100,
//     },
//     nodeZoomEffect: {
//         duration: 200,
//         transform: 's1.2', // scale by 1.2x
//         transformBack: 's1.0',
//     },
//     pathStyle: {
//         stroke: 'yellow',
//         'stroke-width': 3,
//     },
//     //#endregion

//     init: function(){
//         this.paper = Raphael('draw_area') // get div
//         this.buildQueuePanel()
//     },

//     generateNodeView: function(grid){ 

//     },

//     setStateToNode: function(node, state, animateColor=false, animateZoom=false){
//     },

//     zoomNode: function(node, doesZoom){

//     },

//     queue: [],
//     queuePanelHeight: 75,
//     queueNodeStartX: 100,
//     queueNodeOffset: 10 + 50,
//     queueNodeY: 15,
//     movingNode: undefined,
//     buildQueuePanel: function(){
//         this.paper.rect(0, 0, this.paper.width, this.queuePanelHeight).attr({fill:'grey', 'stroke-width':0})
//         this.paper.text(50,35, "Queue: ").attr({'font-size':'16px', color:'white'})

//     },
//     addNodeToQueue: function(node, toFront){

//     },
//     adjustQueue: function(){

//     },

//     popQueue: function(){ 

//     },
//     /* Use array to know where the node in queue should sort into
//     ex: 7,5,1,2,3,9
//     array -> [4,3,0,1,2,5]
//     */
//    sortQueue: function(sortedQueue){

//     },
// }
//#endregion

var View = {
    nodeSize: 50, // width and height of a single node, in pixel
    //#region Styles
    nodeStyle: {
        [NODE_STATE.EMPTY]: {
            fill: '#fff',
            'stroke-opacity': 0.2, // the border
        },
        [NODE_STATE.BLOCKED]: {
            fill: 'grey',
            'stroke-opacity': 0.2,
        },
        'start': {
            fill: '#0d0',
            'stroke-opacity': 0.2,
        },
        'end': {
            fill: '#e40',
            'stroke-opacity': 0.2,
        },
        [NODE_STATE.OPENED]: {
            fill: '#98fb98',
            'stroke-opacity': 0.2,
        },
        [NODE_STATE.CLOSED]: {
            fill: '#afeeee',
            'stroke-opacity': 0.2,
        },
    },
    nodeColorizeEffect: {
        duration: 100,
    },
    nodeZoomEffect: {
        duration: 200,
        transform: 's1.2', // scale by 1.2x
        transformBack: 's1.0',
    },
    pathStyle: {
        stroke: 'yellow',
        'stroke-width': 3,
    },

    panel: undefined,
    queuePanel: undefined,
    queueGroup: [],
    draw_area_x: 0,
    draw_area_y: 0,

    init: function () {
        this.draw_area_x = d3.select('#draw_area').style('width')
        this.draw_area_y = d3.select('#draw_area').style('height')
        let panel = d3.select('#draw_area').append('svg')
                        .attr('width', this.draw_area_x)
                        .attr('height', this.draw_area_y)

        this.queuePanel = panel.append('g')
        this.panel = panel.append('g')
                        .attr('transform', 'translate(100,0)')
                        
        this.buildQueuePanel()
    },

    buildQueuePanel: function () {
        this.queuePanel.append('rect')
            .attr('width', '100px')
            .attr('height', this.draw_area_y)
            .attr('fill', 'lightgrey')
        
        this.queuePanel.append('text')
            .attr('transform', 'translate(20,40)')
            .style('font-weight', 'bold')
            .style('font-size', 'larger')
            .text('Queue')
        this.queueGroup = this.queuePanel.append('g')
        
        this.queueGroup.selectAll('rect')
            .data(d3.range(3)).enter().append('rect')
            .attr('transform', (d) => `translate(25, ${d*70+70})`)
            .attr("width", this.nodeSize)
            .attr("height", this.nodeSize)
            .style("fill", this.nodeStyle[NODE_STATE.EMPTY].fill)//function(d, i) { return d3.hsl(d.gridX/20 * 360, 1, d.gridY/20); })
            .style("stroke-opacity", this.nodeStyle[NODE_STATE.EMPTY]['stroke-opacity'])
            .style("stroke-width", 2)
            .style("stroke", 'grey')
    },

    popQueue: function(){
        this.queueGroup.select('rect').remove()
        this.queueGroup.data(d3.range(3)).update()
                .attr('transform', (d) => `translate(25, ${d*70+70})`)
    },
    pushQueue: function(gridX, gridY){
        this.queueGroup.append('rect')
            .attr("width", this.nodeSize)
            .attr("height", this.nodeSize)
            .style("fill", this.nodeStyle[NODE_STATE.EMPTY].fill)//function(d, i) { return d3.hsl(d.gridX/20 * 360, 1, d.gridY/20); })
            .style("stroke-opacity", this.nodeStyle[NODE_STATE.EMPTY]['stroke-opacity'])
            .attr('transform', `translate(${gridX * s}, ${gridY * s})`)
            .transition().duration(1000)
            .attr('transform', `translate(25, ${this.queueGroup.length*70+70})`)
            
    },

    generateNodeView: function (grid) {
        let s = this.nodeSize
        this.panel.selectAll("rect")
            .data(grid)  // GridNode
                .enter().append("rect")
            .attr("transform", (d) => `translate(${d.gridX * s}, ${d.gridY * s})`)
            .attr("width", s)
            .attr("height", s)
            .style("fill", this.nodeStyle[NODE_STATE.EMPTY].fill)//function(d, i) { return d3.hsl(d.gridX/20 * 360, 1, d.gridY/20); })
            .style("stroke-opacity", this.nodeStyle[NODE_STATE.EMPTY]['stroke-opacity'])
            .style("stroke-width", 2)
            .style("stroke", 'grey')
            .on("mouseover", () => {});
    }
}