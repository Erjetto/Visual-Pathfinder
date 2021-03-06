(function (a) {
    StateMachine = {
        VERSION: "2.1.0",
        Result: {
            SUCCEEDED: 1,
            NOTRANSITION: 2,
            CANCELLED: 3,
            ASYNC: 4
        },
        Error: {
            INVALID_TRANSITION: 100,
            PENDING_TRANSITION: 200,
            INVALID_CALLBACK: 300
        },
        WILDCARD: "*",
        ASYNC: "async",
        create: function (f, g) {
            var i = (typeof f.initial == "string") ? {
                state: f.initial
            } : f.initial;
            var e = g || f.target || {};
            var k = f.events || [];
            var h = f.callbacks || {};
            var c = {};
            var j = function (l) {
                var o = (l.from instanceof Array) ? l.from : (l.from ? [l.from] : [StateMachine.WILDCARD]);
                c[l.name] = c[l.name] || {};
                for (var m = 0; m < o.length; m++) {
                    c[l.name][o[m]] = l.to || o[m]
                }
            };
            if (i) {
                i.event = i.event || "startup";
                j({
                    name: i.event,
                    from: "none",
                    to: i.state
                })
            }
            for (var d = 0; d < k.length; d++) {
                j(k[d])
            }
            for (var b in c) {
                if (c.hasOwnProperty(b)) {
                    e[b] = StateMachine.buildEvent(b, c[b])
                }
            }
            for (var b in h) {
                if (h.hasOwnProperty(b)) {
                    e[b] = h[b]
                }
            }
            e.current = "none";
            e.is = function (l) {
                return this.current == l
            };
            e.can = function (l) {
                return !this.transition && (c[l].hasOwnProperty(this.current) || c[l].hasOwnProperty(StateMachine.WILDCARD))
            };
            e.cannot = function (l) {
                return !this.can(l)
            };
            e.error = f.error || function (n, r, q, m, l, p, o) {
                throw o || p
            };
            if (i && !i.defer) {
                e[i.event]()
            }
            return e
        },
        doCallback: function (g, d, c, i, h, b) {
            if (d) {
                try {
                    return d.apply(g, [c, i, h].concat(b))
                } catch (f) {
                    return g.error(c, i, h, b, StateMachine.Error.INVALID_CALLBACK, "an exception occurred in a caller-provided callback function", f)
                }
            }
        },
        beforeEvent: function (d, c, f, e, b) {
            return StateMachine.doCallback(d, d["onbefore" + c], c, f, e, b)
        },
        afterEvent: function (d, c, f, e, b) {
            return StateMachine.doCallback(d, d["onafter" + c] || d["on" + c], c, f, e, b)
        },
        leaveState: function (d, c, f, e, b) {
            return StateMachine.doCallback(d, d["onleave" + f], c, f, e, b)
        },
        enterState: function (d, c, f, e, b) {
            return StateMachine.doCallback(d, d["onenter" + e] || d["on" + e], c, f, e, b)
        },
        changeState: function (d, c, f, e, b) {
            return StateMachine.doCallback(d, d.onchangestate, c, f, e, b)
        },
        buildEvent: function (b, c) {
            return function () {
                var h = this.current;
                var g = c[h] || c[StateMachine.WILDCARD] || h;
                var e = Array.prototype.slice.call(arguments);
                if (this.transition) {
                    return this.error(b, h, g, e, StateMachine.Error.PENDING_TRANSITION, "event " + b + " inappropriate because previous transition did not complete")
                }
                if (this.cannot(b)) {
                    return this.error(b, h, g, e, StateMachine.Error.INVALID_TRANSITION, "event " + b + " inappropriate in current state " + this.current)
                }
                if (false === StateMachine.beforeEvent(this, b, h, g, e)) {
                    return StateMachine.CANCELLED
                }
                if (h === g) {
                    StateMachine.afterEvent(this, b, h, g, e);
                    return StateMachine.NOTRANSITION
                }
                var f = this;
                this.transition = function () {
                    f.transition = null;
                    f.current = g;
                    StateMachine.enterState(f, b, h, g, e);
                    StateMachine.changeState(f, b, h, g, e);
                    StateMachine.afterEvent(f, b, h, g, e)
                };
                var d = StateMachine.leaveState(this, b, h, g, e);
                if (false === d) {
                    this.transition = null;
                    return StateMachine.CANCELLED
                } else {
                    if ("async" === d) {
                        return StateMachine.ASYNC
                    } else {
                        if (this.transition) {
                            this.transition()
                        }
                        return StateMachine.SUCCEEDED
                    }
                }
            }
        }
    };
    if ("function" === typeof define) {
        define([], function () {
            return StateMachine
        })
    } else {
        a.StateMachine = StateMachine
    }
}(this));