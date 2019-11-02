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
    numCols: 30,
    numRows: 30,
    grids: [],
    startNode: undefined,
    endNode: undefined,

    //#region StateMachine Events
    //Asynchronous transition from `none` state to `ready` state.
    oninit: function() {
        // this.grid = new PF.Grid(numCols, numRows);
        console.log('Initializing Controller')
        // this.bindGridNodeState()

        this.generateNode()
        
        this.bindMouseEvent()
        this.setStartPos(this.grids[3][6])
        this.setEndPos(this.grids[15][6])
        
        PlayPanel.playButton.click($.proxy(this.onClickPlay, this))
        PlayPanel.backButton.click($.proxy(this.onClickBack, this))
        PlayPanel.forwardButton.click($.proxy(this.onClickForward, this))

        Calculator.onAddQueue.push(function(node, toFront=false){
            View.addNodeToQueue(node, toFront)
        }.bind(this))
        Calculator.onPopQueue.push(function(node){
            View.popQueue()
        }.bind(this))
        Calculator.onChangeState.push(function(node, state){
            View.setStateToNode(node,state,true,true)
        }.bind(this))
        
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
        Calculator.endNode = this.endNode
        Calculator.grids = this.grids
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
        
        View.generateNodeView(this.grids)
    },

    
    setStartPos: function(node){
        if(this.startNode != undefined){
            this.setNodeState(this.startNode, NODE_STATE.EMPTY)
        }
        this.startNode = node
        this.setNodeState(this.startNode, NODE_STATE.START)
    },
    setEndPos: function(node){
        if(this.endNode != undefined){
            this.setNodeState(this.endNode, NODE_STATE.EMPTY)
        }
        this.endNode = node
        this.setNodeState(this.endNode, NODE_STATE.END)
    },
    
    setNodeState: function(node, state, animateColor=false, animateZoom=false){ // Set state in Controller & View
        node.state = state
        View.setStateToNode(node,state, animateColor, animateZoom)
    },

    // bindGridNodeState: function(){
    //     this.operations = []
    //     GridNode.prototype = {
    //         get state() {
    //             return this._state;
    //         },
    //         set state(value) {
    //             this._state = value;
    //             Controller.operations.push({
    //                 gridX: this.gridX,
    //                 gridY: this.gridY,
    //                 operation: value,
    //             })
    //         },
    //     }
    // },

    //#region play events
    onClickPlay: function(event){
    },
    onClickBack: function(event){
        if(Controller.is('searching')){
            Calculator.undoCommand()
        }
    },
    onClickForward: function(event){
        console.log('forwarding');
        
        if(Controller.is('ready')){ // If its the first play
            Controller.start()
        } else if(Controller.is('searching')){
            Calculator.operateNextLine()
        }

    },
    mouseup: function(event){
        // console.log(event);
        if(this.can('rest'))
            this.rest()
    },
    mousedown: function(event){
        if(event.offsetY < 75) return
        if(this.current == 'ready'){
            let coor = View.paperToGrid(event.offsetX, event.offsetY)
            let currNode = this.grids[coor.y][coor.x]
            switch(currNode.state){
                case NODE_STATE.START: this.dragStart();
                    break;
                case NODE_STATE.END: this.dragEnd()
                    break;
                case NODE_STATE.EMPTY: this.drawWall(); this.setNodeState(currNode, NODE_STATE.BLOCKED, true, true)
                    break;
                case NODE_STATE.BLOCKED: this.eraseWall(); this.setNodeState(currNode, NODE_STATE.EMPTY, true, true)
                    break;
            }
            // View.addNodeToQueue(currNode)
        }
    },
    mousemove: function(event){
        let coor = View.paperToGrid(event.offsetX, event.offsetY)
        let currNode = this.grids[coor.y][coor.x]
        switch(this.current){
            case 'draggingStart':
                if(this.startNode != currNode && currNode.state == NODE_STATE.EMPTY){
                    this.setNodeState(this.startNode, NODE_STATE.EMPTY)
                    this.startNode = currNode
                    this.setNodeState(this.startNode, NODE_STATE.START)
                }
                break
            case 'draggingEnd':
                if(this.endNode != currNode && currNode.state == NODE_STATE.EMPTY){
                    this.setNodeState(this.endNode, NODE_STATE.EMPTY)
                    this.endNode = currNode
                    this.setNodeState(this.endNode, NODE_STATE.END)
                }
                break
            case 'erasingWall':
                if(currNode.state == NODE_STATE.BLOCKED){
                    this.setNodeState(currNode, NODE_STATE.EMPTY, true, true)
                }
                break
            case 'drawingWall':
                if(currNode.state == NODE_STATE.EMPTY){
                    this.setNodeState(currNode, NODE_STATE.BLOCKED, true, true)
                }
                break
        }
    },
    bindMouseEvent: function(){
        $('#draw_area').mousedown($.proxy(this.mousedown, this));
        $(window)
            .mousemove($.proxy(this.mousemove, this))
            .mouseup($.proxy(this.mouseup, this));
    },
    //#endregion
    step: function(){ // ?

    }
})