class EventBus {
    constructor() {
        this.events = this.events || new Map();
    }

    // 监听事件
    on(type, fn) {
        if(!this.events.get(type)) {
            this.events.set(type, fn);
        }
    }

    // 触发事件
    emit(type, ...args) {
        let handler;
        if(this.events.get(type)) {
            handler = this.events.get(type);
            handler.apply(this, args);
        }
    }

    // 移除事件
    off(type) {
        let handler = this.events.get(type);
        if(handler) {
            this.events.delete(type);
        }
    }

    // 只监听一次
    once(type, fn) {
        const onceWrapper = (...args) => {
            fn.apply(this, args);
            this.off(type);
        }
        this.on(type, onceWrapper);
    }
}

// 使用示例
let bus = new EventBus();
bus.on('greet', (name) => {
    console.log(`Hello, ${name}!`);
});

bus.emit('greet', 'World');  // Hello, World!
bus.off('greet');
bus.emit('greet', 'World');  // Nothing will happen

bus.once('greetOnce', (name) => {
    console.log(`Hello, ${name}! This will not be shown next time.`);
});
bus.emit('greetOnce', 'World');  // Hello, World! This will not be shown next time.
bus.emit('greetOnce', 'World');  // Nothing will happen
