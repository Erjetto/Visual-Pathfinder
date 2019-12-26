var CodePanel = {
    panelNode: undefined,
    lines: [],
    activeLine: undefined,
    generateLine: function(lines){
        console.log('generating lines');
        
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

var HistoryPanel = {
    panelNode: undefined,
    lines: [],

    pushToHistory: function(str){
        $('<li/>', {
            class:'animate-list-out',
            text: str
        }).appendTo(this.panelNode)
    },
    popHistory: function(){
        this.panelNode.first()
    },

    init: function(){
        this.panelNode = $('.history-list')
    }
}