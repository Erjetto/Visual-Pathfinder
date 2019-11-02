var CodePanel = {
    panelNode: undefined,
    lines: [],
    activeLine: undefined,
    generateLine: function(lines){
        this.panelNode.empty()
        lines.forEach(line => {
            let n = document.createElement('p')
            n.className = 'code_line' // Add class here
            n.innerHTML = line
            this.panelNode.append(n)
            this.lines.push(n)
        })
        this.activeLine = this.lines[0]
    },
    highlightLine: function(index){
        this.activeLine.className = 'code_line'
        this.activeLine = this.lines[index]
        this.activeLine.className = 'code_line active_line'
    },

    init: function(){
        this.panelNode = $('.codes_panel') // Get panel
    }
}
