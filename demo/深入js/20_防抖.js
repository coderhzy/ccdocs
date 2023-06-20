function debounce(fn, delay, immediate = false, callBack) {
    let timer = null;
    let isInvoke = false;// 这个东西是否之前执行过

    function _debounce(...args) {
        return new Promise((resolve,reject) => {
            if(timer) clearTimeout(timer);

            // 判断是否需要立即执行
            if(immediate && !isInvoke) {
                const result = fn.apply(this, args)
                if(callBack) callBack(result)
                resolve(result)
                isInvoke = true
            }else {
                timer = setTimeout(() => {
                    const result = fn.apply(this, args)
                    if(callBack) callBack(result)
                    resolve(result)
                    isInvoke = false
                },delay)
            }
        })
    }

    _debounce.cancel = function () {
        if(timer) clearTimeout(timer)
        timer = null
        isInvoke = false
    }


    return _debounce
}
