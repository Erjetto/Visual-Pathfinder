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
	onChangeState: [], // (node, state)
	onAddQueue: [], // (node, toFront)
	onPopQueue: [], // (node)
	onSortQueue: [], // ([nodes])
	changeNodeState: function (node, state) {
		node.state = state
		triggerCallback(this.onChangeState, {node, state})
	},
	addToQueue: function (node, toFront = false) {
		if (toFront)
			this.queue.unshift(node)
		else
			this.queue.push(node)
		triggerCallback(this.onAddQueue, {node, toFront})
	},
	popQueue: function () {
		this.currentNode = this.queue.shift()
		triggerCallback(this.onPopQueue, {currentNode: this.currentNode})
	},
	sortQueue: function () {
		this.queue.sort((a, b) => a.values.f - b.values.f)
		triggerCallback(this.onSortQueue, {queue: this.queue})
	},
	sortQueueByIndex: function (sortArrayIndexes) {
		let newQueue = []
		for (var i = 0; i < sortArrayIndexes.length; i++) 
			newQueue.push(calculator.queue[sortArrayIndexes.indexOf(i)])
		
		this.queue = newQueue
		triggerCallback(this.onSortQueue, {queue: this.queue})
	},
	addCommandsFromScope: function (commands) {
		this.nextCommandStack.unshift(commands)
	},
	//#endregion

	onExecuteLine: [
		function (param) {CodePanel.highlighLine(param.state.executedLine.lineIndex)},
		function (param) {HistoryPanel.pushToHistory(param.state.explanation)}
	], // Add highlight code callback here
	operateNextLine: function () {

		if (!this.isOperable) {
			console.log('The calculator is not operable');
			return
		}

		this.currentLine = this.getNextLine()
		// console.log('Operating next line => ' + this.currentAlgorithm.pseudocode[this.currentLineIndex]);
		state = this.currentLine.execute(this)

		this.stateHistory.push(state)
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
		this.nextCommandStack.unshift(this.currentLine)
		this.currentLine.undo(this, currState)

		this.currentLine = prevState.executedLine

		triggerCallback(this.onExecuteLine, {
			currentLine: this.currentLine
		})
	},


	init: function () {
		this.setAlgorithm(astar)
		this.isFinished = false
		// PlayPanel.forwardButton.click($.proxy(this.operateNextLine, this))
		// PlayPanel.backButton.click($.proxy(this.undoCommand, this))
	},

	onSetAlgorithm: [
		function (param) {
			CodePanel.generateLine(param.algo.getPseudocodeLines())
		}
	],
	setAlgorithm: function (algo) { // pass the astar variable here
		this.currentAlgorithm = algo
		if (algo.init) algo.init(this)
		// TODO: move this callback to onSetAlgo
		// CodePanel.generateLine(this.currentAlgorithm.pseudocode)
		triggerCallback(this.onSetAlgorithm, {
			algo
		})
	},
}