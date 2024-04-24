const canvas = document.getElementById("canvas");
const length_input = document.getElementById("length")
canvas.height = window.innerHeight - 15;
canvas.width = window.innerWidth - 17;
const ctx = canvas.getContext('2d');


const COLORS = {
    "FILL": "white",
    "STROKE": "black",
    "BLOCK": "black",
    "START": "#D90021",
    "GOAL": "#316400",

    "PATH": "#EF2929",
    "VISITED": "#E9B96E",
    "SELECTED": "#008E8E",
}

function animate() {
    map.draw_nodes()
    requestAnimationFrame(animate)
}

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
    let action = get_action()
    if (node != null) {
        node.color = COLORS[action]
    }
}

function handle_mouse_down(event) {
    let node = select_node(event.clientX, event.clientY)
    let action = get_action()
    if (node != null) {
        node.color = COLORS[action]
        if (action == "START") {
            if (map.start != null) {
                map.start.color = COLORS["FILL"]
            }
            map.start = node
        }
        else if (action == "GOAL") {
            if (map.goal != null) {
                map.goal.color = COLORS["FILL"]
            }
            map.goal = node
        }
    }
    if (action == "BLOCK") {
        canvas.addEventListener('mousemove', handle_mouse_move);
    }
    // Fill is used for default color. Which means unblock
    else if (action == "FILL") {
        canvas.addEventListener('mousemove', handle_mouse_move);
    }
}

canvas.addEventListener('mousedown', handle_mouse_down);
canvas.addEventListener('mouseup', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});
canvas.addEventListener('mouseout', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});

var map = new Map(ctx, length_input.value, space=5, rows=3, cols=4, line_width=1, stroke_color=COLORS["STROKE"], default_fill=COLORS["FILL"])
map.create_nodes()
animate()

