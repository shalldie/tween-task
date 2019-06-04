/**
 * 需要自动完成某些任务的时候，使用 setinterval
 */

type FnInterval = (remove?: Function) => void;

export default class Timer {

    /**
     * 全局唯一的定时器
     *
     * @private
     * @static
     * @type {number}
     * @memberof Timer
     */
    private static interval: number;

    /**
     * 所有帧会执行的方法队列
     *
     * @private
     * @static
     * @type {FnInterval[]}
     * @memberof Timer
     */
    private static callbacks: FnInterval[] = [];

    /**
     * 手动开始，一般用不上
     *
     * @static
     * @returns {void}
     * @memberof Timer
     */
    public static start(): void {
        if (Timer.interval) {
            return;
        }

        Timer.interval = setInterval(function () {
            if (!Timer.callbacks.length) {
                Timer.stop();
                return;
            }

            for (let i = 0, len = Timer.callbacks.length; i < len; i++) {
                const func = Timer.callbacks[i];
                func(() => Timer.remove(func));
                // Timer.callbacks[i](() => Timer.removeByIndex(i));
            }
        }, 17) as any as number;

    }

    /**
     * 强制停止
     *
     * @static
     * @memberof Timer
     */
    public static stop(): void {
        clearInterval(Timer.interval);
        Timer.interval = 0;
    }

    /**
     * 添加帧回调
     *
     * @static
     * @param {FnInterval} fn
     * @memberof Timer
     */
    public static add(fn: FnInterval): void {
        Timer.callbacks.push(fn);
        Timer.start();
    }

    /**
     * 移除帧回调
     *
     * @static
     * @param {FnInterval} fn
     * @memberof Timer
     */
    public static remove(fn: FnInterval): void {
        const index = Timer.callbacks.indexOf(fn);
        if (~index) {
            Timer.removeByIndex(index);
        }
    }

    /**
     * 根据索引移除帧回调
     *
     * @static
     * @param {number} index
     * @memberof Timer
     */
    public static removeByIndex(index: number): void {
        Timer.callbacks.splice(index, 1);
    }

}
