const NODE_STATE = {
    OPENED:1,
    CLOSED:2,
    START:3,
    END:4,
    EMPTY:5
}

var GridNode = function(param){
    this.gridX = param.gridX
    this.gridY = param.gridY
    this.heuristic = 0
    this.rect = undefined
    this.neighbours =  [] 
    /*
    this.state = StateMachine.create({ // Too expensive?
        initial: 'empty',
        events: [
            {
                name: 'open',
                from: 'empty',
                to:   'opened'
            },
            {
                name: 'close',
                from: 'empty',
                to:   'closed'
            },
            {
                name: 'setStart',
                from: 'empty',
                to:   'start'
            },
            {
                name: 'setEnd',
                from: 'empty',
                to:   'end'
            },
            {
                name: 'reset',
                from: ['opened','closed','start','end'],
                to:   'empty'
            },
        ]
    })
    */
    return this
}

var Calculator = {
    // For Command Stuff
    currentLineIndex: -1, // 
    currentLine: undefined, // ex: astar.lines[0]
    currentAlgorithm: undefined,
    jumpToLineNum: 0, // Set value if does jump, undefined if no jump
    commandsStack: [], // {targetedNode:Object, executedCmd:Command}
    commandsUndoStack: [],
    
    viewOperations: [], // Pass view change attribute method to the View model

    grids: undefined, // Get the grid from controller
    openList: [],  // Queue
    closedList: [], // Visited
    currentNode: undefined,


    operateNextLine: function(){
        this.currentLine = this.getNextOperableLine()
        this.currentLine.execute()
        this.onExecuteLine()
        this.commandsStack.push(line)
    },
    onExecuteLine: function(){
        CodePanel.highlightLine(this.currentLine.lineIndex)
        // Call Controller and View?
    },

    getNextOperableLine: function(){
        var line 
        if (this.jumpToLineNum != undefined){ // jumpToLineNum is set by commands
            line = this.currentAlgorithm.lines[this.jumpToLineNum]
            this.jumpToLineNum = undefined
        } else {
            do{   
                line = this.currentAlgorithm.lines[++this.currentLineIndex]
            } while(line === undefined)
        }
        return line
    },
    undoCommand: function(){
        this.currentLine = this.commandsStack.pop()
        change = this.currentLine.undo()
        this.onExecuteLine()
        this.commandsUndoStack.push(change)
    },
    redoCommand: function(){
        this.currentLine = this.undoCommandsStack.pop()
        change = this.currentLine.execute()
        this.onExecuteLine()
        this.commandsStack.push(change)
    },

    init: function(){
        this.setAlgorithm(astar)
    },
    
    setAlgorithm: function(algo){ // pass the astar variable here
        this.currentAlgorithm = algo
        // If lines obj has line in it.....
        // CodePanel.generateLine(this.currentAlgorithm.lines.map(l => l.line))
        CodePanel.generateLine(this.currentAlgorithm.pseudocode)
    },

    setjumpToLineNum: function(idx){
        this.jumpToLineNum = idx
    }
}

var CodePanel = {
    panelNode: undefined,
    lines: [],
    activeLine: -1,
    generateLine: function(lines){
        lines.forEach(line => {
            let n = document.createElement('div')
            n.className = 'code-line active' // Add class here
            n.innerHTML = line
            this.panelNode.appendChild(n)
            this.lines.push(n)
        })
    },
    highlightLine: function(index){
        this.activeLine.className.replace('active', '')
        this.activeLine = this.lines[index]
        this.activeLine.className += ' active'
    },

    init: function(){
        this.panelNode = $('code-panel') // Get panel
    }
}

/*
Methods from Calculator that can be called in command
- setjumpToLineNum -> for loop or if pseudocode
- 

Qst: Should I add extra explanation for each line?
Ex: line3 => node(5,5) is visited

Qst: Should I add memento to calculator to save state every time command is executed?
CommandState{
    targetedNodes = []
    executedLine => The line that was executed
}
*/
var astar = {
    // Every line has its object, including 'do', for indexing reason
    lines: [ 
        { // 'openSet = {start}',
            execute: function(calculator){ //
                let change = [] //
                // Put start node to queue
                // 
                return change
            },
            undo: function(calculator, change){
                // 
            }
        },
        { // 'do:',
        },
        { // '    visited = openSet.pop()',
            execute: function(calculator){
                // Remove the first in queue
                // If node is a normal node then
                //     Highlight the node on the map
                //     Change state to closed
            },
            undo: function(calculator, change){
                // Add prev node to queue
                // If node is a normal node then
                //      Reset highlight 
                // 
            }
        },
    ],
    // Move to lines object?
    pseudocode: [
        'openSet = {start}',
        'do:',
        '    visited = openSet.pop()',
        '    set visited to closed',
        '    for each neighbour in visited.neighbour:',
        '        if neighbour is empty:',
        '            calculate g & h',
        '            f = g + h',
        '            set neighbour state to opened',
        '            add neighbour to openSet',
        '        else if neighbour is an endpoint:',
        '            return neighbour',
        'while openSet.length > 0'
    ],
    
}