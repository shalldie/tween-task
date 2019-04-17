interface ITaskOptions<T> {
    from: T;
    to: T;
    duration?: number;
    tween?: Function;
    onUpdate?: (cord: T) => void;
    done?: (cord: T) => void;
}
export default class Task<T> {
    private startTime;
    done: boolean;
    private options;
    constructor(options: ITaskOptions<T>);
    /**
     * 开始/重置 开始时间
     *
     * @returns {this}
     * @memberof Task
     */
    start(): this;
    /**
     * 重新计算当前帧
     *
     * @returns {this}
     * @memberof Task
     */
    update(): this;
    /**
     * 初始化，并使用内置的timer来启动task
     *
     * @static
     * @param {ITaskOptions} options
     * @returns {Task}
     * @memberof Task
     */
    static run<T>(options: ITaskOptions<T>): Task<T>;
}
export {};
