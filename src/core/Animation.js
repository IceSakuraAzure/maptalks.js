import {
    extend,
    now,
    isNumber,
    isString,
    requestAnimFrame
} from 'core/util';
import Point from 'geo/Point';
import Coordinate from 'geo/Coordinate';

/**
 * @classdesc
 * Easing functions for anmation, from openlayers 3
 * @class
 * @category animation
 * @memberOf animation
 * @name Easing
 * @protected
 */
export const Easing = {
    /**
     * Start slow and speed up.
     * @param {number} t Input between 0 and 1.
     * @return {number} Output between 0 and 1.
     */
    in(t) {
        return Math.pow(t, 2);
    },

    /**
     * Start fast and slow down.
     * @param {number} t Input between 0 and 1.
     * @return {number} Output between 0 and 1.
     */
    out(t) {
        return 1 - Easing.in(1 - t);
    },

    /**
     * Start slow, speed up, and then slow down again.
     * @param {number} t Input between 0 and 1.
     * @return {number} Output between 0 and 1.
     */
    inAndOut(t) {
        return 3 * t * t - 2 * t * t * t;
    },

    /**
     * Maintain a constant speed over time.
     * @param {number} t Input between 0 and 1.
     * @return {number} Output between 0 and 1.
     */
    linear(t) {
        return t;
    },

    /**
     * Start slow, speed up, and at the very end slow down again.  This has the
     * same general behavior as {@link inAndOut}, but the final slowdown
     * is delayed.
     * @param {number} t Input between 0 and 1.
     * @return {number} Output between 0 and 1.
     */
    upAndDown(t) {
        if (t < 0.5) {
            return Easing.inAndOut(2 * t);
        } else {
            return 1 - Easing.inAndOut(2 * (t - 0.5));
        }
    }
};

/**
 * @classdesc
 * Animation Frame used internally n animation player.
 * @class
 * @category animation
 * @memberOf animation
 * @name Frame
 * @protected
 * @param {Object} state  - animation state
 * @param {Object} styles - styles to animate
 */
export const Frame = function (state, styles) {
    this.state = state;
    this.styles = styles;
};

/**
 * @classdesc
 * [Web Animation API]{@link https://developer.mozilla.org/zh-CN/docs/Web/API/Animation} style animation player
 * @param {Function} animation - animation [framing]{@link framing} function
 * @param {Object} options     - animation options
 * @param  {Function} step  - callback function for animation steps
 * @class
 * @category animation
 * @memberOf animation
 * @name Player
 */
export class Player {
    constructor(animation, options, step) {
        this._animation = animation;
        this._options = options;
        this._stepFn = step;
        this.playState = 'idle';
        this.ready = true;
        this.finished = false;
    }
}

/**
 * @classdesc
 * Utilities for animation
 * @class
 * @category animation
 */
