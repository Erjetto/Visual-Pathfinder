
var Calculator = {
    currentAlgorithm: undefined,
    currentLineIndex: -1, // 
    currentLine: undefined, // ex: astar.lines[0]
    jumpToLineNum: 0, // Set value if does jump, undefined if no jump

    // For Command Stuff
    commandsStack: [], // {targetedNode:Object, executedCmd:Command}
    // commandsUndoStack: [], // unused?
    
    // viewOperations: [], // Pass view change attribute method to the View model

    grids: undefined, // Get the grid from controller
    openSet: [],  // Queue
    _currentNode: undefined,
    get currentNode() {
        return this._currentNode;
    },
    set currentNode(value) {
        this._currentNode = value;
    },
    startNode: undefined,
    endNode: undefined,

    isFinished: false,
    isOperable: true, // To control the operation delay?
    onExecuteLine: function(){
        CodePanel.highlightLine(this.currentLineIndex)
        // Call Controller and View?
        if(this.isFinished){ // 
            this.isOperable = false
            alert('Calculator is finished')
        }
    },

    getNextOperableLine: function(){
        var line 
        if (this.jumpToLineNum != undefined){ // jumpToLineNum is set by commands
            line = this.currentAlgorithm.lines[this.jumpToLineNum]
            this.currentLineIndex = this.jumpToLineNum
            this.jumpToLineNum = undefined
        } else {
            do{   
                line = this.currentAlgorithm.lines[++this.currentLineIndex]
            } while(line.execute === undefined)
        }
        return line
    },

    //#region Methods for Command to use
    algoInfo: {}, // Keep the data from algorithm, ex: loopIndex = 2
    onChangeState: [], // (node, state)
    onAddQueue: [], // (node, toFront)
    onPopQueue: [], // (node)
    onSortQueue: [], // ([nodes])
    changeNodeState: function(node, state){ 
        node.state = state
        this.onChangeState.forEach((callback) => callback(node,state))
    },
    addToQueue: function(node, toFront=false){
        if(toFront)
            this.openSet.unshift(node)
        else
            this.openSet.push(node)
        // Add other event?
        this.onAddQueue.forEach((callback) => callback(node, toFront))
    },
    popQueue: function(){
        this.currentNode = this.openSet.shift()
        this.onPopQueue.forEach((callback) => callback(this.currentNode))
    },
    sortQueue: function(){
        this.openSet.sort((a,b) => a.values.f-b.values.f)
        this.onSortQueue.forEach((callback) => callback(this.openSet))
    },
    
    //#endregion

    operateNextLine: function(){
        // if(this.isFirst) this.init()
        
        if(!this.isOperable){
            console.log('The calculator is not operable');
            return
        }
        this.currentLine = this.getNextOperableLine()
        // console.log('Operating next line => ' + this.currentAlgorithm.pseudocode[this.currentLineIndex]);
        state = this.currentLine.execute(this)
        this.onExecuteLine()
        
        this.commandsStack.push(state)
    },
    undoCommand: function(){
        
        if(this.commandsStack.length <= 1){
            console.log('Already reached the first')
            return
        }
        let prevState = this.commandsStack.pop()
        this.currentLine.undo(this, prevState)

        this.currentLine = this.commandsStack[this.commandsStack.length-1].executedLine
        this.currentLineIndex = this.currentAlgorithm.lines.indexOf(this.currentLine)
        this.onExecuteLine(this)
    },
    // redoCommand: function(){
    //     this.currentLine = this.undoCommandsStack.pop()
    //     change = this.currentLine.execute()
    //     this.onExecuteLine(this)
    //     this.commandsStack.push(change)
    // },

    init: function(){
        this.setAlgorithm(astar)
        this.isFinished = false
        // PlayPanel.forwardButton.click($.proxy(this.operateNextLine, this))
        // PlayPanel.backButton.click($.proxy(this.undoCommand, this))
    },
    
    setAlgorithm: function(algo){ // pass the astar variable here
        this.currentAlgorithm = algo
        if(algo.init) algo.init(this)
        // If lines obj has line in it.....
        // CodePanel.generateLine(this.currentAlgorithm.lines.map(l => l.line))
        CodePanel.generateLine(this.currentAlgorithm.pseudocode)
    },
}
