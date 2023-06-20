// function requestData(url, successCallback, errorCallBack){
//     setTimeout(() => {
//         if(Math.random() > 0.5){
//             successCallback('成功')
//         }else{
//             errorCallBack('失败')
//         }
//     },3000)
// }
//
// requestData('kobe', (res) => {
//     console.log(res)
// }, (err) => {
//     console.log(err)
// })

function foo(){
    return new Promise((resolve,reject) => {
        resolve('成功')
    })
}

// 此种用法符合promise规范
const fooPromise = new foo()
fooPromise.then((res) => {
    console.log(res)
},(err) => {
    console.log(err)
})

