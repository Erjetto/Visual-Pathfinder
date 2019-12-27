const NODE_STATE = {
    OPENED: 'opened',
    CLOSED: 'closed',
    EMPTY:  'empty',
    BLOCKED:'blocked',
    START:'start',
    END:'end'
}
/**
 * 
 * @param {Object} param 
 * @param {Number} param.gridX
 * @param {Number} param.gridY
 */
var GridNode = function(param){
    return {
        gridX       : param.gridX,
        gridY       : param.gridY,
        neighbours  : [],
        parent      : undefined,
        state       : NODE_STATE.EMPTY,
        isStart     : false,
        isEnd       : false,
        values      : {
            f: 0, 
            g: 0,
            h: 0
        },
        view        : {
            group: undefined, // no group in Raphael :(
            rect: undefined,
            f: undefined,
            g: undefined,
            h: undefined
        },
    }
}