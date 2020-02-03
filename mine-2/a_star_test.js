var ChangeState = {
	create: function (changes = {}) {
		return {
			...changes
		}
	}
}
// 	'openSet = {start}',
// 	'while openSet.length > 0:',
// 	'    visited = openSet.pop()',
// 	'    set visited to closed',
// 	'    for each neighbour in visited.neighbours:',
// 	'        if neighbour.state is closed or opened:',
// 	'            continue',
// 	'        set neighbour.parent to visited',
// 	'        if neighbour is an endpoint:',
// 	'            return neighbour',
// 	'        calculate f, g & h',
// 	'        set neighbour state to opened',
// 	'        add neighbour to openSet',
// 	'    sort queue by the f value',
// 	'end',


var astar = {
	pseudocodes: [],
	init: function (calculator) {
		calculator.algoInfo['loopNeighbourIndex'] = -1
		this.putLineIndex(this.lines, 0)
		this.getPseudocodeLines(this.lines)
	},

	putLineIndex: function (lines, currIdx) {
		let idx = currIdx
		lines.forEach(l => {
			l.lineIndex = idx++
			if (l.scope && l.scope.length > 0)
				idx = this.putLineIndex(l.scope, idx)
		});
		return idx
	},

	getPseudocodeLines: function (arr = this.lines, strs = [], indent = 0) {
		// TODO: Get lines with indent based on depth
		let indentSpace = "&nbsp;&nbsp;&nbsp;".repeat(indent)
		arr.forEach(l => {
			strs.push(indentSpace + l.pseudocode)
			if (l.scope && l.scope.length > 0)
				this.getPseudocodeLines(l.scope, strs, indent + 1)
		})
		this.pseudocodes = strs
		return this.pseudocodes
	},
	/*
	Usable command from calculator:
	- addToQueue: function (node, toFront = false)
	- popQueue
	- sortQueue: function (sortArrayIndexes = undefined)
	- sortQueueByIndex
	- changeNodeState: function (node, state)
	- setFinished
	
	*/
	getCurrentNeighbourLoop1: (calculator) => calculator.currentNode.neighbours[calculator.algoInfo['loopNeighbourIndex']],
	lines: [
		add_start,
		while_length_more_than_0,
		end_algo
	],
}



// let add_start,
// 	while_length_more_than_0,
// 	pop_queue,
// 	set_visited_to_closed,
// 	loop_neighbours,
// 	if_neighbour_state_is_closed_or_opened,
// 	continue_loop,
// 	set_neighbour_to_visited,
// 	if_neighbour_is_endpoint,
// 	return_neighbour,
// 	calculate_f_g_h,
// 	set_neighbour_state_to_opened,
// 	add_neighbour_to_queue
// 	sort_queue_by_f,
// 	end_algo = 0

let pop_queue = {
	pseudocode: 'visited = queue.first()',
	explanation: (calculator) => `Get the first node from queue`,
	execute: function (calculator) {
		let prevNode = calculator.currentNode
		calculator.currentNode = calculator.shiftQueue()

		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			node: calculator.currentNode,
			prevNode,
			explanation
		})
	},
	undo: function (calculator, change) {
		calculator.addToQueue(change.node, true)
		calculator.currentNode = change.prevNode
	},
	onEnterLine: function(calculator, view) {
		view.updateQueue()
	},
	onLeaveLine: function(calculator, view){
		view.updateQueue()
	},
}

let set_visited_to_closed = {
	pseudocode: 'set visited to closed',
	explanation: (calculator) => `Set the node into closed`,
	execute: function (calculator) {
		calculator.changeNodeState(calculator.currentNode,
			NODE_STATE.CLOSED)

		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			node: calculator.currentNode,
			explanation
		})
	},
	undo: function (calculator, change) {
		calculator.changeNodeState(calculator.currentNode,
			NODE_STATE.OPENED)
	},
	onEnterLine: function(calculator, view) {
		if (!node.isStart) {
			this.changeNodeColorToState(node.gridX, node.gridY, NODE_STATE.CLOSED, true)
		}
	},
	onLeaveLine: function(calculator, view){},
}

