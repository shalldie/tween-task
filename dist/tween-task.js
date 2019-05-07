(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.TweenTask = factory());
}(this, function () { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    /**
     * 需要自动完成某些任务的时候，使用 setinterval
     */
    var Timer = /** @class */ (function () {
        function Timer() {
        }
        /**
         * 手动开始，一般用不上
         *
         * @static
         * @returns {void}
         * @memberof Timer
         */
        Timer.start = function () {
            if (Timer.interval) {
                return;
            }
            Timer.interval = setInterval(function () {
                if (!Timer.callbacks.length) {
                    Timer.stop();
                    return;
                }
                var _loop_1 = function (i, len) {
                    Timer.callbacks[i](function () { return Timer.removeByIndex(i); });
                };
                for (var i = 0, len = Timer.callbacks.length; i < len; i++) {
                    _loop_1(i, len);
                }
            }, 17);
        };
        /**
         * 强制停止
         *
         * @static
         * @memberof Timer
         */
        Timer.stop = function () {
            clearInterval(Timer.interval);
            Timer.interval = 0;
        };
        /**
         * 添加帧回调
         *
         * @static
         * @param {FnInterval} fn
         * @memberof Timer
         */
        Timer.add = function (fn) {
            Timer.callbacks.push(fn);
            Timer.start();
        };
        /**
         * 移除帧回调
         *
         * @static
         * @param {FnInterval} fn
         * @memberof Timer
         */
        Timer.remove = function (fn) {
            var index = Timer.callbacks.indexOf(fn);
            if (~index) {
                Timer.removeByIndex(index);
            }
        };
        /**
         * 根据索引移除帧回调
         *
         * @static
         * @param {number} index
         * @memberof Timer
         */
        Timer.removeByIndex = function (index) {
            Timer.callbacks.splice(index, 1);
        };
        /**
         * 所有帧会执行的方法队列
         *
         * @private
         * @static
         * @type {FnInterval[]}
         * @memberof Timer
         */
        Timer.callbacks = [];
        return Timer;
    }());

    // function linear(t: number, b: number, c: number, d: number, s = 1.70158) {
    //     if (s == undefined) s = 1.70158;
    //     return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    // };
    var linear = function (t, b, c, d) { return c * t / d + b; };
    var Task = /** @class */ (function () {
        function Task(options) {
            this.startTime = +new Date;
            this.done = false;
            options = __assign({
                duration: 1000,
                tween: linear
            }, options);
            this.options = options;
        }
        /**
         * 开始/重置 开始时间
         *
         * @returns {this}
         * @memberof Task
         */
        Task.prototype.start = function () {
            this.startTime = +new Date;
            return this;
        };
        /**
         * 重新计算当前帧
         *
         * @returns {this}
         * @memberof Task
         */
        Task.prototype.update = function () {
            var t = +new Date - this.startTime;
            if (t > this.options.duration) {
                t = this.options.duration;
                this.done = true;
            }
            var _a = this.options, from = _a.from, to = _a.to, tween = _a.tween, duration = _a.duration;
            var result = {};
            for (var key in from) {
                var start = from[key];
                var end = to[key];
                result[key] = tween(t, start, end - start, duration);
            }
            if (this.options.onUpdate) {
                this.options.onUpdate(result);
            }
            if (this.done && this.options.done) {
                this.options.done(result);
            }
            return this;
        };
        /**
         * 初始化，并使用内置的timer来启动task
         *
         * @static
         * @param {ITaskOptions} options
         * @returns {Task}
         * @memberof Task
         */
        Task.run = function (options) {
            var task = new Task(options).start();
            Timer.add(function (remove) {
                task.update();
                task.done && remove();
            });
            return task;
        };
        return Task;
    }());

    var tween = function (t, b, c, d, a, p) {
        if (t == 0)
            return b;
        if ((t /= d) == 1)
            return b + c;
        if (!p)
            p = d * .3;
        if (!a || a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        }
        else
            var s = p / (2 * Math.PI) * Math.asin(c / a);
        return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
    };
    var duration = 2000;
    function setOffset(id, _a) {
        var x = _a.x, y = _a.y;
        document.getElementById(id).style.cssText =
            // `left:${x}px;top:${y}px;`;
            "transform:translate3d(" + x + "px," + y + "px,0)";
    }
    Task.run({
        from: {
            x: 0, y: 50
        },
        to: {
            x: 500, y: 50
        },
        duration: duration,
        tween: tween,
        onUpdate: function (cord) {
            setOffset('block1', cord);
        },
        done: function (cord) {
            console.log('interval:', cord);
        }
    });
    var task = new Task({
        from: {
            x: 0, y: 200
        },
        to: {
            x: 500, y: 200
        },
        duration: duration,
        tween: tween,
        onUpdate: function (cord) {
            setOffset('block2', cord);
        },
        done: function (cord) {
            console.log('requestAnimationFrame:', cord);
        }
    });
    (function update() {
        task.update();
        if (task.done) {
            return;
        }
        requestAnimationFrame(update);
    })();

    return Task;

}));
