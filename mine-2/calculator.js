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
		return this.queue.shift()
	},
	popQueue: function () {
		return this.queue.pop()
	},
	sortQueue: function () {
		this.queue.sort((a, b) => (a.values.f - b.values.f))
	},
	sortQueueByIndex: function (sortArrayIndexes) {
		let newQueue = []
		console.log(sortArrayIndexes);
		
		for (var i = 0; i < sortArrayIndexes.length; i++) 
			newQueue.push(this.queue[sortArrayIndexes.indexOf(i)])
		console.log(newQueue);
		
		this.queue.splice(0,this.queue.length)
		this.queue.push(...newQueue)
	},
	addCommandsFromScope: function (commands) {
		this.nextCommandStack.unshift(...commands)
	},
	setFinished: function(isFinished){
		this.isFinished = isFinished
		// this.nextCommandStack.splice(0, this.nextCommandStack.length)
	},
	//#endregion
	getPathFromStartToEnd: function(start = null, end = null){
		if(start == null) start = this.startNode
		if(end == null) end = this.endNode
		
		let nodes = [end]
		let currNode = end
		while(currNode.parent != currNode){
			nodes.unshift(currNode.parent)
			currNode = currNode.parent
		}
		return nodes
	},

	firstMove: function(){
		this.isOperable = true
		this.startNode.isStart = true
		this.endNode.isEnd = true
	},
	onExecuteLine: [
		// () => console.log(Calculator.algoInfo),
		function (param) {View.onExecuteLine(param)},
		function (param) {
			// if(param.type == 'undo')
			// console.log(Calculator.currentLine);
			
			CodePanel.highlightLine(Calculator.currentLine.lineIndex)
			// else
			// 	CodePanel.highlightLine(param.state.executedLine.lineIndex)
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
		
		if (this.isFinished) {
			console.log('No more moves');
			return
		}
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
		// console.log(state);
		
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
		// console.log('State from undo:', currState);
		
		triggerCallback(this.onExecuteLine, {type:'undo', state: prevState, prevState: currState})
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