export const Animation = {
    /**
     * @property {Object} speed         - predefined animation speed
     * @property {Number} speed.slow    - 2000ms
     * @property {Number} speed.normal  - 1000ms
     * @property {Number} speed.fast    - 500ms
     */
    speed: {
        'slow': 2000,
        'normal': 1000,
        'fast': 500
    },

    /**
     * resolve styles for animation, get a style group of start style, styles to animate and end styles.
     * @param  {Object} styles - styles to resolve
     * @return {Object[]}  styles resolved
     * @private
     */
    _resolveStyles(styles) {
        if (!styles) {
            return null;
        }
        //resolve a child styles.
        function resolveChild(child) {
            if (!Array.isArray(child)) {
                return Animation._resolveStyles(child);
            }
            var start = [],
                d = [],
                dest = [];
            for (var i = 0; i < child.length; i++) {
                var styles = Animation._resolveStyles(child[i]);
                if (styles) {
                    start.push(styles[0]);
                    d.push(styles[1]);
                    dest.push(styles[2]);
                }
            }
            if (start.length === 0) {
                return null;
            } else {
                return [start, d, dest];
            }
        }
        // resolve a style value.
        function resolveVal(val) {
            var values = val,
                clazz;
            //val is just a destination value, so we set start value to 0 or a 0-point or a 0-coordinate.
            if (!Array.isArray(val)) {
                if (isNumber(val)) {
                    values = [0, val];
                } else if (val instanceof Point || val instanceof Coordinate) {
                    clazz = val.constructor;
                    values = [new clazz(0, 0), val];
                } else {
                    values = [val, val];
                }
            }
            //val is a array and val[0] is the start value and val[1] is the destination value.
            var v1 = values[0],
                v2 = values[1];
            if (isNumber(v1) && isNumber(v2)) {
                if (v1 === v2) {
                    return null;
                }
                return [v1, v2 - v1, v2];
            } else if (Array.isArray(v1) || v1 instanceof Coordinate || v1 instanceof Point) {
                // is a coordinate (array or a coordinate) or a point
                if (Array.isArray(v1)) {
                    v1 = new Coordinate(v1);
                    v2 = new Coordinate(v2);
                } else {
                    clazz = v1.constructor;
                    v1 = new clazz(v1);
                    v2 = new clazz(v2);
                }
                if (v1.equals(v2)) {
                    //a Coordinate or a Point to be eql with each other
                    return null;
                }
                return [v1, v2.substract(v1), v2];
            } else {
                return [v1, 0, v2];
            }
        }

        function isChild(val) {
            if (!Array.isArray(val) && val.constructor === Object) {
                return true;
            } else if (Array.isArray(val) && val[0].constructor === Object) {
                return true;
            }
            return false;
        }

        var d = {},
            start = {},
            dest = {};
        for (var p in styles) {
            if (styles.hasOwnProperty(p)) {
                var values = styles[p];
                var childStyles;
                if (isChild(values)) {
                    childStyles = resolveChild(values);
                } else {
                    childStyles = resolveVal(values);
                }
                if (childStyles) {
                    start[p] = childStyles[0];
                    d[p] = childStyles[1];
                    dest[p] = childStyles[2];
                }
            }
        }
        return [start, d, dest];
    },

    /**
     * Generate a framing function
     * @param  {Object[]} styles        - animation style group
     * @param  {Object} [options=null]  - options
     * @param  {Object} [options.easing=null]  - animation easing
     * @return {Function} framing function helps to generate animation frames.
     */
    framing(styles, options) {
        if (!options) {
            options = {};
        }
        var easing = options['easing'] ? Easing[options['easing']] : Easing.linear;
        if (!easing) {
            easing = Easing.linear;
        }
        var dStyles, startStyles, destStyles;
        styles = Animation._resolveStyles(styles);
        if (styles) {
            startStyles = styles[0];
            dStyles = styles[1];
            destStyles = styles[2];
        }
        var deltaStyles = function (delta, _startStyles, _dStyles) {
            if (!_startStyles || !_dStyles) {
                return null;
            }
            var result = {};
            for (var p in _dStyles) {
                if (_dStyles.hasOwnProperty(p)) {
                    if (_startStyles[p] === destStyles[p]) {
                        result[p] = _startStyles[p];
                        continue;
                    }
                    var s = _startStyles[p],
                        d = _dStyles[p];
                    if (isNumber(d)) {
                        //e.g. radius, width, height
                        result[p] = s + delta * d;
                    } else if (Array.isArray(d)) {
                        //e.g. a composite symbol, element in array can only be a object.
                        var children = [];
                        for (var i = 0; i < d.length; i++) {
                            children.push(deltaStyles(delta, s[i], d[i]));
                        }
                        result[p] = children;
                    } else {
                        //e.g. translate or a child
                        var clazz = d.constructor;
                        if (clazz === Object) {
                            result[p] = deltaStyles(delta, s, d);
                        } else if (s instanceof Point || s instanceof Coordinate) {
                            result[p] = s.add(d.multi(delta));
                        }
                    }
                }
            }
            return result;
        };
        return function (elapsed, duration) {
            var state, d;
            if (elapsed < 0) {
                state = {
                    'playState': 'idle',
                    'delta': 0
                };
                d = startStyles;
            } else if (elapsed < duration) {
                var delta = easing(elapsed / duration);
                state = {
                    'playState': 'running',
                    'delta': delta
                };
                d = deltaStyles(delta, startStyles, dStyles);
            } else {
                state = {
                    'playState': 'finished',
                    'delta': 1
                };
                d = destStyles;
            }
            state['startStyles'] = startStyles;
            state['destStyles'] = destStyles;
            return new Frame(state, d);
        };

    },

    _requestAnimFrame(fn) {
        if (!this._frameQueue) {
            this._frameQueue = [];
        }
        this._frameQueue.push(fn);
        this._a();
    },

    _a() {
        if (!this._animationFrameId) {
            this._animationFrameId = requestAnimFrame(Animation._frameFn);
        }
    },

    _run() {
        if (this._frameQueue.length) {
            var running = this._frameQueue;
            this._frameQueue = [];
            for (var i = 0, len = running.length; i < len; i++) {
                running[i]();
            }
            if (this._frameQueue.length) {
                this._animationFrameId = requestAnimFrame(Animation._frameFn);
            } else {
                delete this._animationFrameId;
            }
        }
    },

    /**
     * Get a animation player
     * @param  {Object} styles  - styles to animate
     * @param  {Object} options - animation options
     * @param  {Function} step  - callback function for animation steps
     * @return {Player} player
     */
    animate(styles, options, step) {
        if (!options) {
            options = {};
        }
        var animation = Animation.framing(styles, options);
        return new Player(animation, options, step);
    }
};

