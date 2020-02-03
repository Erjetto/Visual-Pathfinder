var Controller = StateMachine.create({
    initial: 'none',
    events: [
        { name: 'init'      , from: 'none'      , to: 'ready' },
        { name: 'search'    , from: 'starting'  , to: 'searching' },
        { name: 'pause'     , from: 'searching' , to: 'paused' },
        { name: 'finish'    , from: 'searching' , to: 'finished' },
        { name: 'resume'    , from: 'paused'    , to: 'searching' },
        { name: 'cancel'    , from: 'paused'    , to: 'ready' },
        { name: 'modify'    , from: 'finished'  , to: 'modified' },
        { name: 'reset'     , from: '*'         , to: 'ready' },

        { name: 'clear'     , from: ['finished', 'modified']            , to: 'ready' },
        { name: 'start'     , from: ['ready', 'modified', 'restarting'] , to: 'starting' },
        { name: 'restart'   , from: ['searching', 'finished']           , to: 'restarting' },

        { name: 'dragStart' , from: ['ready', 'finished'], to: 'draggingStart' },
        { name: 'dragEnd'   , from: ['ready', 'finished'], to: 'draggingEnd' },
        { name: 'drawWall'  , from: ['ready', 'finished'], to: 'drawingWall' },
        { name: 'eraseWall' , from: ['ready', 'finished'], to: 'erasingWall' },
        
        { name: 'rest'      , from: ['draggingStart', 'draggingEnd', 'drawingWall', 'erasingWall'], to: 'ready' },
    ],
})

