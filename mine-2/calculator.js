function triggerCallback(arr, param = {}) {
	arr.forEach(c => {
		c(param)
	});
}

var Calculator = {
	currentAlgorithm: undefined,
	// currentLineIndex: -1, // 
	currentLine: undefined, // ex: astar.lines[0]

	stateHistory: [], // a Stack
	nextCommandStack: [], // a Queue

	grids: undefined,
	queue: [],

	currentNode: undefined,
	startNode: undefined,
	endNode: undefined,

	isFinished: false,
	isOperable: false, // To control animation?

	//#region Methods for Command to use
	algoInfo: {}, // Keep the data from algorithm, ex: loopIndex = 2
	changeNodeState: function (node, state) {
		node.state = state
	},
	addToQueue: function (node, toFront = false) {
		if (toFront)
			this.queue.unshift(node)
		else
			this.queue.push(node)
	},
	shiftQueue: function () {
		this.currentNode = this.queue.shift()
	},
	popQueue: function () {
		this.currentNode = this.queue.pop()
	},
	sortQueue: function () {
		this.queue.sort((a, b) => (a.values.f - b.values.f))
	},
	sortQueueByIndex: function (sortArrayIndexes) {
		let newQueue = []
		for (var i = 0; i < sortArrayIndexes.length; i++) 
			newQueue.push(calculator.queue[sortArrayIndexes.indexOf(i)])

		this.queue.splice(0,this.queue.length)
		this.queue.push(newQueue)
	},
	addCommandsFromScope: function (commands) {
		this.nextCommandStack.unshift(...commands)
	},
	//#endregion

	onExecuteLine: [
		function (param) {View.onExecuteLine(param)},
		function (param) {
			CodePanel.highlightLine(param.state.executedLine.lineIndex)
		},
		function (param) {
			if(param.type == 'undo')
				HistoryPanel.popHistory()
			else
				HistoryPanel.pushToHistory(param.state.explanation)
		},
		// (param) => console.log(Calculator.nextCommandStack)
		
	], // Add highlight code callback here
	operateNextLine: function () {
		
		if (!this.isOperable) {
			console.log('The calculator is not operable');
			return
		}
		if(this.nextCommandStack.length == 0) {
			console.log('You have reached the last');
			return // The calculator ends here
		}
		this.currentLine = this.nextCommandStack.shift()
		
		// console.log('Operating next line => ' + this.currentAlgorithm.pseudocode[this.currentLineIndex]);
		state = this.currentLine.execute(this)
		
		this.stateHistory.push(state)
		console.log(state);
		
		triggerCallback(this.onExecuteLine, {
			state
		})
	},
	undoCommand: function () {
		if (this.stateHistory.length <= 1) {
			console.log('Already reached the first')
			return
		}
		let currState = this.stateHistory.pop(),
			prevState = this.stateHistory[this.stateHistory.length - 1]
		this.currentLine.undo(this, currState)
		this.nextCommandStack.unshift(this.currentLine)

		if(prevState)
			this.currentLine = prevState.executedLine
		console.log('State from undo:', currState);
		
		triggerCallback(this.onExecuteLine, {type:'undo', state: prevState})
	},

	init: function () {
		this.setAlgorithm(astar)
		this.isFinished = false
	},

	onSetAlgorithm: [
		function (param) {
			CodePanel.generateLine(param.algo.getPseudocodeLines())
		}
	],
	setAlgorithm: function (algo) { // pass the astar variable here
		this.currentAlgorithm = algo
		if (algo.init) algo.init(this)
		triggerCallback(this.onSetAlgorithm, {algo})
		this.nextCommandStack = []
		this.addCommandsFromScope(algo.lines)
		
	},
}