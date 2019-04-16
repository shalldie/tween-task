

function linear(t: number, b: number, c: number, d: number, s = 1.70158) {
    if (s == undefined) s = 1.70158;
    return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
};

interface ITaskOptions {
    from: number;
    to: number;
    tween?: Function;
};

export default class Task {

    private startTime: number = +new Date();

    private from: number;

    private to: number;

    private tween: Function = linear;

    constructor(options: ITaskOptions) {
        Object.assign(this, options);
    }


    /**
     * 开始/重置 开始时间
     *
     * @returns {this}
     * @memberof Task
     */
    public start(): this {
        return this;
    }

    /**
     * 重新计算当前帧
     *
     * @returns {this}
     * @memberof Task
     */
    public update(): this {

        return this;
    }

    /**
     * 使用内置的timer来启动task
     *
     * @returns {this}
     * @memberof Task
     */
    public run(): this {

        return this;
    }
}