$.extend(Controller, {
    numCols: 20,
    numRows: 20,
    grids: [],
    startNode: undefined,
    endNode: undefined,

    //Asynchronous transition from `none` state to `ready` state.
    oninit: function() {
        // this.grid = new PF.Grid(numCols, numRows);
        console.log('Initializing Controller')
        // this.bindGridNodeState()

        this.generateNode()
        
        View.generateNodeView(this.grids.flat())
        View.panel.selectAll('g')   // Bind all grid node event
            .on('mousemove',    (d)=>this.nodeMouseMove(d))
            .on('mousedown',    (d)=>this.nodeMouseDown(d))
            .on('mouseup',      (d)=>this.nodeMouseUp(d))
            .on('mouseenter',   (d)=>this.nodeMouseEnter(d))
        View.queueArray = Calculator.queue

        // return
        // this.bindMouseEvent()
        this.setStartPos(this.grids[3][3])
        this.setEndPos(this.grids[3][7])
        
        PlayPanel.playButton.click($.proxy(this.onClickPlay, this))
        PlayPanel.backButton.click($.proxy(this.onClickBack, this))
        PlayPanel.forwardButton.click($.proxy(this.onClickForward, this))
        
        // Calculator.onAddQueue.push(function(node, toFront=false){
        //     // View.addNodeToQueue(node, toFront)
        //     View.updateQueue()
        // })
        // Calculator.onPopQueue.push(function(node){
        //     View.updateQueue()
        // })
        // Calculator.onChangeState.push(function(node, state){
        //     if(node == this.startNode || node == this.endNode) return
        //     // View.setStateToNode(node,state,true,true)
        // }.bind(this))
        // Calculator.onSortQueue.push(function(queue){
        //     View.updateQueue()
        // })

        Calculator.prototype = {
            get currentNode(){
                return this._currentNode;
            },
            set currentNode(v){
                // View.zoomNode(this._currentNode, false)
                this._currentNode = v
                // View.zoomNode(this._currentNode, true)
            }
        }
        
        // => ready
    },

    onsearch: function(){
        // starting -> searching
    },
    onfinish: function(){

    },
    onclear: function(){

    },
    onstart: function(){
        // Initialize some before start searching
        Calculator.startNode = this.startNode
        this.startNode.parent = this.startNode
        Calculator.endNode = this.endNode
        Calculator.grids = this.grids
        // set neighbours
        let startX, startY, endX, endY
        for (let y = 0; y < this.numRows; y++) {
            for (let x = 0; x < this.numCols; x++) {
                let currNode = this.grids[y][x]
                startY = y == 0
                startX = x == 0
                endY = y == this.numRows - 1
                endX = x == this.numCols - 1

                if(!startX && !startY && this.grids[y-1][x-1] != NODE_STATE.BLOCKED)
                    currNode.neighbours.push(this.grids[y-1][x-1])

                if(!startY && this.grids[y-1][x] != NODE_STATE.BLOCKED)
                    currNode.neighbours.push(this.grids[y-1][x])

                if(!endX && !startY && this.grids[y-1][x+1] != NODE_STATE.BLOCKED)
                    currNode.neighbours.push(this.grids[y-1][x+1])

                if(!endX&& this.grids[y][x+1] != NODE_STATE.BLOCKED)
                    currNode.neighbours.push(this.grids[y][x+1])

                if(!endX && !endY && this.grids[y+1][x+1] != NODE_STATE.BLOCKED)
                    currNode.neighbours.push(this.grids[y+1][x+1])
                    
                if(!endY && this.grids[y+1][x] != NODE_STATE.BLOCKED)
                    currNode.neighbours.push(this.grids[y+1][x])

                if(!startX && !endY && this.grids[y+1][x-1] != NODE_STATE.BLOCKED)
                    currNode.neighbours.push(this.grids[y+1][x-1])
                    
                if(!startX && this.grids[y][x-1] != NODE_STATE.BLOCKED)
                    currNode.neighbours.push(this.grids[y][x-1])
                
            }
        }
        Calculator.firstMove()
        this.search()
    },
    onrestart: function(){

    },
    ondragStart: function(){

    },
    ondragEnd: function(){

    },
    ondrawWall: function(){

    },
    oneraseWall: function(){

    },
    onrest: function(){

    },
    //#endregion

    generateNode: function(){
        this.grids = []
        for(var i = 0; i < this.numRows; i++){
            var row = []
            for(var j = 0; j < this.numCols; j++){
                row.push(GridNode({gridX: j, gridY: i}))
            }
            this.grids.push(row)
        }
    },

    
    setStartPos: function(node){
        if(this.startNode != undefined){
            this.startNode.isStart = false
            this.setNodeState(this.startNode, NODE_STATE.EMPTY)
        }
        this.startNode = node
        this.startNode.isStart = true
        this.setNodeState(this.startNode, NODE_STATE.START)
    },
    setEndPos: function(node){
        if(this.endNode != undefined){
            this.endNode.isEnd = false
            this.setNodeState(this.endNode, NODE_STATE.EMPTY)
        }
        this.endNode = node
        this.endNode.isEnd = true
        this.setNodeState(this.endNode, NODE_STATE.END)
    },
    
    setNodeState: function(node, state, animateColor=false, animateZoom=false, customColor=undefined){ // Set state in Controller & View
        
        node.state = state
        // View.setStateToNode(node,state, animateColor, animateZoom)
        View.scaleNode(node.gridX, node.gridY, 1.2, 1)
        if(customColor)
            View.changeNodeColor(node.gridX, node.gridY, customColor)
        else 
            View.changeNodeColorToState(node.gridX, node.gridY, state)
    },
    isAuto: false,
    intervalHandler: 0,
    //#region play events
    onClickPlay: function(event){
        this.isAuto = !this.isAuto
        if(this.isAuto){
            this.intervalHandler = setInterval(this.onClickForward.bind(this), 200)
            console.log('AutoPlaying');
            PlayPanel.playButton.text('Pause')
        } else {
            PlayPanel.playButton.text('Play')
            clearInterval(this.intervalHandler)
        }

    },
    onClickBack: function(event){
        if(Controller.is('searching')){
            Calculator.undoCommand()
        }
    },
    onClickForward: function(event){
        // console.log('forwarding');
        
        if(Controller.is('ready')){ // If its the first play
            Controller.start()
        } else if(Controller.is('searching')){
            Calculator.operateNextLine()
        }
    },

    // getNodeCoordinateById: function(id){
    //     let split = id.split('-')
    //     return {x: split[1], y: split[2]}
    // },
    nodeMouseUp: function(node){
        if(this.can('rest'))this.rest()
    },
    nodeMouseDown: function(node){
        if(node.isStart) this.dragStart()
        else if(node.isEnd) this.dragEnd()
        else{
            switch(node.state){
            case NODE_STATE.EMPTY: this.drawWall(); this.setNodeState(node, NODE_STATE.BLOCKED, true, true)
                break;
            case NODE_STATE.BLOCKED: this.eraseWall(); this.setNodeState(node, NODE_STATE.EMPTY, true, true)
                break;
            }
        }
        
    },
    nodeMouseMove: function(node){
        
    },
    nodeMouseEnter: function(node){
        switch(this.current){
        case 'draggingStart':
            if(node.isEnd) break
            if(node.state != NODE_STATE.EMPTY) break
            this.setStartPos(node)
            break
        case 'draggingEnd':
            if(node.isStart) break
            if(node.state != NODE_STATE.EMPTY) break
            this.setEndPos(node)
            break
        case 'erasingWall':
            if(node.state == NODE_STATE.BLOCKED){
                this.setNodeState(node, NODE_STATE.EMPTY, true, true)
            }
            break
        case 'drawingWall':
            if(node.state == NODE_STATE.EMPTY){
                this.setNodeState(node, NODE_STATE.BLOCKED, true, true)
            }
            break
        }
    },
    // mouseup: function(event){
    //     // console.log(event);
    //     if(this.can('rest'))
    //         this.rest()
    // },
    // mousedown: function(event){
    //     if(event.offsetY < 75) return
    //     if(this.current == 'ready'){
    //         let coor = View.paperToGrid(event.offsetX, event.offsetY)
    //         let currNode = this.grids[coor.y][coor.x]
    //         switch(currNode.state){
    //             case NODE_STATE.START: this.dragStart();
    //                 break;
    //             case NODE_STATE.END: this.dragEnd()
    //                 break;
    //             case NODE_STATE.EMPTY: this.drawWall(); this.setNodeState(currNode, NODE_STATE.BLOCKED, true, true)
    //                 break;
    //             case NODE_STATE.BLOCKED: this.eraseWall(); this.setNodeState(currNode, NODE_STATE.EMPTY, true, true)
    //                 break;
    //         }
    //         // View.addNodeToQueue(currNode)
    //     }
    // },
    // mousemove: function(event){
    //     let coor = View.paperToGrid(event.offsetX, event.offsetY)
    //     if(coor.x < 0 || coor.y < 0) return
    //     let currNode = this.grids[coor.y][coor.x]
    //     switch(this.current){
    //         case 'draggingStart':
    //             if(this.startNode != currNode && currNode.state == NODE_STATE.EMPTY){
    //                 this.setNodeState(this.startNode, NODE_STATE.EMPTY)
    //                 this.startNode = currNode
    //                 this.setNodeState(this.startNode, NODE_STATE.START)
    //             }
    //             break
    //         case 'draggingEnd':
    //             if(this.endNode != currNode && currNode.state == NODE_STATE.EMPTY){
    //                 this.setNodeState(this.endNode, NODE_STATE.EMPTY)
    //                 this.endNode = currNode
    //                 this.setNodeState(this.endNode, NODE_STATE.END)
    //             }
    //             break
    //         case 'erasingWall':
    //             if(currNode.state == NODE_STATE.BLOCKED){
    //                 this.setNodeState(currNode, NODE_STATE.EMPTY, true, true)
    //             }
    //             break
    //         case 'drawingWall':
    //             if(currNode.state == NODE_STATE.EMPTY){
    //                 this.setNodeState(currNode, NODE_STATE.BLOCKED, true, true)
    //             }
    //             break
    //     }
    // },
    // bindMouseEvent: function(){
    //     $('#draw_area').mousedown($.proxy(this.mousedown, this));
    //     $(window)
    //         .mousemove($.proxy(this.mousemove, this))
    //         .mouseup($.proxy(this.mouseup, this));
    // },
    //#endregion
    // step: function(){ // ?

    // }
})