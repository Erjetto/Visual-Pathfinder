/*
Methods from Calculator that can be called in command
- setjumpToLineNum -> for loop or if pseudocode
- 

Qst: Should I add extra explanation for each line?
Ex: line3 => node(5,5) is visited

}
*/
/**
 * Contains the node that is changed and the line that is executed
 * 
 */
var ChangeState = {
    create: function(nodes, command){
        return {targetedNodes: nodes, executedLine: command}
    }
}

var astar = {
    // Every line has its object, including 'do', for indexing reason
    lines: [ 
        { // 'openSet = {start}',
            execute: function(calculator){ //
                // Put start node to queue
                let change = [] 
                calculator.setJumpToLineNum(2)
                change.push(calculator.startNode)
                calculator.addToQueue(calculator.startNode)

                return ChangeState.create(change, this)
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
                
                let change = [] // contains prev & next node
                change.push(calculator.currentNode)
                calculator.popQueue()
                change.push(calculator.currentNode)
                
                console.log('visited = ')
                console.log(calculator.currentNode);
                return ChangeState.create(change, this)
            },
            undo: function(calculator, change){
                calculator.addToQueue(change.targetedNodes[1], true)
                calculator.currentNode = change.targetedNodes[0]
            }
        },
        { // '    set visited to closed',
            execute: function(calculator){
                let change = [] 
                if(calculator.currentNode == NODE_STATE.OPENED)
                calculator.changeNodeState(calculator.currentNode, NODE_STATE.CLOSED)
                return ChangeState.create(change, this)
            },
            undo: function(calculator, change){
                if(calculator.currentNode == NODE_STATE.CLOSED)
                calculator.changeNodeState(calculator.currentNode, NODE_STATE.OPENED)
            }            
        },
        { // '    for each neighbour in visited.neighbour:',
            execute: function(calculator){
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){} 
        },
        { // '        if neighbour is empty:',
            execute: function(calculator){
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){} 
        },
        { // '            calculate g & h',
            execute: function(calculator){
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){} 
        },
        // { // '            f = g + h',
        //     execute: function(calculator){
        //         let change = [] 
        //         return ChangeState.create(change, this)
        //     }, undo: function(calculator, change){} 
        // },
        { // '            set neighbour state to opened',
            execute: function(calculator){
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){} 
        },
        { // '            add neighbour to openSet',
            execute: function(calculator){
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){} 
        },
        { // '        else if neighbour is an endpoint:',
            execute: function(calculator){
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){} 
        },
        { // '            return neighbour',
            execute: function(calculator){
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){} 
        },
        { // 'while openSet.length > 0'
            execute: function(calculator){
                calculator.setJumpToLineNum(2)
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){
                
            } 
        },
        { // 'end'
            execute: function(calculator){
                calculator.isFinished = true
                let change = [] 
                return ChangeState.create(change, this)
            }, undo: function(calculator, change){
                calculator.isFinished = false

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
        '            calculate f, g & h',
        // '            f = g + h',
        '            set neighbour state to opened',
        '            add neighbour to openSet',
        '        else if neighbour is an endpoint:',
        '            return neighbour',
        'while openSet.length > 0',
        'end',
    ].map(function(line) { // Change space to nbsp
        let spaceIdx = 0
        while(line[spaceIdx] == ' ') spaceIdx++
        line = line.substring(spaceIdx, line.length)
        
        return '&nbsp;'.repeat(spaceIdx) + line
    }),
    
}