var ChangeState = {
	create: function (changes = {}) {
		return {
			...changes
		}
	}
}

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
	lines: [{ // Line index is defined automatically, scope is undefined or []
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
		},
		{
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
			undo: function (calculator, change) {
				calculator.nextCommandStack.splice(0, change.addedCommands)
			},
			scope: [{
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
				},
				{
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
				},
				{
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
					scope: [{
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
							scope: [{
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
							}, ]
						},
						{
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
						},
						{
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
							scope: [{
								pseudocode: 'return neighbour',
								explanation: (calculator) => `We have reached an end`,
								execute: function (calculator) {
									calculator.setFinished(true)
									alert('Reached end')
									let explanation = this.explanation(calculator)
									return ChangeState.create({
										executedLine:this,
										explanation
									})
								},
								undo: function (calculator, change) {
									calculator.setFinished(false)
								},
							}, ]
						},
						{
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
						},
						{
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
						},
						{
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
						},


					],

				},
				{
					pseudocode: 'sort queue by the f value',
					explanation: (calculator) => ``,
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
				},
			],
		},
		{
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
		},
	],
	new_pseudo: [
		`
        
        `
	],
	pseudocode: [
		'openSet = {start}',
		'while openSet.length > 0:',
		'    visited = openSet.pop()',
		'    set visited to closed',
		'    for each neighbour in visited.neighbours:',
		'        if neighbour.state is closed or opened:',
		'            continue',
		'        set neighbour.parent to visited',
		'        if neighbour is an endpoint:',
		'            return neighbour',
		'        calculate f, g & h',
		'        set neighbour state to opened',
		'        add neighbour to openSet',
		'    sort queue by the f value',
		'end',
	].map(function (line) { // Change space to nbsp
		let spaceIdx = 0
		while (line[spaceIdx] == ' ') spaceIdx++
		line = line.substring(spaceIdx, line.length)

		return '&nbsp;'.repeat(spaceIdx) + line
	}),
}