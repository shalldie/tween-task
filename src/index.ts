import Timer from './lib/Timer';

var time = +new Date;
Timer.add(function (remove) {
    console.log(+new Date);

    if (+new Date - time > 2000) {
        remove();
    }
});

export default Timer;
