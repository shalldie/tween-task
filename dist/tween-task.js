!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):(t=t||self).TweenTask=n()}(this,function(){"use strict";var n=function(){return(n=Object.assign||function(t){for(var n,e=1,o=arguments.length;e<o;e++)for(var i in n=arguments[e])Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i]);return t}).apply(this,arguments)},o=function(){function o(){}return o.start=function(){o.interval||(o.interval=setInterval(function(){if(o.callbacks.length)for(var t=function(t,n){o.callbacks[t](function(){return o.removeByIndex(t)})},n=0,e=o.callbacks.length;n<e;n++)t(n);else o.stop()},17))},o.stop=function(){clearInterval(o.interval),o.interval=0},o.add=function(t){o.callbacks.push(t),o.start()},o.remove=function(t){var n=o.callbacks.indexOf(t);~n&&o.removeByIndex(n)},o.removeByIndex=function(t){o.callbacks.splice(t,1)},o.callbacks=[],o}(),i=function(t,n,e,o){return e*t/o+n};return function(){function e(t){this.startTime=+new Date,this.done=!1,t=n({duration:1e3,tween:i},t),this.options=t}return e.prototype.start=function(){return this.startTime=+new Date,this},e.prototype.update=function(){var t=+new Date-this.startTime;t>this.options.duration&&(t=this.options.duration,this.done=!0);var n=this.options,e=n.from,o=n.to,i=n.tween,r=n.duration,a={};for(var s in e){var u=e[s],c=o[s];a[s]=i(t,u,c-u,r)}return this.options.onUpdate&&this.options.onUpdate(a),this.done&&this.options.done&&this.options.done(a),this},e.run=function(t){var n=new e(t).start();return o.add(function(t){n.update(),n.done&&t()}),n},e}()});