let continue_loop = {
	pseudocode: 'continue',
	explanation: (calculator) => `Skip the neighbour`,
	execute: function (calculator) {
		while(calculator.nextCommandStack[0].pseudocode != 'for each neighbour in visited.neighbours:'){
			calculator.nextCommandStack.shift()
		}

		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			neighbour: astar.getCurrentNeighbourLoop1(calculator),
			explanation
		})
	},
	undo: function (calculator, change) {

	},
	onEnterLine: function(calculator, view) {
		view.scaleNode(neighbour.gridX, neighbour.gridY, 1.2, 1, 400)
		
	},
	onLeaveLine: function(calculator, view){
	},
}
	
let if_neighbour_state_is_closed_or_opened = {
	pseudocode: 'if neighbour.state is either closed, opened, or wall:',
	explanation: (calculator) => `Neighbour is ${astar.getCurrentNeighbourLoop1(calculator).state}`,
	execute: function (calculator) {
		if(astar.getCurrentNeighbourLoop1(calculator).state != NODE_STATE.EMPTY &&
			astar.getCurrentNeighbourLoop1(calculator).isEnd == false){
			calculator.addCommandsFromScope(this.scope)
		} 
		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			explanation
		})
	},
	undo: function (calculator, change) {
		// TODO
	},
	scope: [continue_loop]
}

let set_neighbour_to_visited = {
	pseudocode: 'set neighbour\'s parent to visited node',
	explanation: (calculator) => `neighbour.parent = visited`,
	execute: function (calculator) {
		astar.getCurrentNeighbourLoop1(calculator).parent = calculator.currentNode
		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			neighbour: astar.getCurrentNeighbourLoop1(calculator),
			explanation
		})
	},
	undo: function (calculator, change) {},
}

let return_neighbour = {
	pseudocode: 'return neighbour',
	explanation: (calculator) => `We have reached an end`,
	execute: function (calculator) {
		calculator.setFinished(true)
		// alert('Reached end')
		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			explanation
		})
	},
	undo: function (calculator, change) {
		calculator.setFinished(false)
	},
	onEnterLine: function(calculator, view) {
		let startToEndRoutes = calculator.getPathFromStartToEnd()
		view.pathStartToNode
			.attr('points', view.createPathStringFromNodes(startToEndRoutes))
			.raise()
			.transition().duration(250)
			.style('opacity', '1')
		
	},
	onLeaveLine: function(calculator, view){
		view.pathStartToNode
			.transition().duration(250)
			.style('opacity', '0')
	},
}

let if_neighbour_is_endpoint = {
	pseudocode: 'if neighbour is an endpoint:',
	explanation: (calculator) => `Neighbour is ${astar.getCurrentNeighbourLoop1(calculator) == calculator.endNode ? '' : 'not'} an endpoint`,
	execute: function (calculator) {
		// console.log(astar.getCurrentNeighbourLoop1(calculator).isEnd);
		
		if(astar.getCurrentNeighbourLoop1(calculator).isEnd){
			calculator.addCommandsFromScope(this.scope)
		} 
		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			explanation
		})
	},
	undo: function (calculator, change) {},
	scope: [return_neighbour]
}

