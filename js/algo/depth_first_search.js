// Depth First Search
class DFS {
    constructor(map) {
        this.map = map
        this.interval = null
        this.stack = []
        this.parent = {}
        this.search = this.search.bind(this)
        this.time = null
    }

    start_search() {
        this.stack.push(this.map.start)
        this.parent[this.map.start.value] = null // Set parent of start node as null
        this.interval = setInterval(this.search, get_speed())
        this.time = new Date()
    }

    search() {
        // If stack is empty then clear interval
        if (this.stack.length == 0) {
            clearInterval(this.interval)
            this.interval = null
            show_msg("Path Not Found")
            update_status("Path Not Found")
            return
        }
        else {
            let node = this.stack.pop() // Pop last element from stack
            // Do not change color if node is start node
            if (node.color != COLORS["START"])
                node.color = COLORS["VISITED"]

            // Get neighbors of node
            let neighbors = this.map.get_neighbors(node.i, node.j)
            for (let i=0;i<neighbors.length;i++) {
                let n_node = neighbors[i]
                // If neighbor is goal then clearInterval and break loop
                if (n_node.color == COLORS["GOAL"]) {
                    let delta_time = (new Date() - this.time) / 1000
                    this.parent[n_node.value] = node.value
                    clearInterval(this.interval)
                    this.interval = null
                    this.display_path(this.parent, this.stack)
                    show_msg("Path Found!")
                    show_msg(`TOOK: ${delta_time} sec`)
                    update_status(`TIME: ${delta_time} sec`)
                    return
                }

                // If neighbor is unvisited node then add it to stack and change color so it wouldn't be selected again
                if (n_node.color == COLORS["FILL"]) {
                    this.parent[n_node.value] = node.value
                    this.stack.push(n_node)
                    n_node.color = COLORS["SELECTED"]
                }
            }
        }
        this.map.draw_nodes()
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
        while(this.stack.length) {
            let node = this.stack.pop()
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

