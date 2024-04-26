const canvas = document.getElementById("canvas");
const length_input = document.getElementById("length")
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


canvas.addEventListener('mousedown', handle_mouse_down);
canvas.addEventListener('mouseup', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});
canvas.addEventListener('mouseout', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});

function update_map() {
    map.length = parseInt(length_input.value)
    map.calculate_nodes(0, 0)
    map.create_nodes()
    map.draw_nodes()
}
var map = new Map(ctx, length_input.value, space=2, rows=0, cols=0, line_width=1, stroke_color=COLORS["STROKE"], default_fill=COLORS["FILL"])
map.create_nodes()
map.draw_nodes()
// animate()

