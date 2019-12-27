var ChangeState = {
	create: function (changes = {}) {
		return {
			executedLine: this,
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
	- changeNodeState: function (node, state)
	- 
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
					explanation
				})
			},
			undo: function (calculator, change) {
				calculator.popQueue(calculator.startNode)
			},
		},
		{
			pseudocode: 'while queue is not empty:',
			explanation: (calculator) => `The queue has ${calculator.queue.length} node(s)`,
			execute: function (calculator) {
				let addedCommands = 0
				if (calculator.queue.length > 0) {
					calculator.addCommandsFromScope(this.scope)
					addedCommands = this.scope.length
				}
				let explanation = this.explanation(calculator)
				return ChangeState.create({
					addedCommands,
					explanation
				})
			},
			undo: function (calculator, change) {
				calculator.nextCommandStack.splice(0, change.addedCommands)
			},
			scope: [{
					pseudocode: 'visited = queue.pop()',
					explanation: (calculator) => `Get the first node from queue`,
					execute: function (calculator) {
						calculator.currentNode = calculator.popQueue()

						let explanation = this.explanation(calculator)
						return ChangeState.create({
							explanation
						})
					},
					undo: function (calculator, change) {},
				},
				{
					pseudocode: 'set visited to closed',
					explanation: (calculator) => `Set the node into closed`,
					execute: function (calculator) {
						calculator.changeNodeState(calculator.currentNode,
							NODE_STATE.CLOSED)

						let explanation = this.explanation(calculator)
						return ChangeState.create({
							node : calculator.currentNode,
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
					explanation: (calculator) => `Get the ${this.getNumberString(calculator)} neighbour from ${4} neighbours`,
					getNumberString: (calculator) => {
						switch (calculator.algoInfo['loopNeighbourIndex']) {
							case 1:
								return '1st'
							case 2:
								return '2nd'
							case 3:
								return '3rd'
							default:
								return calculator.algoInfo['loopNeighbourIndex'] + 'th'
						}
					},
					execute: function (calculator) {
						// TODO: Review this command!
						let prevIdx, addedCommands = 0
						if (calculator.algoInfo['loopNeighbourIndex'] >= calculator.currentNode.neighbours.length - 1) {
							calculator.algoInfo['loopNeighbourIndex'] = -1
							prevIdx = -1
						} else {
							prevIdx = calculator.algoInfo['loopNeighbourIndex']
							calculator.addCommandsFromScope(this)
							calculator.addCommandsFromScope(this.scope)
							addedCommands = this.scope.length
						}

						let explanation = this.explanation(calculator)
						return ChangeState.create({
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
							pseudocode: 'if neighbour.state is closed or opened:',
							explanation: (calculator) => `Neighbour is ${astar.getCurrentNeighbourLoop1(calculator).state}`,
							execute: function (calculator) {

								let explanation = this.explanation(calculator)
								return ChangeState.create({
									explanation
								})
							},
							undo: function (calculator, change) {},
							scope: [{
								pseudocode: 'continue',
								explanation: (calculator) => `Skip the neighbour`,
								execute: function (calculator) {

									let explanation = this.explanation(calculator)
									return ChangeState.create({
										explanation
									})
								},
								undo: function (calculator, change) {},
							}, ]
						},
						{
							pseudocode: 'set its parent to visited',
							explanation: (calculator) => `neighbour.parent = visited`,
							execute: function (calculator) {

								let explanation = this.explanation(calculator)
								return ChangeState.create({
									explanation
								})
							},
							undo: function (calculator, change) {},
						},
						{
							pseudocode: 'if neighbour is an endpoint:',
							explanation: (calculator) => `Neighbour is ${astar.getCurrentNeighbourLoop1(calculator) == calculator.endNode ? '' : 'not'} an endpoint`,
							execute: function (calculator) {

								let explanation = this.explanation(calculator)
								return ChangeState.create({
									explanation
								})
							},
							undo: function (calculator, change) {},
							scope: [{
								pseudocode: 'return neighbour',
								explanation: (calculator) => `We finally reached an end`,
								execute: function (calculator) {

									let explanation = this.explanation(calculator)
									return ChangeState.create({
										explanation
									})
								},
								undo: function (calculator, change) {},
							}, ]
						},
						{
							pseudocode: 'calculate f, g & h',
							explanation: (calculator) => `g = ${calculator.currentNode.values.g}, h = ${calculator.currentNode.values.h}, f = ${calculator.currentNode.values.f}`,
							execute: function (calculator) {

								let explanation = this.explanation(calculator)
								return ChangeState.create({
									explanation
								})
							},
							undo: function (calculator, change) {},
						},
						{
							pseudocode: 'set neighbour state to opened',
							explanation: (calculator) => `Neighbour is opened`,
							execute: function (calculator) {

								let explanation = this.explanation(calculator)
								return ChangeState.create({
									explanation
								})
							},
							undo: function (calculator, change) {},
						},
						{
							pseudocode: 'add neighbour to openSet',
							explanation: (calculator) => ``,
							execute: function (calculator) {

								let explanation = this.explanation(calculator)
								return ChangeState.create({
									explanation
								})
							},
							undo: function (calculator, change) {},
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
			explanation: (calculator) => `The algorithm is finished`,
			execute: function (calculator) {

				let explanation = this.explanation(calculator)
				return ChangeState.create({
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
