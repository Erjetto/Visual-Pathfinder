var PlayPanel = {
    panel: undefined,
    buttonAttributes: {
        css: {
            width:'100px'
        },
        class: 'control_button'
    },
    init: function(){
        this.panel = $('.buttons_panel')
        this.backButton =  $('<button/>', {
            text: 'Previous',
            ...this.buttonAttributes
        }).appendTo(this.panel)
        this.playButton = $('<button/>', {
            text: 'Play',
            ...this.buttonAttributes
        }).appendTo(this.panel)
        this.forwardButton =  $('<button/>', {
            text: 'Next',
            ...this.buttonAttributes
        }).appendTo(this.panel)
    }
}

// Buttons list