Animation._frameFn = Animation._run.bind(Animation);

extend(Player.prototype, {
    _prepare() {
        var options = this._options;
        var duration = options['speed'];
        if (isString(duration)) {
            duration = Animation.speed[duration];
            if (!duration) {
                duration = +duration;
            }
        }
        if (!duration) {
            duration = Animation.speed['normal'];
        }
        this.duration = duration;
    },

    /**
     * Start or resume the animation
     * @return {Player} this
     */
    play() {
        if (this.playState !== 'idle' && this.playState !== 'paused') {
            return this;
        }
        if (this.playState === 'idle') {
            this.currentTime = 0;
            this._prepare();
        }
        var t = now();
        if (!this.startTime) {
            var options = this._options;
            this.startTime = options['startTime'] ? options['startTime'] : t;
        }
        this._playStartTime = Math.max(t, this.startTime);
        if (this.playState === 'paused') {
            this._playStartTime -= this.currentTime;
        }
        this.playState = 'running';
        this._run();
        return this;
    },

    /**
     * Pause the animation
     * @return {Player} this
     */
    pause() {
        this.playState = 'paused';
        //this.duration = this.duration - this.currentTime;
        return this;
    },

    /**
     * Cancel the animation play and ready to play again
     * @return {Player} this
     */
    cancel() {
        this.playState = 'idle';
        this.finished = false;
        return this;
    },

    /**
     * Finish the animation play, and can't be played any more.
     * @return {Player} this
     */
    finish() {
        this.playState = 'finished';
        this.finished = true;
        return this;
    },

    reverse() {
    },

    _run() {
        if (this.playState === 'finished' || this.playState === 'paused') {
            return;
        }
        const t = now();
        var elapsed = t - this._playStartTime;
        if (this._options['repeat'] && elapsed >= this.duration) {
            this._playStartTime = t;
            elapsed = 0;
        }
        //elapsed, duration
        const frame = this._animation(elapsed, this.duration);
        this.playState = frame.state['playState'];
        const step = this._stepFn;
        if (this.playState === 'idle') {
            setTimeout(this._run.bind(this), this.startTime - t);
        } else if (this.playState === 'running') {
            this._animeFrameId = Animation._requestAnimFrame(() => {
                if (this.playState !== 'running') {
                    return;
                }
                this.currentTime = now - this._playStartTime;
                if (step) {
                    step(frame);
                }
                this._run();
            });
        } else if (this.playState === 'finished') {
            this.finished = true;
            //finished
            if (step) {
                requestAnimFrame(function () {
                    step(frame);
                });
            }
        }

    },
});