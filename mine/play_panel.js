var PlayPanel = {
    panel: undefined,

    init: function(){
        this.panel = $('.buttons_panel')
        this.backButton =  $('<button/>', {
            css: {
                width:'100px'
            },
            text: 'Previous'
        }).appendTo(this.panel)
        this.playButton = $('<button/>', {
            css: {
                width:'100px'
            },
            text: 'Play'
        }).appendTo(this.panel)
        this.forwardButton =  $('<button/>', {
            css: {
                width:'100px'
            },
            text: 'Next'
        }).appendTo(this.panel)
    }
}

// Buttons list