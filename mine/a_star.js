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
// TODO: Make this happen
var ChangeState = {
    create: function(changes, command){
        return {executedLine: command, ...changes}
    }
}

var astar = {
    
    init: function(calculator){
        calculator.algoInfo['loopNeighbourIndex'] = -1
    },
    // Every line has its object, including 'do', for indexing reason
    lines: [ 
        { // 'openSet = {start}',
            execute: function(calculator){ //
                // Put start node to queue
                 
                calculator.setJumpToLineNum(2)
                
                calculator.addToQueue(calculator.startNode)

                return {executedLine: this}
            },
            undo: function(calculator, change){
                calculator.popQueue()
            }
        },
        { // 'do:',
        },
        { // '    visited = openSet.pop()',
            execute: function(calculator){
                let prev = calculator.currentNode
                calculator.popQueue()
                
                console.log('visited = ')
                console.log(calculator.currentNode);
                return {prev: prev, currNode: calculator.currentNode, executedLine: this}
            },
            undo: function(calculator, change){
                calculator.addToQueue(change.prev, true)
                calculator.currentNode = change.prev
            }
        },
        { // '    set visited to closed',
            execute: function(calculator){
                // if(calculator.currentNode.state == NODE_STATE.OPENED)
                    calculator.changeNodeState(calculator.currentNode, NODE_STATE.CLOSED)
                return {executedLine: this}
            },
            undo: function(calculator, change){
                // if(calculator.currentNode.state == NODE_STATE.CLOSED)
                    calculator.changeNodeState(calculator.currentNode, NODE_STATE.OPENED)
            }            
        },
        { // '    for each neighbour in visited.neighbour:',
            execute: function(calculator){ // Add index, or end the loop
                let prevIdx
                if(calculator.algoInfo['loopNeighbourIndex'] >= calculator.currentNode.neighbours.length - 1){
                    calculator.algoInfo['loopNeighbourIndex'] = -1
                    prevIdx = -1
                    calculator.setJumpToLineNum(14) // sort.....
                }
                else{
                    prevIdx = calculator.algoInfo['loopNeighbourIndex']++
                }
                

                return {prevIdx: prevIdx,executedLine: this}
            }, undo: function(calculator, change){
                calculator.algoInfo['loopNeighbourIndex'] = change.prevIdx
                
            } 
        },
        { // '        if neighbour.state is closed or opened or blocked:',
            execute: function(calculator){
                 
                let node = calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']]
                if(node.state != NODE_STATE.CLOSED && node.state != NODE_STATE.OPENED && node.state != NODE_STATE.BLOCKED)
                    calculator.setJumpToLineNum(7)
                return {executedLine: this}
            }, 
            undo: function(calculator, change){

            } 
        },
        { // '            continue'
            execute: function(calculator){
                 
                calculator.setJumpToLineNum(4)
                return {executedLine: this}
            }, 
            undo: function(calculator, change){

            } 
        },
        { // '        set neighbour.parent to visited',
            execute: function(calculator){
                 
                calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']].parent = calculator.currentNode
                return {executedLine: this}
            }, 
            undo: function(calculator, change){
                calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']].parent = undefined
            } 
        },
        { // '        if neighbour is empty OR START:',
            execute: function(calculator){
                 
                let node = calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']]
                console.log(node);
                
                if(node.state != NODE_STATE.EMPTY
                    && node.state != NODE_STATE.START){
                    calculator.setJumpToLineNum(12) // else if....
                }
                return {executedLine: this}
            }, undo: function(calculator, change){} 
        },
        { // '            calculate f, g & h',
            execute: function(calculator){
                // Show change in the view as well
                 
                let currNode = calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']]
                let diffX = currNode.gridX - calculator.endNode.gridX,
                    diffY = currNode.gridY - calculator.endNode.gridY

                currNode.values.h = calculator.currentNode.values.h + 1
                currNode.values.g = Math.sqrt(diffX*diffX + diffY*diffY)
                currNode.values.f = currNode.values.h + currNode.values.g
                
                return {currNode: currNode, executedLine: this}
            }, 
            undo: function(calculator, change){
                let currNode = change.currNode
                currNode.values.h = 0
                currNode.values.g = 0
                currNode.values.f = 0
            } 
        },
        { // '            set neighbour state to opened',
            execute: function(calculator){
                 
                let node = calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']]
                calculator.changeNodeState(node, NODE_STATE.OPENED)
                
                return {openedNode: node, executedLine: this}
            }, 
            undo: function(calculator, change){
                calculator.changeNodeState(chage.openedNode, NODE_STATE.EMPTY)
                
            } 
        },
        { // '            add neighbour to openSet',
            execute: function(calculator){
                calculator.addToQueue(calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']])
                calculator.setJumpToLineNum(4)

                return {executedLine: this}
            }, 
            undo: function(calculator, change){
                calculator.popQueue()
            } 
        },
        { // '        else if neighbour is an endpoint:',
            execute: function(calculator){
                 
                if(calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']].state != NODE_STATE.END)
                    calculator.setJumpToLineNum(14) // sort...
                return {executedLine: this}
            }, undo: function(calculator, change){} 
        },
        { // '            return neighbour',
            execute: function(calculator){
                // TODO: Do something after return
                 
                calculator.isFinished = true
                return {executedLine: this}
            }, undo: function(calculator, change){
                
                calculator.isFinished = false
            } 
        },
        { // '    sort queue by the f value',
            execute: function(calculator){
                 
                calculator.sortQueue()
                return {executedLine: this}
            }, undo: function(calculator, change){
            } 
        },
        { // 'while openSet.length > 0'
            execute: function(calculator){
                 
                if (calculator.openSet.length > 0)
                    calculator.setJumpToLineNum(2)
                return {executedLine: this}
            }, undo: function(calculator, change){
                
            } 
        },
        { // 'end'
            execute: function(calculator){
                calculator.isFinished = true
                 
                return {executedLine: this}
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
        '    for each neighbour in visited.neighbours:',
        '        if neighbour.state is closed or opened:',
        '            continue',
        '        set neighbour.parent to visited',
        '        if neighbour is empty:',
        '            calculate f, g & h',
        '            set neighbour state to opened',
        '            add neighbour to openSet',
        '        else if neighbour is an endpoint:',
        '            return neighbour',
        '    sort queue by the f value',
        'while openSet.length > 0',
        'end',
    ].map(function(line) { // Change space to nbsp
        let spaceIdx = 0
        while(line[spaceIdx] == ' ') spaceIdx++
        line = line.substring(spaceIdx, line.length)
        
        return '&nbsp;'.repeat(spaceIdx) + line
    }),
    
}