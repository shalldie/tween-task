
(async () => {
    await new Promise(res => {
        setTimeout(() => {
            res();
        }, 1000);
    })
    console.log('hello worslddd');
})();
