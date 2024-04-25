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
    // map.start.color = COLORS["VISITED"]
    var interval = setInterval(search, 100)

    function search() {
        if (stack.length == 0) {
            clearInterval(interval)
        }
        else {
            let node = stack.pop()
            node.color = COLORS["VISITED"]
            let neighbors = map.get_neighbors(node.i, node.j)
            for (let i=0;i<neighbors.length;i++) {
                let node = neighbors[i]
                if (node.color == COLORS["FILL"]) {
                    stack.push(node)
                    node.color = COLORS["SELECTED"]
                }
            }
        }
    }
}

