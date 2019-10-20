import Timer from './timer';

// function linear(t: number, b: number, c: number, d: number, s = 1.70158) {
//     if (s == undefined) s = 1.70158;
//     return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
// };

// eslint-disable-next-line
const linear = (t, b, c, d) => c * t / d + b;
const TIMER_FUNC = '__TIMER_FUNC';

interface ITaskOptions<T> {
    from: T;
    to: T;
    duration?: number;
    tween?: Function;
    onUpdate?: (cord: T) => void;
    done?: (cord: T) => void;
}

export default class Task<T> {

    private startTime: number = +new Date;

    public done: boolean = false;

    private options: ITaskOptions<T>;

    constructor(options: ITaskOptions<T>) {
        options = {
            ...{
                duration: 1000,
                tween: linear
            },
            ...options
        };
        this.options = options;
    }

    /**
     * 开始/重置 开始时间
     *
     * @returns {this}
     * @memberof Task
     */
    public start(): this {
        this.startTime = +new Date;
        return this;
    }

    /**
     * 重新计算当前帧
     *
     * @returns {this}
     * @memberof Task
     */
    public update(): this {
        let t = +new Date - this.startTime;

        if (t > this.options.duration) {
            t = this.options.duration;
            this.done = true;
        }

        const { from, to, tween, duration } = this.options;
        const result = {} as T;
        for (const key in from) {
            const start = from[key] as any as number;
            const end = to[key] as any as number;
            result[key] = tween(t, start, end - start, duration);
        }
        if (this.options.onUpdate) {
            this.options.onUpdate(result);
        }
        if (this.done && this.options.done) {
            this.options.done(result);
        }

        return this;
    }

    /**
     * 初始化，并使用内置的timer来启动task
     *
     * @static
     * @param {ITaskOptions} options
     * @returns {Task}
     * @memberof Task
     */
    public static run<T>(options: ITaskOptions<T>): Task<T> {
        const task = new Task(options).start();
        task[TIMER_FUNC] = (remove: Function): void => {
            task.update();
            task.done && remove();
        };
        Timer.add(task[TIMER_FUNC]);
        return task;
    }

    /**
     * 释放资源，停止动画
     *
     * @memberof Task
     */
    dispose(): void {
        Timer.remove(this[TIMER_FUNC]);
    }

}
