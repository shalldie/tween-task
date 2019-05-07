import Task from "./lib/task";

export default Task;

const tween = function (t, b, c, d, a, p) {
    if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
    if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
};

const duration = 2000;

function setOffset(id: string, { x, y }) {
    document.getElementById(id).style.cssText =
        // `left:${x}px;top:${y}px;`;
        `transform:translate3d(${x}px,${y}px,0)`;
}

Task.run({
    from: {
        x: 0, y: 50
    },
    to: {
        x: 500, y: 50
    },
    duration,
    tween,
    onUpdate(cord) {
        setOffset('block1', cord);
    },
    done: cord => {
        console.log('interval:', cord);
    }
});

const task = new Task({
    from: {
        x: 0, y: 200
    },
    to: {
        x: 500, y: 200
    },
    duration,
    tween,
    onUpdate(cord) {
        setOffset('block2', cord);
    },
    done: cord => {
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
