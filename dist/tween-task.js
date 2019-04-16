(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.TweenTask = factory());
}(this, function () { 'use strict';

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

    var time = +new Date;
    Timer.add(function (remove) {
        console.log(+new Date);
        if (+new Date - time > 2000) {
            remove();
        }
    });

    return Timer;

}));
