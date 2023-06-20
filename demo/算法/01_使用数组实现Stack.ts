import IStack from "../types/IStack"


/**
 * 使用数组实现栈
 */
class ArrayStack<T = any> implements IStack<T> {
    private data: T[] = [];

    push(item: T): void {
        this.data.push(item)
    }

    pop(): T | undefined {
        return this.data.pop()
    }

    peek(): T {
        return this.data[this.data.length - 1]
    }

    isEmpty(): boolean {
        return this.data.length === 0
    }

    get size(): number {
        return this.data.length
    }

}

const stack1 = new ArrayStack<number>();
stack1.push(1)
stack1.push(2)
stack1.push(3)

console.log(stack1)

stack1.pop()
const pk = stack1.peek()
console.log(pk)

console.log(stack1)

console.log(stack1.isEmpty())
