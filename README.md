# tween-task

[![npm](https://img.shields.io/npm/v/tween-task.svg)](https://www.npmjs.com/package/tween-task) ![Github file size](https://img.shields.io/github/size/shalldie/tween-task/dist/tween-task.js.svg)

A lib to make easy tween task.

简易缓动函数库。

## Installation
    npm install tween-task

## Usage

```ts
import Task from './tween-task';
// let Task = window.TweenTask; // window
// let Task = require('tween-task'); // commonjs

// run a task with default interval
// 使用内置的 setInterval 来启动任务
Task.run({
    from: { x: 1 },
    to: { x: 100 },
    onUpdate({ x }) {
        console.log('x has been updated:' + x);
    },
    done() {
        console.log('task has been done.')
    }
});

// or update when you like
// 或者在你喜欢的时机去更新

const task = new Task({
    from: { x: 1 },
    to: { x: 100 },
    onUpdate({ x }) {
        console.log('x is :' + x);
    },
    done() {
        console.log('task has been done.')
    }
});

(function update() {
    task.update();
    if (task.done) {
        return;
    }
    requestAnimationFrame(update);
})();
```

## Support
    IE6+

# Api

## ITaskOptions

```ts
interface ITaskOptions<T> {
    from: T;
    to: T;
    duration?: number;
    tween?: Function;
    onUpdate?: (cord: T) => void;
    done?: (cord: T) => void;
}
```

|   Name   | Required |    Type    |       Default        |                          Description                          |
| :------- | :------: | :--------: | :------------------: | :------------------------------------------------------------ |
| from     |  `true`  |  `Object`  |                      | properties of from <br>起始的属性                             |
| to       |  `true`  |  `Object`  |                      | properties of to <br>目标属性                                 |
| duration | `false`  |  `Number`  |        `1000`        | duration of the task. <br>任务持续时间                        |
| tween    | `false`  | `Function` | a function of linear | custom tween function <br>自定义的缓动函数                    |
| onUpdate | `false`  | `Function` |                      | Function invoked when task updated <br>任务每次更新的时候触发 |
| done     | `false`  | `Function` |                      | Function invoked when task finished <br>任务结束的时候触发    |

## Methods

|  Name  |                 Description                 |
| :----- | :-----------------------------------------: |
| update | make the task to computed <br> 主动触发计算 |

Example:

```ts
const Task = new Task({...});
Task.update();
```

# Enjoy it! :D
