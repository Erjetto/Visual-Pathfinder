const NODE_STATE = {
    OPENED: 1,
    CLOSED: 2,
    START:  3,
    END:    4,
    EMPTY:  5,
    BLOCKED:6
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

        _state      : NODE_STATE.EMPTY,
        get state() {
            return this._state;
        },
        set state(value) {
            this._state = value;
        },
    }
}