const canvas = document.getElementById("canvas");
const length_input = document.getElementById("length")
const speed = document.getElementById("speed")
const speed_output = document.getElementById("speed_output")
const algo_select = document.getElementById("algo_select")
const status = document.getElementById("status")
canvas.height = window.innerHeight - 15;
canvas.width = window.innerWidth - 17;
const ctx = canvas.getContext('2d');


const COLORS = {
    "FILL": "white",
    "STROKE": "#888A85",
    "BLOCK": "black",
    "START": "#D90021",
    "GOAL": "#0700D0",

    "PATH": "#F7DD5C",
    "VISITED": "#888A85",
    "SELECTED": "#F57900",
}
/*
const COLORS = {
    "FILL": "white",
    "STROKE": "#888A85",
    "BLOCK": "black",
    "START": "#E63B36",
    "GOAL": "#2B30E3",

    "PATH": "#4A8E62",
    "VISITED": "#E3C02B",
    "SELECTED": "#6B664E",
}
*/

function set_speed() {
    speed_output.value = speed.value + "%"
}

// Function to return speed in ms. mapping 0% to 5ms and 100% to 995ms
function get_speed() {
    let min = 5
    let max = 995
    return (max + min) - (speed.value * (max - min) / 100 + min)
    // Formula above is mine. And below one is Chat GPT's.
    // Linear transformation thing
    // return -9.9 * speed.value + max
}

function update_status(msg) {
    status.value = msg
}

function animate() {
    map.draw_nodes()
    requestAnimationFrame(animate)
}

// return under the cursor
function select_node(x, y) {
    const rect = canvas.getBoundingClientRect();
    x = x - rect.left
    y = y - rect.top
    let node = map.get_node(x, y)
    return node
}

function get_action() {
    return document.querySelector("input[name=action]:checked").value
}

function handle_mouse_move(event) {
    let node = select_node(event.clientX, event.clientY)
    // If node exist then change its color to current selected action
    if (node != null) {
        let action = get_action()
        if (node.color == COLORS["GOAL"]) {
            map.goal = null
        }
        node.color = COLORS[action]
    }
    map.draw_nodes()
}

function handle_mouse_down(event) {
    let node = select_node(event.clientX, event.clientY) // Get node under cursor
    let action = get_action() // Get current action
    if (node != null) {
        if (action == "START") {
             // If start node already exist then change its color to default node color
            if (map.start != null) {
                map.start.color = COLORS["FILL"]
            }
            // Set map start node
            map.start = node
        }
         // If goal node already exist then change its color to default node color
        else if (action == "GOAL") {
            if (map.goal != null) {
                map.goal.color = COLORS["FILL"]
            }
            // Set map goal node
            map.goal = node
        }
        // If node is not going to be selected as start or goal and node is already goal node then remove it from map.goal
        else if (node.color == COLORS["GOAL"]) {
            map.goal = null
        }
        // If node is not going to be selected as start or goal and node is already start node then remove it from map.start
        else if (node.color == COLORS["START"]) {
            map.start = null
        }
        node.color = COLORS[action] // Change color of node under cursor
    }


    if (action == "BLOCK") {
        canvas.addEventListener('mousemove', handle_mouse_move);
    }
    // Fill is used for default color. Which means unblock
    else if (action == "FILL") {
        canvas.addEventListener('mousemove', handle_mouse_move);
    }
    map.draw_nodes()
}


// Clear only path and visited
function clear_map() {
    map.nodes.forEach((row)=> {
        row.forEach((node)=> {
            if (node.color == COLORS["VISITED"] || node.color == COLORS["PATH"] || node.color == COLORS["SELECTED"])
                node.color = COLORS["FILL"]
        })
    })
    map.draw_nodes()
}


function update_map() {
    map.length = parseInt(length_input.value)
    map.start = null
    map.goal = null
    map.calculate_nodes(0, 0) // 0 rows and 0 columns. Function will calculate number of rows and columns based on dimensions of canvas
    map.create_nodes()
    map.draw_nodes()
}

function invert_map() {
    map.nodes.forEach((row)=> {
        row.forEach((node)=> {
            if (node.color == COLORS["FILL"])
                node.color = COLORS["BLOCK"]
            else if (node.color == COLORS["BLOCK"])
                node.color = COLORS["FILL"]
        })
    })
    map.draw_nodes()
}

canvas.addEventListener('mousedown', handle_mouse_down);
canvas.addEventListener('mouseup', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});
canvas.addEventListener('mouseout', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});


var map = new Map(ctx, length_input.value, space=0, rows=0, cols=0, line_width=1, stroke_color=COLORS["STROKE"], default_fill=COLORS["FILL"])
map.create_nodes()
map.draw_nodes()
set_speed()
// animate()


