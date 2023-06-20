import IList from "./commTypes/IList";


interface IStack<T> extends IList<T> {
    push(item: T): void;
    pop(): T | undefined;
}

export default IStack;
