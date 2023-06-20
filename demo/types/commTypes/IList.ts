interface IList<T> {
  // peek
  peek(): T | undefined;
  // 判断是否为空
  isEmpty(): boolean;
  // 元素的个数
  get size(): number;
}

export default IList;
