function interpolateColor(color1, color2, factor) {
	if (arguments.length < 3) {
		factor = 0.5;
	}
	var result = color1.slice();
	for (var i = 0; i < 3; i++) {
		result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
	}
	return result;
};

function interpolateColors(color1, color2, steps) {
	var stepFactor = 1 / (steps - 1),
		interpolatedColorArray = [];

	color1 = color1.match(/\d+/g).map(Number);
	color2 = color2.match(/\d+/g).map(Number);

	for (var i = 0; i < steps; i++) {
		let values = interpolateColor(color1, color2, stepFactor * i)
		interpolatedColorArray.push(`rgb(${values[0]},${values[1]},${values[2]})`);
	}

	return interpolatedColorArray;
}

var openedColors = interpolateColors('rgb(240, 64, 0)', 'rgb(0,224,0)', 100)


var View = {
	nodeSize: 70, // width and height of a single node, in pixel
	//#region Styles
	nodeStyle: {
		[NODE_STATE.EMPTY]: {
			fill: '#fff',
			'stroke-opacity': 0.2, // the border
		},
		[NODE_STATE.BLOCKED]: {
			fill: 'grey',
			'stroke-opacity': 0.2,
		},
		'start': {
			fill: '#0d0',
			'stroke-opacity': 0.2,
		},
		'end': {
			fill: '#e40',
			'stroke-opacity': 0.2,
		},
		[NODE_STATE.OPENED]: {
			fill: '#98fb98',
			'stroke-opacity': 0.2,
		},
		[NODE_STATE.CLOSED]: {
			fill: '#afeeee',
			'stroke-opacity': 0.2,
		},
	},
	nodeColorizeEffect: {
		duration: 100,
	},
	nodeZoomEffect: {
		duration: 200,
		transform: 's1.2', // scale by 1.2x
		transformBack: 's1.0',
	},
	pathStyle: {
		stroke: 'yellow',
		'stroke-width': 3,
	},

	panel: undefined, // Grid panel

	queuePanel: undefined, // Left panel
	queueGroup: undefined, // <g> For easier sorting
	queueArray: [],
	queueSelector: undefined,
	
	draw_area_x: 0,
	draw_area_y: 0,

	pathStartToNode: null,
	pathNodeToEnd: null,

	getKey: (d) => d.gridX + d.gridY * 100, // set each coordinate as unique

	init: function () {
		this.draw_area_x = d3.select('#draw_area').style('width')
		this.draw_area_y = d3.select('#draw_area').style('height')

		let panel = d3.select('#draw_area').append('svg')
			.attr('width', this.draw_area_x)
			.attr('height', this.draw_area_y)
			
		this.panel = panel.append('g')
						.attr('transform', 'translate(100,0)')
			
		this.queuePanel = panel.append('g')
		this.buildQueuePanel()
		this.queueSelector = (data) => this.queueGroup.selectAll('g').data(data, this.getKey)
		
		// this.panel.append('path')
		// 	.attr('d', path)
		this.pathStartToNode = 
			this.panel.append('polyline')
				.attr('points', '')
				.style('stroke', 'gold')
				.style('stroke-width', '4px')
				.style('stroke-linecap', 'round')
				.style('fill', 'none')

		this.pathNodeToEnd = 
			this.panel.append('polyline')
				.attr('points', '')
				.style('stroke', 'lightgreen')
				.style('stroke-width', '3px')
				.style('stroke-linecap', 'round')
				.style('fill', 'none')
	},

	buildQueuePanel: function () {
		// Prepare panel
		this.queuePanel.append('rect')
			.attr('width', '100px')
			.attr('height', this.draw_area_y)
			.attr('fill', 'lightgrey')

		this.queuePanel.append('text')
			.attr('transform', 'translate(20,40)')
			.style('font-weight', 'bold')
			.style('font-size', 'larger')
			.text('Queue')
		this.queueGroup = this.queuePanel.append('g')
	},

	updateQueue: function () {
		// let interpolationIndex = node.values.f*5 // 0-99
		let s = this.nodeSize
		this.queueSelector(this.queueArray).join(
			enter =>
			enter.append('g')
			.attr('transform', (d) => `translate(${d.gridX * this.nodeSize}, ${d.gridY * this.nodeSize})`).raise()
			.attr('transform-origin', s / 2 + ' ' + s / 2)
			.call(enter => enter
				.transition().duration(500)
				.attr('transform', (d, i) => `translate(15, ${i*80 + 70})`)
			).call(enter => {
				enter.append('rect')
					.attr("width", s)
					.attr("height", s)
					.style("fill", this.nodeStyle[NODE_STATE.OPENED].fill) //function(d, i) { return d3.hsl(d.gridX/20 * 360, 1, d.gridY/20); })
					.style("stroke-opacity", this.nodeStyle[NODE_STATE.OPENED]['stroke-opacity'])
					.style("stroke-width", 2)
					.style("stroke", 'grey')

				let padding = 12

				enter.append('text') // g
					.text((d) => d.values.g.toFixed(1))
					.attr('id', 'g')
					.style('fill', 'grey')
					.attr('text-anchor', 'start')
					.attr('font-size', 'small')
					.attr('transform', `translate(${padding}, ${13 + padding})`)

				enter.append('text') // h
					.text((d) => d.values.h.toFixed(1))
					.attr('id', 'h')
					.style('fill', 'grey')
					.attr('font-size', 'small')
					.attr('text-anchor', 'end')
					.attr('transform', `translate(${70-padding}, ${13 + padding})`)

				enter.append('text') // f
					.text((d) => d.values.f.toFixed(1))
					.attr('id', 'f')
					.style('font-weight', 'bold')
					.style('font-size', 'small')
					.attr('text-anchor', 'middle')
					.attr('transform', `translate(${70/2}, ${70-padding})`)
			}),
			update => update.call(update => update
				.transition().duration(500)
				.attr('transform', (d, i) => `translate(15, ${i*80 + 70})`)),
			exit => exit.transition().duration(500)
			.attr('transform', (d, i) => `translate(15, ${i*80+70}) scale(0)`).remove()
		)
	},

	showNodeValue: function (gridX, gridY, doesShow) { // ex: #grid(0,10)
		if (doesShow)
			this.panel.select(`g#grid-${gridX}-${gridY}`).selectAll('text')
			.style('opacity', '1')
			.transition().duration(500)
			.style('opacity', '0.6')
		else
			this.panel.select(`g#grid-${gridX}-${gridY}`).selectAll('text')
			.transition().duration(500)
			.style('opacity', '0')
	},

	createPathStringFromNodes: function (nodes) {
		let path = ""
		let s = this.nodeSize
		let center = this.nodeSize/2
		nodes.forEach(c => {
			path += (c.gridX*s + center)+','+(c.gridY*s + center)+' '
		})
		return path
		// let path = d3.path()
		// path.moveTo(coordinates[0].x, coordinates[0].y)

		// coordinates.forEach(c => {
		// 	path.lineTo(c.x, c.y)
		// })
		// path.closePath()
		// return path.toString()
	},

	scaleNode: function (gridX, gridY, init = 1, scale = 1, dur = 200) {
		let s = this.nodeSize
		this.panel.select(`g#grid-${gridX}-${gridY}`).raise()
			.attr('transform', `translate(${gridX * s}, ${gridY * s}) scale(${init})`)
			.transition().duration(dur)
			.attr('transform', `translate(${gridX * s}, ${gridY * s}) scale(${scale})`)
		// TEMPORARY
		// .transition().duration(dur)
		// .attr('transform', `translate(${gridX * s}, ${gridY * s})`)
	},

	changeNodeColor: function (gridX, gridY, stateColor, doesAnimate) {
		this.panel.select(`g#grid-${gridX}-${gridY}`).select('rect')
			.transition().duration(doesAnimate ? 400 : 0)
			.style('fill', stateColor)
	},
	changeNodeColorToState(gridX, gridY, stateName, doesAnimate) {
		this.changeNodeColor(gridX, gridY, this.nodeStyle[stateName].fill, doesAnimate)
	},

	generateNodeView: function (grid) {
		let s = this.nodeSize
		let rects = this.panel.selectAll("g")
			.data(grid) // GridNode
			.enter().append("g")
			.attr("transform", (d) => `translate(${d.gridX * s}, ${d.gridY * s})`)
			.attr('transform-origin', s / 2 + ' ' + s / 2)
			.attr('id', (d) => `grid-${d.gridX}-${d.gridY}`)
		// TEMPORARY
		// .on('mouseenter', (d) => {  // Triggered when calculate a node value
		// 	this.showNodeValue(d.gridX, d.gridY)
		// 	this.scaleNode(d.gridX, d.gridY, 1.4)
		// 	this.changeNodeColor(d.gridX, d.gridY, openedColors[Math.floor(Math.random()*100)])//this.nodeStyle[NODE_STATE.OPENED].fill)
		// })

		rects.append('rect')
			.attr("width", s)
			.attr("height", s)
			.style("fill", this.nodeStyle[NODE_STATE.EMPTY].fill) //function(d, i) { return d3.hsl(d.gridX/20 * 360, 1, d.gridY/20); })
			.style("stroke-opacity", this.nodeStyle[NODE_STATE.EMPTY]['stroke-opacity'])
			.style("stroke-width", 2)
			.style("stroke", 'grey')

		let padding = 12

		rects.append('text') // g
			.text('')
			.attr('id', 'g')
			.style('fill', 'grey')
			.attr('text-anchor', 'start')
			.attr('font-size', 'small')
			.attr('transform', `translate(${padding}, ${13 + padding})`)
			.attr('opacity', '0')

		rects.append('text') // h
			.text('')
			.attr('id', 'h')
			.style('fill', 'grey')
			.attr('font-size', 'small')
			.attr('text-anchor', 'end')
			.attr('transform', `translate(${70-padding}, ${13 + padding})`)
			.attr('opacity', '0')

		rects.append('text') // f
			.text('')
			.attr('id', 'f')
			.style('font-weight', 'bold')
			.style('font-size', 'small')
			.attr('text-anchor', 'middle')
			.attr('transform', `translate(${70/2}, ${70-padding})`)
			.attr('opacity', '0')
		// .on("mouseover", () => {});
	},

	onExecuteLine: function (param) {
		if (param.type != 'undo') {
			let node = param.state.node
			let neighbour = param.state.neighbour
			switch (param.state.executedLine.pseudocode) {
				case 'queue = {start}':
					this.updateQueue()
					break
				case 'while queue is not empty:':
					break
				case 'visited = queue.first()':
					this.updateQueue()
					break
				case 'set visited to closed':
					if (!node.isStart) {
						this.changeNodeColorToState(node.gridX, node.gridY, NODE_STATE.CLOSED, true)
					}
					break
				case 'for each neighbour in visited.neighbours:':
					if (neighbour)
						this.scaleNode(neighbour.gridX, neighbour.gridY, 1, 1.2, 400)
					break
				case 'if neighbour.state is either closed, opened, or wall:':
					break
				case 'continue':
					this.scaleNode(neighbour.gridX, neighbour.gridY, 1.2, 1, 400)
					break
				case 'set neighbour\'s parent to visited node':
					break
				case 'if neighbour is an endpoint:':
					break
				case 'return neighbour':
					let startToEndRoutes = Calculator.getPathFromStartToEnd()
					this.pathStartToNode
						.attr('points', this.createPathStringFromNodes(startToEndRoutes))
						.raise()
						.transition().duration(250)
						.style('opacity', '1')
					break
				case 'calculate f, g & h':
					let x = neighbour.gridX
					let y = neighbour.gridY
					this.panel.select(`g#grid-${x}-${y}`).select('text#g').text(neighbour.values.g.toFixed(1))
					this.panel.select(`g#grid-${x}-${y}`).select('text#h').text(neighbour.values.h.toFixed(1))
					this.panel.select(`g#grid-${x}-${y}`).select('text#f').text(neighbour.values.f.toFixed(1))
					this.showNodeValue(x, y, true)

					let startToNodeRoutes = Calculator.getPathFromStartToEnd(null, neighbour)
					this.pathStartToNode
						.attr('points', this.createPathStringFromNodes(startToNodeRoutes))
						.raise()
						.transition().duration(250)
						.style('opacity', '1')
						
					let nodeToEndRoutes = [neighbour, Calculator.endNode]//Calculator.getPathFromStartToEnd(neighbour, null)
					this.pathNodeToEnd
						.attr('points', this.createPathStringFromNodes(nodeToEndRoutes))
						.raise()
						.transition().duration(250)
						.style('opacity', '1')

					break
				case 'set neighbour state to opened':
					this.changeNodeColorToState(neighbour.gridX, neighbour.gridY, NODE_STATE.OPENED, true)
					break
				case 'add neighbour to queue':
					this.updateQueue()
					this.scaleNode(neighbour.gridX, neighbour.gridY, 1.2, 1, 400)
					this.pathStartToNode
						.transition().duration(250)
						.style('opacity', '0')
					this.pathNodeToEnd
						.transition().duration(250)
						.style('opacity', '0')
					break
				case 'sort queue by the f value':
					this.updateQueue()
					break
				case 'end':
					break
			}
		} else {
			let node = param.prevState.node
			let neighbour = param.prevState.neighbour
			switch (param.prevState.executedLine.pseudocode) {
				case 'queue = {start}':
					this.updateQueue()
					break
				case 'while queue is not empty:':
					break
				case 'visited = queue.first()':
					this.updateQueue()
					break
				case 'set visited to closed':
					if (!node.isStart) {
						this.changeNodeColorToState(node.gridX, node.gridY, NODE_STATE.OPENED, true)
					}
					break
				case 'for each neighbour in visited.neighbours:':
					if (neighbour)
						this.scaleNode(neighbour.gridX, neighbour.gridY, 1.2, 1, 400)
					break
				case 'if neighbour.state is either closed, opened, or wall:':
					break
				case 'continue':
					this.scaleNode(neighbour.gridX, neighbour.gridY, 1, 1.2, 400)
					break
				case 'set neighbour\'s parent to visited node':
					break
				case 'if neighbour is an endpoint:':
					break
				case 'return neighbour':
					
					this.pathStartToNode
						.transition().duration(250)
						.style('opacity', '0')
					break
				case 'calculate f, g & h':
					let x = neighbour.gridX
					let y = neighbour.gridY
					this.showNodeValue(x, y, false)
					
					this.pathStartToNode
						.transition().duration(250)
						.style('opacity', '0')
					this.pathNodeToEnd
						.transition().duration(250)
						.style('opacity', '0')

					break
				case 'set neighbour state to opened':
					this.changeNodeColorToState(neighbour.gridX, neighbour.gridY, NODE_STATE.EMPTY, true)
					break
				case 'add neighbour to queue':
					this.updateQueue()
					this.scaleNode(neighbour.gridX, neighbour.gridY, 1, 1.2, 400)
					break
				case 'sort queue by the f value':
					this.updateQueue()
					break
				case 'end':
					break
			}
		}
	},
}
/*switch(param.state.executedLine.pseudocode){
				case 'queue = {start}':
						this.updateQueue()
					break
				case 'while queue is not empty:':
					break
				case 'visited = queue.first()':
						this.updateQueue()
					break
				case 'set visited to closed':
					if(!node.isStart){
						this.changeNodeColorToState(node.gridX, node.gridY, NODE_STATE.CLOSED, true)
					}
					break
				case 'for each neighbour in visited.neighbours:':
					if(neighbour)
						this.scaleNode(neighbour.gridX, neighbour.gridY, 1, 1.2, 400)
					break
				case 'if neighbour.state is either closed, opened, or wall:':
					break
				case 'continue':
					this.scaleNode(neighbour.gridX, neighbour.gridY, 1.2, 1, 400)
					break
				case 'set neighbour\'s parent to visited node':
					break
				case 'if neighbour is an endpoint:':
					break
				case 'return neighbour':
					break
				case 'calculate f, g & h':
					let x = neighbour.gridX
					let y = neighbour.gridY
					this.panel.select(`g#grid-${x}-${y}`).select('text#g').text(neighbour.values.g.toFixed(1))
					this.panel.select(`g#grid-${x}-${y}`).select('text#h').text(neighbour.values.h.toFixed(1))
					this.panel.select(`g#grid-${x}-${y}`).select('text#f').text(neighbour.values.f.toFixed(1))
					this.showNodeValue(x, y, true)
					break
				case 'set neighbour state to opened':
					this.changeNodeColorToState(neighbour.gridX, neighbour.gridY, NODE_STATE.OPENED, true)
					break
				case 'add neighbour to openSet':
					this.updateQueue()
					this.scaleNode(neighbour.gridX, neighbour.gridY, 1.2, 1, 400)
					break
				case 'sort queue by the f value':
					this.updateQueue()
					break
				case 'end':
					break
			}
			*/