/**
 * 需要自动完成某些任务的时候，使用 setinterval
 */
declare type FnInterval = (remove?: Function) => void;
export default class Timer {
    /**
     * 全局唯一的定时器
     *
     * @private
     * @static
     * @type {number}
     * @memberof Timer
     */
    private static interval;
    /**
     * 所有帧会执行的方法队列
     *
     * @private
     * @static
     * @type {FnInterval[]}
     * @memberof Timer
     */
    private static callbacks;
    /**
     * 手动开始，一般用不上
     *
     * @static
     * @returns {void}
     * @memberof Timer
     */
    static start(): void;
    /**
     * 强制停止
     *
     * @static
     * @memberof Timer
     */
    static stop(): void;
    /**
     * 添加帧回调
     *
     * @static
     * @param {FnInterval} fn
     * @memberof Timer
     */
    static add(fn: FnInterval): void;
    /**
     * 移除帧回调
     *
     * @static
     * @param {FnInterval} fn
     * @memberof Timer
     */
    static remove(fn: FnInterval): void;
    /**
     * 根据索引移除帧回调
     *
     * @static
     * @param {number} index
     * @memberof Timer
     */
    static removeByIndex(index: number): void;
}
export {};
