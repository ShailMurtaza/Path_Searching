function start() {
    if (map.start && map.goal) {
        DFS(map)
    }
    else {
        console.log("Empty start or goal")
    }
}


// Depth First Search
function DFS(map) {
    var stack = [map.start]
    var interval = setInterval(search, 100)

    function search() {
        // If stack is empty then clear interval
        if (stack.length == 0) {
            clearInterval(interval)
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
                    clearInterval(interval)
                    break
                }

                // If neighbor is unvisited node then add it to stack and change color so it wouldn't be selected again
                if (n_node.color == COLORS["FILL"]) {
                    stack.push(n_node)
                    n_node.color = COLORS["SELECTED"]
                }
            }
        }
    }
}

