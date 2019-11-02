/*
Controller
- Control play button & states
- Connect View & Calculator
- 

View
- Change node attribute & animate them
- Draw line
- Move node to queue

Calculator
- Where command pattern exists
- 

Operation between calculator & view (and informations)
- Open (node)
- Close (node)
- toQueue (node)
- popQueue ()
- sortQueue ()

*/

var Controller = StateMachine.create({
    initial: 'none',
    events: [
        {
            name: 'init',
            from: 'none',
            to:   'ready'
        },
        {
            name: 'search',
            from: 'starting',
            to:   'searching'
        },
        // 
    ]
})

$.extend(controller, {
    gridSize: [50,30],
    grids: [],
    startNode: undefined,
    endNode: undefined,

    //Asynchronous transition from `none` state to `ready` state.
    onleavenone: function() {
        // var numCols = this.gridSize[0],
        //     numRows = this.gridSize[1];

        // this.grid = new PF.Grid(numCols, numRows);

        // View.init({
        //     numCols: numCols,
        //     numRows: numRows
        // });
        // View.generateGrid(function() {
        //     Controller.setDefaultStartEndPos();
        //     Controller.bindEvents();
        //     Controller.transition(); // transit to the next state (ready)
        // });

        // this.$buttons = $('.control_button');

        // this.hookPathFinding();

        return StateMachine.ASYNC;
        // => ready
    },
    onSearch: function(){

    },
    init: function(){

    },

    generateNode: function(){
        this.grid = []
        for(var i = 0; i < this.numCols; i++){
            var row = []
            for(var j = 0; j < this.numRows; j++){
                row.append(GridNode())
            }
        }
        View.generateNodeView(this.grid)

    },

    
    setStartPos: function(node){
        if(this.startNode != undefined){
            this.setNodeState(this.startNode, NODE_STATE.EMPTY)
        }
        this.startNode = node
        this.setNodeState(this.startNode, NODE_STATE.START)
    },
    setEndPos: function(){
        if(this.endNode != undefined){
            this.setNodeState(this.endNode, NODE_STATE.EMPTY)
        }
        this.endNode = node
        this.setNodeState(this.endNode, NODE_STATE.END)
    },
    
    setNodeState: function(node, state){ // Set state in Controller & View
        node.state = state
        View.setStateToNode(node,state)
    }
})

var View = { 
    nodeSize: 50, // width and height of a single node, in pixel
    nodeStyle: {
        normal: {
            fill: '#fff',
            'stroke-opacity': 0.2, // the border
        },
        blocked: {
            fill: 'grey',
            'stroke-opacity': 0.2,
        },
        start: {
            fill: '#0d0',
            'stroke-opacity': 0.2,
        },
        end: {
            fill: '#e40',
            'stroke-opacity': 0.2,
        },
        opened: {
            fill: '#98fb98',
            'stroke-opacity': 0.2,
        },
        closed: {
            fill: '#afeeee',
            'stroke-opacity': 0.2,
        },
        failed: {
            fill: '#ff8888',
            'stroke-opacity': 0.2,
        },
        tested: {
            fill: '#e5e5e5',
            'stroke-opacity': 0.2,
        },
    },
    possibleOperation: ['toQueue', 'open', 'close'],
    nodeColorizeEffect: {
        duration: 50,
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

    init: function(){
        this.paper = Raphael('draw_area')
        this.numCols = 26
        this.numRows = 20
    },

    generateNodeView: function(grid){

        for(var i = 0; i < grid.length; i++){
            var row = grid[i]
            for(var j = 0; j < row.length; j++){
                var rect = this.paper.rect(i*this.nodeSize, j*this.nodeSize, 
                    this.nodeSize, this.nodeSize)
                rect.attr(this.nodeStyle.normal)
                row[j].rect = rect
            }
        }
    },

    setStateToNode: function(node, state){
        var style
        switch(state){
            case NODE_STATE.START: style = this.nodeStyle.start
                break
            case NODE_STATE.OPENED: style = this.nodeStyle.opened
                break
            case NODE_STATE.CLOSED: style = this.nodeStyle.closed
                break
            case NODE_STATE.EMPTY: style = this.nodeStyle.normal
                break
            case NODE_STATE.END: style = this.nodeStyle.end
                break
        }
        // Animate change color
        node.rect.animate(style, this.nodeColorizeEffect.duration)
    },

    // Path
    path: undefined,
    buildSvgPath: function(positions){
        var i, strs = [], size = this.nodeSize

        strs.push('M' + (path[0][0] * size + size / 2) + ' ' +
                  (path[0][1] * size + size / 2));
        for (i = 1; i < path.length; ++i) {
            strs.push('L' + (path[i][0] * size + size / 2) + ' ' +
                        (path[i][1] * size + size / 2));
        }

        return strs.join(' ')
    },
    clearPath: function(){
        if(this.path) this.path.remove()
    },
    drawPath: function(path) {
        if (!path.length) {
            return;
        }
        var svgPath = this.buildSvgPath(path);
        this.path = this.paper.path(svgPath).attr(this.pathStyle);
    },

    // Helper
    paperToGrid: function(coorX, coorY){ // Convert Paper coordinate to grid idx
        return {x: Math.floor(coorX/this.nodeSize), y: Math.floor(coorY/this.nodeSize)}
    }
}

// Initialize variable, or get div
inits= [
    CodePanel,  // For code panel
    Calculator, // For algorithm
    View,       // For grid view
    Controller, // For time control?
]

window.onload = function() {
    if (!Raphael.svg) {
        window.location = './notsupported.html';
    }

    // suppress select events
    $(window).bind('selectstart', function(event) {
        event.preventDefault();
    });

    inits.forEach(obj => {
        obj.init()
    });
};


