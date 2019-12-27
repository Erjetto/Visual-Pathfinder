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

	panel: undefined,			// Grid panel
	queuePanel: undefined, 	// Left panel
	queueGroup: undefined, 	// <g> For easier sorting
	queueArray: [],
	queueSelector: undefined,
	draw_area_x: 0,
	draw_area_y: 0,

	getKey: (d) => d.gridX+d.gridY*100, // set each coordinate as unique

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
		this.queueSelector = (data) => this.queueGroup.selectAll('rect').data(data, this.getKey)

		// Debug purpose
		// this.queueArray.push({gridX: 3, gridY: 5, interpolationIndex: 90, values:{f:10}})
		// this.queueArray.push({gridX: 1, gridY: 10, interpolationIndex: 60, values:{f:40}})
		// this.queueArray.push({gridX: 1, gridY: 4, interpolationIndex: 60, values:{f:33}})
		// this.queueArray.push({gridX: 5, gridY: 4, interpolationIndex: 60, values:{f:20}})
		// this.updateQueue()
		// setTimeout(() => {
		// 	this.queueArray.push({gridX: 5, gridY: 3, interpolationIndex: 60, values:{f:5}})
		// 	this.updateQueue()
		// }, 500);
		// setTimeout(() => {
		// 	this.queueArray.shift()
		// 	this.updateQueue()
		// }, 1000);
		// setTimeout(() => {
		// 	this.queueArray.sort((a,b) => (a.values.f - b.values.f)) // biggest to smallest
		// 	this.updateQueue()
		// }, 1500);
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

	updateQueue: function(){
		// let interpolationIndex = node.values.f*5 // 0-99
		this.queueSelector(this.queueArray).join(
			enter=> enter.append('rect')
				.attr("width", this.nodeSize)
				.attr("height", this.nodeSize)
				.style("fill", (d)=>openedColors[Math.floor(d.values.f*2)]) //function(d, i) { return d3.hsl(d.gridX/20 * 360, 1, d.gridY/20); })
				.style("stroke-opacity", this.nodeStyle[NODE_STATE.EMPTY]['stroke-opacity'])
				.style("stroke-width", 2)
				.style("stroke", 'grey')
				.style("transform-origin", '35px 35px')
				.attr('transform', (d)=>`translate(${d.gridX * this.nodeSize}, ${d.gridY * this.nodeSize})`).raise()
				.call(enter => enter
							.transition().duration(500)
							.attr('transform', (d, i) => `translate(15, ${i*80 + 70})`)
				),
			update=> update.call(update => update
				.transition().duration(500)
				.attr('transform', (d, i) => `translate(15, ${i*80 + 70})`)),
			exit=> exit.transition().duration(500)
					// .attr('transform-origin', '35 35')
					.attr('transform', (d, i) => `translate(15, ${i*80+70}) scale(0)`).remove()
		)
	},

	// popQueue: function () {
	// 	this.queueArray.shift()
	// 	// this.queueGroup.select('rect').remove() // TODO: Add transition
	// 	this.queueSelector.join(
	// 			enter => enter.append('rect'),
	// 			update => update.transition().duration(500).attr('transform', (d, i) => `translate(15, ${i*80+70})`),
	// 			exit => exit.transition().duration(500)
	// 					// .attr('transform-origin', '35 35')
	// 					.attr('transform', (d, i) => `translate(15, ${i*80+70}) scale(0)`).remove()
	// 	)
	// },

	// sortQueue: function (sortedQueue) {
	// 	// this.queueArray = sortedQueue
	// 	this.queueArray = this.queueArray.sort((a,b)=> a.values.f - b.values.f)

	// 	this.queueSelector.join(
	// 		enter => enter.append('rect'),
	// 		update => update.call(update => update
	// 			.transition().duration(500)
	// 			.attr('transform', (d, i) => `translate(15, ${i*80 + 70})`)),
	// 		exit => exit.remove()
	// 	)
	// },

	// pushQueue: function (node, toFront) {  // gridX, gridY, value
	// 	if(!toFront) this.queueArray.push(node)	
	// 	else this.queueArray.unshift(node)
	// 	console.log(this.queueArray);
		
	// 	let interpolationIndex = node.values.f*5 // 0-99
		
	// 	this.queueSelector.join(
	// 		enter=> enter.append('rect')
	// 			.attr("width", this.nodeSize)
	// 			.attr("height", this.nodeSize)
	// 			.style("fill", openedColors[interpolationIndex]) //function(d, i) { return d3.hsl(d.gridX/20 * 360, 1, d.gridY/20); })
	// 			.style("stroke-opacity", this.nodeStyle[NODE_STATE.EMPTY]['stroke-opacity'])
	// 			.style("stroke-width", 2)
	// 			.style("stroke", 'grey')
	// 			.attr('transform', (d)=>`translate(${d.gridX * this.nodeSize}, ${d.gridY * this.nodeSize})`).raise()
	// 			.call(enter => enter
	// 						.transition().duration(500)
	// 						.attr('transform', (d, i) => `translate(15, ${i*80 + 70})`)
	// 			),
	// 		update=> update.call(update => update
	// 			.transition().duration(500)
	// 			.attr('transform', (d, i) => `translate(15, ${i*80 + 70})`)),
	// 		exit=> exit
	// 	)
	// },

	showNodeValue: function(gridX, gridY){ // ex: #grid(0,10)
		this.panel.select(`g#grid-${gridX}-${gridY}`).selectAll('text')
			.style('opacity', '1')
			.transition().delay(1000).duration(500)
			.style('opacity', '0.6')
	},

	scaleNode: function(gridX, gridY, init=1, scale=1, dur=200){
		let s = this.nodeSize
		this.panel.select(`g#grid-${gridX}-${gridY}`).raise()
			.attr('transform', `translate(${gridX * s}, ${gridY * s}) scale(${init})`)
			.transition().duration(dur)
			.attr('transform', `translate(${gridX * s}, ${gridY * s}) scale(${scale})`)
			// TEMPORARY
			// .transition().duration(dur)
			// .attr('transform', `translate(${gridX * s}, ${gridY * s})`)
	},

	changeNodeColor: function(gridX, gridY, stateColor, doesAnimate){
		this.panel.select(`g#grid-${gridX}-${gridY}`).select('rect')
			.transition().duration(doesAnimate ? 400 : 0)
			.style('fill', stateColor)
	},
	changeNodeColorToState(gridX, gridY, stateName, doesAnimate){		
		this.changeNodeColor(gridX, gridY, this.nodeStyle[stateName].fill, doesAnimate)
	},

	generateNodeView: function (grid) {
		let s = this.nodeSize
		let rects = this.panel.selectAll("g")
			.data(grid) // GridNode
			.enter().append("g")
			.attr("transform", (d) => `translate(${d.gridX * s}, ${d.gridY * s})`)
			.attr('transform-origin', s/2+' '+s/2)
			.attr('id', (d) => `grid-${d.gridX}-${d.gridY}`)
			// TEMPORARY
			.on('mouseenter', (d) => {  // Triggered when calculate a node value
				this.showNodeValue(d.gridX, d.gridY)
				this.scaleNode(d.gridX, d.gridY, 1.4)
				this.changeNodeColor(d.gridX, d.gridY, openedColors[Math.floor(Math.random()*100)])//this.nodeStyle[NODE_STATE.OPENED].fill)
			})

		rects.append('rect')
			.attr("width", s)
			.attr("height", s)
			.style("fill", this.nodeStyle[NODE_STATE.EMPTY].fill) //function(d, i) { return d3.hsl(d.gridX/20 * 360, 1, d.gridY/20); })
			.style("stroke-opacity", this.nodeStyle[NODE_STATE.EMPTY]['stroke-opacity'])
			.style("stroke-width", 2)
			.style("stroke", 'grey')

		let padding = 12	

		rects.append('text') // g
			.text('15')
			.attr('id', 'g')
			.style('fill','white')
			.attr('text-anchor', 'start')
			.attr('font-size', 'small')
			.attr('transform', `translate(${padding}, ${13 + padding})`)
			.attr('opacity', '0')

		rects.append('text') // h
			.text('15')
			.attr('id', 'h')
			.style('fill','white')
			.attr('font-size', 'small')
			.attr('text-anchor', 'end')
			.attr('transform', `translate(${70-padding}, ${13 + padding})`)
			.attr('opacity', '0')

		rects.append('text') // f
			.text('30')
			.attr('id', 'f')
			.style('font-weight', 'bold')
			.style('font-size', 'small')
			.attr('text-anchor', 'middle')
			.attr('transform', `translate(${70/2}, ${70-padding})`)
			.attr('opacity', '0')
		// .on("mouseover", () => {});
	}
}