// Bi-Directional Search
class Bi_directional {
    constructor(map) {
        this.map = map
        this.interval = null
        this.queue1 = []
        this.queue2 = []
        this.parent1 = {}
        this.parent2 = {}
        this.search = this.search.bind(this)
        this.time = null
    }

    start_search() {
        this.queue1.push(this.map.start)
        this.queue2.push(this.map.goal)
        this.parent1[this.map.start.value] = null // Set parent of start node as null
        this.parent2[this.map.goal.value] = null // Set parent of start node as null
        this.interval = setInterval(this.search, get_speed())
        this.time = new Date()
    }

    BFS(queue, parent) {
        let node = queue.shift() // Pop first element from queue
        // Do not change color if node is start node
        if (node.color != COLORS["START"] && node.color != COLORS["GOAL"])
            node.color = COLORS["VISITED"]

        // Get neighbors of node
        let neighbors = this.map.get_neighbors(node.i, node.j)
        for (let i=0;i<neighbors.length;i++) {
            let n_node = neighbors[i]
            // If neighbor is unvisited node then add it to queue and change color so it wouldn't be selected again
            if (!(n_node.value in parent) && n_node.color != COLORS["BLOCK"]) {
                parent[n_node.value] = node.value
                queue.push(n_node)
                n_node.color = COLORS["SELECTED"]
            }
        }
    }

    check_intersection() {
        for (const i in this.parent1) {
            if (i in this.parent2) {
                return i
            }
        }
        return -1
    }

    search() {
        // If queue is empty then clear interval
        if (this.queue1.length == 0 || this.queue2.length == 0) {
            clearInterval(this.interval)
            this.interval = null
            show_msg("Path Not Found")
            update_status("Path Not Found")
            return
        }
        else {
            this.BFS(this.queue1, this.parent1)
            this.BFS(this.queue2, this.parent2)
            let intersection = this.check_intersection()

            // If nodes intersect then clearInterval and break loop
            if (intersection != -1) {
                let delta_time = (new Date() - this.time) / 1000
                clearInterval(this.interval)
                this.interval = null
                this.display_path(intersection)
                show_msg("Path Found!")
                show_msg(`TOOK: ${delta_time} sec`)
                update_status(`TIME: ${delta_time} sec`)
                return
            }
        }
        this.map.draw_nodes()
    }


    display_path(intersection) {
        let path = this.generate_path(parseInt(intersection))
        // Change color of all selected nodes to visited for clear picture of this.map
        while(this.queue1.length) {
            let node = this.queue1.pop()
            node.color = COLORS["VISITED"]
        }
        while(this.queue2.length) {
            let node = this.queue2.pop()
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

    generate_path(intersection) {
        let path = []
        let n = intersection
        while (n != null) {
            path.push(n)
            n = this.parent1[n] // Get parent of n
        }
        path.pop() // Pop start node. No need for it in path
        path.reverse()

        path.pop() // Remove intersection node
        n = intersection
        while (n != null) {
            path.push(n)
            n = this.parent2[n] // Get parent of n
        }
        return path
    }
}

