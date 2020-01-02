var CodePanel = {
    panelNode: undefined,
    lines: [],
    activeLine: undefined,

    init: function(){
        this.panelNode = $('.codes_panel') // Get panel
    },
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
}

var HistoryPanel = {
    panelNode: undefined,
    deletedPanelNode: undefined,
    lines: [],

    pushToHistory: function(str){
        
        $('<li/>', {
            class:'animate-list-enter',
            text: str
        }).prependTo(this.panelNode)
    },
    popHistory: function(){        
        this.panelNode.children(":first").appendTo(this.deletedPanelNode)
        .removeClass('animate-list-enter')
        .addClass('animate-list-out')
        .delay(200)
        .queue(function(){$(this).remove().dequeue()})
        
        
    },

    init: function(){
        this.panelNode = $('.history-list')
        this.deletedPanelNode = $('.deleted-history-list')
    }
}