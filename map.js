class Node {
    constructor(x, y, color) {
        this.x = x
        this.y = y
        this.color = color
    }
}

class Map {
    constructor(ctx) {
        this.length = 20
        this.space = 5
        this.nodes = Array()
        this.stroke_color = "black"
        this.default_fill = "white"
        this.line_width = 0
        this.rows = 0
        this.cols = 0
        this.ctx = ctx
    }

    create_nodes() {
        this.cols = Math.floor(canvas.width / (this.length+this.space))
        this.rows = Math.floor(canvas.height / (this.length+this.space))
        this.cols = 3
        this.rows = 2
        for (let i=0;i<this.rows;i++) {
            let node_row = Array()
            for (let j=0;j<this.cols;j++) {
                let x = this.space + (this.space + this.length) * j
                let y =  this.space + (this.space + this.length) * i
                let node = new Node(x, y, this.default_fill)
                node_row.push(node)
            }
            this.nodes.push(node_row)
        }
    }

    draw_nodes() {
        this.ctx.strokeStyle = this.stroke_color
        this.ctx.lineWidth = this.line_width
        this.ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i=0;i<this.rows;i++) {
            for (let j=0;j<this.cols;j++) {
                let node = this.nodes[i][j]
                ctx.fillStyle = node.color
                ctx.fillRect(node.x+1, node.y+1, this.length-1, this.length-1)
                if (this.stroke_color != null)
                    ctx.strokeRect(node.x+0.50, node.y+0.50, this.length, this.length)
            }
        }
    }

    get_node(x, y) {
        for (let i=0;i<this.rows;i++) {
            for (let j=0;j<this.cols;j++) {
                let node = this.nodes[i][j]
                if (
                    x >= node.x && x <= node.x + this.length + 3 &&
                    y >= node.y && y <= node.y + this.length + 3) {
                    return {node: node, x: i, y: j}
                }
            }
        }
        return {node: null, x: -1, y: -1}
    }

    get_neighbors(row, col) {
        let neighbors = Array()
        // Upper
        if (row - 1 < this.rows && row - 1 > -1) neighbors.push(this.nodes[row-1][col])
        // Lower
         if (row + 1 < this.rows && row + 1 > -1) neighbors.push(this.nodes[row+1][col])
        // Right
        if (col + 1 < this.cols && col + 1 > -1) neighbors.push(this.nodes[row][col+1])
        // Left
        if (col - 1 < this.cols && col - 1 > -1) neighbors.push(this.nodes[row][col-1])
        return neighbors
    }
}



