// 正常做法

const bubbleSort = (arr) => {
    let n = arr.length;

    for (let i = 1; i < n;i++) {
        for(let j = 0; j < n -1; j++) {
            if(arr[j] > arr[j + 1]) {
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]] // 交换位置
            }
        }
    }
}

const arr = [1,3,1,5,432,3,66,32]
bubbleSort(arr)
console.log(arr)


// 标志位优化

const bubbleSort2 = (arr) => {
    let n = arr.length;
    for(let i = 1;i < n;i++){
        let hasSort = true;
        for(let j = 0; j < n - 1;j++){
            if(arr[j] > arr[j + 1]){
                [arr[j], arr[j + 1]] = [arr[j + 1],arr[j]] // 交换位置
                hasSort = false
            }
        }

        if(hasSort){
            break;
        }
    }
}

const arr1 = [1,3,1,5,432,3,66,32]
bubbleSort2(arr1)
console.log(arr1)


// 大数下沉
const bubbleSort3 = (arr) => {
    let n = arr.length, k = n - 1, swapPos = 0;

    for(let i = 1; i < n; i++) {
        let hasSort = true

        for(let j= 0;j < k; j++) {
            if(arr[j] > arr[j+1]) {
                [arr[j],arr[j+1]] = [arr[j+1],arr[j]] // 交换位置
                hasSort = false;
                swapPos = j; // 记录交换位置，下次只循环到上一次交换位置
            }
        }

        if(hasSort) break

        k = swapPos; // 重写内部循环最后边界
    }
}

const arr2 = [1,3,1,5,432,3,66,32]
bubbleSort3(arr2)
console.log(arr2)

// 测试性能函数
const shuffle = (a) => {
    let len = a.length;

    for(let i = 0; i < len - 1; i++) {
        let index =  parseInt((Math.random() * (len - i)).toString())

        let temp = a[index]
        a[index] = a[len - i - 1]
        a[len - i - 1] = temp
    }
}

// 鸡尾酒排序
const cocktailSort = (arr) => {
    let left, right, index, i;
    left = 0; // 数组起始索引
    right = arr.length - 1; // 数组索引最大值
    index = left; // 临时变量

    // 判断数组中是否有多个元素
    while (right > left) {
        let isSorted = false;
        // 每一次进入while循环， 都会找出相应范围内最大最小的元素并分别放到相应的位置
        // 大的排到后面
        for (i = left; i < right; i++) { // 从左向右扫描
            if(arr[i] > arr[i + 1]) {
                [arr[i],arr[i + 1]] = [arr[i + 1], arr[i]]
                index = i; // 记录当前索引
                isSorted = true
            }
        }

        right = index; // 记录最后一个交换的位置

        // 小的放在前面
        for(i = right; i > left; i--) { // 从最后一个交换位置从右向左扫描
            if(arr[i] < arr[i - 1]) {
                [arr[i],arr[i - 1]] = [arr[i - 1], arr[i]]
                index = i;
                isSorted = true;
            }
        }

        left = index; // 记录最后一个交换的位置

        if(!isSorted) {
            break;
        }
    }
}


const arr3 = [1,3,1,5,432,3,66,32]
cocktailSort(arr3)
console.log(arr3,'arr3')

const test = (sortFn) => {
    let array = []
    // 向数组中写入10 000 数据， 其中前1000个数据倒序， 后9000个数据顺序

    for(let i = 0; i < 10000; i++) {
        if(i < 1000) {
            array[i] = 1000 - i
        }else {
            array[i] = i
        }
    }

    console.log('=============')

    let start = new Date() - 0
    sortFn(array)

    console.log('部分有序的情况', sortFn.name, new Date() - start)
    shuffle(array)

    start = new Date() - 0
    sortFn(array)

    console.log('完全无序的情况', sortFn.name, new Date() - start)
}

test(bubbleSort)
test(bubbleSort2)
test(bubbleSort3)
test(cocktailSort)