let calculate_f_g_h = {
	pseudocode: 'calculate f, g & h',
	explanation: (calculator) => {
		let values = astar.getCurrentNeighbourLoop1(calculator).values
		return `g = ${values.g.toFixed(1)}, h = ${values.h.toFixed(1)}, f = ${values.f.toFixed(1)}`
	},
	execute: function (calculator) {
		let n = astar.getCurrentNeighbourLoop1(calculator)
		let end = calculator.endNode
		let diffX = n.parent.gridX - n.gridX
		let diffY = n.parent.gridY - n.gridY

		n.values.g = n.parent.values.g + (Math.sqrt(diffX*diffX + diffY*diffY))
		n.values.h = Math.sqrt(Math.pow(n.gridX-end.gridX, 2) + Math.pow(n.gridY-end.gridY, 2))
		n.values.f = n.values.g + n.values.h

		let explanation = this.explanation(calculator)
		return ChangeState.create({
			neighbour: n,
			executedLine:this,
			explanation
		})
	},
	undo: function (calculator, change) {},
	onEnterLine: function(calculator, view) {
		let neighbour = astar.getCurrentNeighbourLoop1(calculator)
		let x = neighbour.gridX
		let y = neighbour.gridY
		view.panel.select(`g#grid-${x}-${y}`).select('text#g').text(neighbour.values.g.toFixed(1))
		view.panel.select(`g#grid-${x}-${y}`).select('text#h').text(neighbour.values.h.toFixed(1))
		view.panel.select(`g#grid-${x}-${y}`).select('text#f').text(neighbour.values.f.toFixed(1))
		view.showNodeValue(x, y, true)

		let startToNodeRoutes = calculator.getPathFromStartToEnd(null, neighbour)
		view.pathStartToNode
			.attr('points', view.createPathStringFromNodes(startToNodeRoutes))
			.raise()
			.transition().duration(250)
			.style('opacity', '1')
			
		let nodeToEndRoutes = [neighbour, calculator.endNode]//Calculator.getPathFromStartToEnd(neighbour, null)
		view.pathNodeToEnd
			.attr('points', view.createPathStringFromNodes(nodeToEndRoutes))
			.raise()
			.transition().duration(250)
			.style('opacity', '1')
		
	},
	onLeaveLine: function(calculator, view){
		let neighbour = astar.getCurrentNeighbourLoop1(calculator)
		let x = neighbour.gridX
		let y = neighbour.gridY
		view.showNodeValue(x, y, false)
		
		view.pathStartToNode
			.transition().duration(250)
			.style('opacity', '0')
		view.pathNodeToEnd
			.transition().duration(250)
			.style('opacity', '0')
	},
}

let set_neighbour_state_to_opened = {
	pseudocode: 'set neighbour state to opened',
	explanation: (calculator) => `Neighbour is opened`,
	execute: function (calculator) {
		astar.getCurrentNeighbourLoop1(calculator).state = NODE_STATE.OPENED

		let explanation = this.explanation(calculator)
		return ChangeState.create({
			neighbour: astar.getCurrentNeighbourLoop1(calculator),
			executedLine:this,
			explanation
		})
	},
	undo: function (calculator, change) {
		calculator.changeNodeState(change.neighbour, NODE_STATE.EMPTY)
	},
	onEnterLine: function(calculator, view) {
		let neighbour = astar.getCurrentNeighbourLoop1(calculator)
		view.changeNodeColorToState(neighbour.gridX, neighbour.gridY, NODE_STATE.OPENED, true)
	},
	onLeaveLine: function(calculator, view){
		let neighbour = astar.getCurrentNeighbourLoop1(calculator)
		view.scaleNode(neighbour.gridX, neighbour.gridY, 1.2, 1, 400)
	},
}

let add_neighbour_to_queue = {
	pseudocode: 'add neighbour to queue',
	explanation: (calculator) => `Add neighbour to queue`,
	execute: function (calculator) {
		calculator.addToQueue(astar.getCurrentNeighbourLoop1(calculator))
		let explanation = this.explanation(calculator)
		return ChangeState.create({
			neighbour: astar.getCurrentNeighbourLoop1(calculator),
			executedLine:this,
			explanation
		})
	},
	undo: function (calculator, change) {
		calculator.popQueue()
	},
	onEnterLine: function(calculator, view) {
		view.updateQueue()
	},
	onLeaveLine: function(calculator, view){
	}
}

