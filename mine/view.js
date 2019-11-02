var View = { 
    nodeSize: 40, // width and height of a single node, in pixel
    //#region Styles
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
    //#endregion
    
    init: function(){
        this.paper = Raphael('draw_area') // get div
        this.buildQueuePanel()
    },

    generateNodeView: function(grid){ 
        // let f, g, h, styles = {'font-size': '10px', 'text-anchor': 'begin'}
        for(var i = 0; i < grid.length; i++){
            var row = grid[i]
            for(var j = 0; j < row.length; j++){
                var rect = this.paper.rect(i*this.nodeSize, j*this.nodeSize + this.queuePanelHeight, 
                    this.nodeSize, this.nodeSize)
                // f = this.paper.text(i*this.nodeSize, j*this.nodeSize, "10"); f.attr(styles).transform("t5,7")
                // g = this.paper.text(i*this.nodeSize, j*this.nodeSize, "0"); g.attr(fontStyle).attr({'text-anchor':'end',transform:'translate(50,6)'})
                // h = this.paper.text(i*this.nodeSize, j*this.nodeSize, "0"); h.attr(fontStyle).attr({'text-anchor':'end',transform:'translate(50,44)'})

                rect.attr(this.nodeStyle.normal)
                row[j].view.rect = rect
                // row[j].view.f    = f
                // row[j].view.g    = g
                // row[j].view.h    = h

            }
        }
        console.log(grid)
    },
    
    // TODO: Operation must have its opposite for undo operation
    possibleOperation: ['toQueue', 'fromQueue', 'open', 'close', 'empty', 'start', 'end'],
    setStateToNode: function(node, state, animateColor=false, animateZoom=false){
        console.log('node :', node);
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
            case NODE_STATE.BLOCKED: style = this.nodeStyle.blocked
                break
        }
        
        if(animateColor)
            node.view.rect.animate(style, this.nodeColorizeEffect.duration)
        else 
            node.view.rect.stop().attr(style)

        // if(animateZoom)
        //     node.view.group.toFront()
        //         .attr({transform: this.nodeZoomEffect.transform})
        //         .animate({transform: this.nodeZoomEffect.transformBack}, this.nodeZoomEffect.duration)
    },

    queue: [],
    queuePanelHeight: 75,
    queueNodeStartX: 100,
    queueNodeOffset: 10 + 50,
    queueNodeY: 15,
    movingNode: undefined,
    buildQueuePanel: function(){
        this.paper.rect(0, 0, this.paper.width, this.queuePanelHeight).attr({fill:'grey', 'stroke-width':0})
        this.paper.text(50,35, "Queue: ").attr({'font-size':'16px', color:'white'})
        
    },
    addNodeToQueue: function(node, toFront){
        let destX = this.queueNodeStartX
        if(!toFront)
            destX = this.queueNodeStartX + this.queue.length*this.queueNodeOffset
        let movingRect = this.paper.rect(node.view.rect.attrs.x, node.view.rect.attrs.y, this.nodeSize, this.nodeSize).attr(this.nodeStyle.opened).animate({
            x: destX,
            y: this.queueNodeY
        }, 500, "ease-out")

        movingRect.data('ref', node.view.rect)
        // movingRect.click($.proxy(this.popQueue, this)) // for debug purpose

        movingRect.hover(function(){
            this.data('ref').attr({fill:'yellow'})
        }, function(){
            this.data('ref').attr({fill: '#98fb98'})
        })
        
        if(toFront)
            this.queue.unshift(movingRect)
        else
            this.queue.push(movingRect)
        this.adjustQueue()
    },
    adjustQueue: function(){
        for(let i = 0; i < this.queue.length; i++){
            this.queue[i].animate({x: this.queueNodeStartX + this.queueNodeOffset*i},300)
        }
    },
    
    popQueue: function(){ 
        // let rect = this.queue.slice(index,index+1)[0]
        let rect = this.queue.shift()

        rect.animate({
            x: rect.data('ref').attrs.x, 
            y: rect.data('ref').attrs.y
        }, 400, 'ease-out', function(){this.remove()})
        this.adjustQueue()
    },
    /* Use array to know where the node in queue should sort into
    ex: 7,5,1,2,3,9
    array -> [4,3,0,1,2,5]
    */
   sortQueue: function(indexArray){
       let newQueue = []
       for(let i = 0; i < indexArray.length; i++){
           newQueue.push(this.queue[indexArray.indexOf(i)])
        }
        this.queue = newQueue
        this.adjustQueue()
    },

    //#region Path Drawing
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
    //#endregion

    //#region Coordinate Helper
    paperToGrid: function(coorX, coorY){ // Convert Paper coordinate to grid idx
        return {x: Math.floor((coorY-this.queuePanelHeight)/this.nodeSize), y: Math.floor(coorX/this.nodeSize)}
    }
    //#endregion
}
