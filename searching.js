const algo = {
    0: DFS,
    1: BFS,
}

function start() {
    if (map.start && map.goal) {
        algo[algo_select.value](map)
    }
    else {
        console.log("Empty start or goal")
    }
}

function display_path(map, parent, selected) {
    var path = []
    var n = parent[map.goal.value]

    // Create path array
    while (n != null) { // n can also be 0. check for null
        path.push(n)
        n = parent[n]
    }

    // Change color of all selected nodes to visited for clear picture of map
    while(selected.length) {
        let node = selected.pop()
        node.color = COLORS["VISITED"]
    }
    for (let i=0;i<path.length-1;i++) {
        let row = Math.floor((path[i]) / map.cols) // Get row index using value of node
        let col = Math.floor((path[i]) % map.cols) // Get col index using value of node
        let node = map.nodes[row][col] // Get node using index values
        node.color = COLORS["PATH"] // Set color of path
    }
    map.draw_nodes()
}

// Depth First Search
function DFS(map) {
    var stack = [map.start]
    var parent = {}
    parent[map.start.value] = null // Set parent of start node as null
    var interval = setInterval(search, get_speed())

    function search() {
        // If stack is empty then clear interval
        if (stack.length == 0) {
            clearInterval(interval)
            display_path(map, parent, stack)
            return
        }
        else {
            let node = stack.pop() // Pop last element from stack
            // Do not change color if node is start node
            if (node.color != COLORS["START"])
                node.color = COLORS["VISITED"]

            // Get neighbors of node
            let neighbors = map.get_neighbors(node.i, node.j)
            for (let i=0;i<neighbors.length;i++) {
                let n_node = neighbors[i]
                // If neighbor is goal then clearInterval and break loop
                if (n_node.color == COLORS["GOAL"]) {
                    parent[n_node.value] = node.value
                    clearInterval(interval)
                    display_path(map, parent, stack)
                    return
                }

                // If neighbor is unvisited node then add it to stack and change color so it wouldn't be selected again
                if (n_node.color == COLORS["FILL"]) {
                    parent[n_node.value] = node.value
                    stack.push(n_node)
                    n_node.color = COLORS["SELECTED"]
                }
            }
        }
        map.draw_nodes()
    }
}

// Breadth First Search
function BFS(map) {
    var queue = [map.start]
    var parent = {}
    parent[map.start.value] = null // Set parent of start node as null
    var interval = setInterval(search, get_speed())

    function search() {
        // If queue is empty then clear interval
        if (queue.length == 0) {
            clearInterval(interval)
            display_path(map, parent, queue)
            return
        }
        else {
            let node = queue.shift() // Pop 1st element from queue
            // Do not change color if node is start node
            if (node.color != COLORS["START"])
                node.color = COLORS["VISITED"]

            // Get neighbors of node
            let neighbors = map.get_neighbors(node.i, node.j)
            for (let i=0;i<neighbors.length;i++) {
                let n_node = neighbors[i]
                // If neighbor is goal then clearInterval and break loop
                if (n_node.color == COLORS["GOAL"]) {
                    parent[n_node.value] = node.value
                    clearInterval(interval)
                    display_path(map, parent, queue)
                    return
                }

                // If neighbor is unvisited node then add it to queue and change color so it wouldn't be selected again
                if (n_node.color == COLORS["FILL"]) {
                    parent[n_node.value] = node.value
                    queue.push(n_node)
                    n_node.color = COLORS["SELECTED"]
                }
            }
        }
        map.draw_nodes()
    }
}

