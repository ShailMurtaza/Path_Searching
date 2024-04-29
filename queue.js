// Min Queue
class Queue {
    constructor() {
        this.queue = []
    }

    enqueue(node) {
        var flag = false
        for(let i=0;i<this.queue.length;i++) {
            if (this.queue[i].priority < node.priority) {
                this.queue.splice(i, 0, node)
                flag = true
                break
            }
        }
        if (!flag) this.queue.push(node)
    }

    dequeue() {
        return this.queue.pop() // Min queue, pop last element because it has highest priority
    }
}

