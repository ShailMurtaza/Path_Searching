// A* search
class A_star {
    constructor(map) {
        this.map = map
        this.interval = null
        this.queue = new Queue()
        this.parent = {}
        this.g_n = {} // Store depth/g(n) for of every node
        this.search = this.search.bind(this)
        this.time = null
    }

    start_search() {
        let start_node = this.map.start
        let distance = map.distance(start_node, this.map.goal)
        // Here priority/distance is (g_n + h_n). No need to calculate f(n) for start node as g_n is zero
        this.queue.enqueue({node: start_node, priority: distance})
        this.g_n[start_node.value] = 0
        this.parent[start_node.value] = null // set parent of start node as null
        this.interval = setInterval(this.search, get_speed())
        this.time = new Date()
    }

    search() {
        // if queue is empty then clear interval
        if (this.queue.queue.length == 0) {
            clearInterval(this.interval)
            this.interval = null
            show_msg("Path Not Found")
            update_status("Path Not Found")
            return
        }
        else {
            let node = this.queue.dequeue().node // Pop first element from queue
            // Store g(n)
            let g_n = this.g_n[node.value]
            // From parent to child manhattan distance will always be 1 in our MAP. So neighbor node g(n) will always be same for every neighbor node from parent
            // Add 1 into g(n) of parent node to get g(n) of this child/neighbor node
            let n_node_g_n = g_n+1
            // Do not change color if node is start node
            if (node.color != COLORS["START"])
                node.color = COLORS["VISITED"]

            // Get neighbors of node
            let neighbors = this.map.get_neighbors(node.i, node.j)
            for (let i=0;i<neighbors.length;i++) {
                let n_node = neighbors[i]

                let distance = this.map.distance(n_node, this.map.goal)
                // Calculate f(n) = h(n) + g(n). f(n) will be priority
                let priority = distance + n_node_g_n

                if (n_node.color == COLORS["GOAL"]) {
                    let delta_time = (new Date() - this.time) / 1000
                    this.parent[n_node.value] = node.value
                    clearInterval(this.interval)
                    this.interval = null
                    this.display_path()
                    show_msg("Path Found!")
                    show_msg(`TOOK: ${delta_time} sec`)
                    update_status(`TIME: ${delta_time} sec`)
                    return
                }
                if (n_node.color == COLORS["FILL"]) {
                    this.parent[n_node.value] = node.value
                    this.g_n[n_node.value] = n_node_g_n
                    this.queue.enqueue({node: n_node, priority: priority})
                    n_node.color = COLORS["SELECTED"]
                }
                // If neighbor node has already been traversed then check if we get better g(n) from this parent node to neighbor node
                else if(n_node_g_n < this.g_n[n_node.value]) {
                    this.parent[n_node.value] = node.value
                    this.g_n[n_node.value] = n_node_g_n

                    // Update the priority queue because priority has been changed
                    // Remove neighbor node from queue
                    for (let i=0;i<this.queue.queue.length;i++) {
                        if (this.queue.queue[i].node.value == n_node.value) {
                            this.queue.queue.splice(i, 1)
                        }
                    }
                    // Now that node doesn't exist. Update it with new priority
                    this.queue.enqueue({node: n_node, priority: priority})
                }
            }
            this.map.draw_nodes()
        }
    }

    display_path() {
        var path = []
        var n = this.parent[this.map.goal.value]

        // Create path array
        while (n != null) { // n can also be 0. check for null
            path.push(n)
            n = this.parent[n]
        }

        // Change color of all selected nodes to visited for clear picture of this.map
        while(this.queue.queue.length) {
            let node = this.queue.dequeue().node
            node.color = COLORS["VISITED"]
        }
        for (let i=0;i<path.length-1;i++) {
            let row = Math.floor((path[i]) / this.map.cols) // Get row index using value of node
            let col = Math.floor((path[i]) % this.map.cols) // Get col index using value of node
            let node = this.map.nodes[row][col] // Get node using index values
            node.color = COLORS["PATH"] // Set color of path
        }
        set_steps(path.length)
        this.map.draw_nodes()
    }
}

