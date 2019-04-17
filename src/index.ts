import Task from "./lib/task";

export default Task;

const tween = function (t, b, c, d, a, p) {
    if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
    if (!a || a < Math.abs(c)) { a = c; var s = p / 4; }
    else var s = p / (2 * Math.PI) * Math.asin(c / a);
    return (a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b);
};

const duration = 2000;

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
        document.getElementById('block1').style.cssText = `left:${cord.x}px;top:${cord.y}px;`;
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
        document.getElementById('block2').style.cssText = `left:${cord.x}px;top:${cord.y}px;`;
    }
});

function invoke() {

    task.update();
    if (task.done) {
        return;
    }

    requestAnimationFrame(invoke);
}

invoke();
