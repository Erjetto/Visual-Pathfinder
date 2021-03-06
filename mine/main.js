/*
Controller
- Control play button & states
- Connect View & Calculator
- 

View
- Change node attribute & animate them
- Draw line
- Move node to queue


Calculator
- Where command pattern exists
- 

Operation between calculator & view (and informations)
- Open (node)
- Close (node)
- toQueue (node)
- popQueue ()
- sortQueue ()

*/

// Initialize variable, get elements, etc.
inits= [
    PlayPanel,  // Get buttons
    CodePanel,  // For code panel
    Calculator, // For algorithm
    View,       // For grid view
    Controller, // For time control?
]

window.onload = function() {
    if (!Raphael.svg) {
        window.location = './notsupported.html';
    }

    // suppress select events
    $(window).bind('selectstart', function(event) {
        event.preventDefault();
    });

    inits.forEach(obj => {
        if(obj.init != undefined)
            obj.init()
    });
};

