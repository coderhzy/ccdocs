const names = ['小明', '小红', '小刚']

let index = 0

const namesIterator = {
    next: function () {
        if(index < names.length){
            return {
                value: names[index++],
                done: false
            }
        }else {
            return {
                value: undefined,
                done: true
            }
        }
    }
}


console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())
console.log(namesIterator.next())

// { value: '小明', done: false }
// { value: '小红', done: false }
// { value: '小刚', done: false }
// { value: undefined, done: true }
// { value: undefined, done: true }
// { value: undefined, done: true }
// { value: undefined, done: true }