let loop_neighbours = {
	pseudocode: 'for each neighbour in visited.neighbours:',
	explanation: function(calculator){
		if(calculator.algoInfo['loopNeighbourIndex'] == -1) return ' No more neighbours'
		return  `Get the ${this.getNumberString(calculator.algoInfo['loopNeighbourIndex'])} neighbour from ${8} neighbours`
	},
	getNumberString: (number) => {
		switch (number + 1) {
			case 1:
				return '1st'
			case 2:
				return '2nd'
			case 3:
				return '3rd'
			default:
				return number + 'th'
		}
	},
	execute: function (calculator) {
		// TODO: Review this command!
		let prevIdx, addedCommands = 0
		if (calculator.algoInfo['loopNeighbourIndex'] >= calculator.currentNode.neighbours.length - 1) {
			calculator.algoInfo['loopNeighbourIndex'] = -1
			prevIdx = -1
		} else {
			prevIdx = calculator.algoInfo['loopNeighbourIndex']++
			calculator.addCommandsFromScope([this])
			calculator.addCommandsFromScope(this.scope)
			addedCommands = this.scope.length + 1
		}

		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			neighbour: astar.getCurrentNeighbourLoop1(calculator),
			explanation,
			prevIdx,
			addedCommands
		})
	},
	undo: function (calculator, change) {
		calculator.algoInfo['loopNeighbourIndex'] = change.prevIdx
		if (change.prevIdx != -1) {
			calculator.nextCommandStack.splice(0, change.addedCommands)
		}
	},
	scope: [
		if_neighbour_state_is_closed_or_opened,
		set_neighbour_to_visited,
		if_neighbour_is_endpoint,
		set_neighbour_state_to_opened,
		calculate_f_g_h,
		add_neighbour_to_queue
	],
	onEnterLine: function(calculator, view) {
		let neighbour = astar.getCurrentNeighbourLoop1(calculator)
		view.scaleNode(neighbour.gridX, neighbour.gridY, 1.2, 1, 400)
	},
	onLeaveLine: function(calculator, view){
	},
}

let sort_queue_by_f = {
	pseudocode: 'sort queue by the f value',
	explanation: (calculator) => `Queue is sorted`,
	execute: function (calculator) {
		// Get all node's previous position
		let prevArr = []
		calculator.queue.forEach(e => {
			prevArr.push(e)
		});
		calculator.sortQueue()
		// Get all nodes' prev index
		let prevIndexes = []
		calculator.queue.forEach(e => {
			prevIndexes.push(prevArr.indexOf(e))
		});

		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			explanation,
			prevIndexes
		})
	},
	undo: function (calculator, change) {
		calculator.sortQueueByIndex(change.prevIndexes)
	},
	onEnterLine: function(calculator, view) {
		view.updateQueue()
	},
	onLeaveLine: function(calculator, view){
	}
}

let while_length_more_than_0 = {
	pseudocode: 'while queue is not empty:',
	explanation: (calculator) => `The queue has ${calculator.queue.length} node(s)`,
	execute: function (calculator) {
		let addedCommands = 0
		if (calculator.queue.length > 0) {
			calculator.addCommandsFromScope([this])
			calculator.addCommandsFromScope(this.scope)
			addedCommands = this.scope.length + 1
		}
		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			addedCommands,
			explanation
		})
	},
	onEnterLine: function(calculator, view) {
		// view.updateQueue()
	},
	onLeaveLine: function(calculator, view){},
	undo: function (calculator, change) {
		calculator.nextCommandStack.splice(0, change.addedCommands)
	},
	scope: [
		pop_queue,
		set_visited_to_closed,
		loop_neighbours,
		sort_queue_by_f	
	],
}


let end_algo = {
	pseudocode: 'end',
	explanation: (calculator) => `No end found`,
	execute: function (calculator) {

		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			explanation
		})
	},
	undo: function (calculator, change) {},
	onEnterLine: function(calculator, view) {
		view.updateQueue()
	},
	onLeaveLine: function(calculator, view){
	}
}

let add_start = { // Line index is defined automatically, scope is undefined or []
	lineIndex: undefined,
	pseudocode: 'queue = {start}',
	explanation: (calculator) => `Start node is put into Queue`,
	execute: function (calculator) {
		calculator.addToQueue(calculator.startNode)
		let explanation = this.explanation(calculator)
		return ChangeState.create({
			executedLine:this,
			explanation
		})
	},
	undo: function (calculator, change) {
		calculator.currentNode = calculator.shiftQueue()
	},
	onEnterLine: function(calculator, view) {
		view.updateQueue()
	},
	onLeaveLine: function(calculator, view){
	}
}