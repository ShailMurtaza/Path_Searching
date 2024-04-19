const canvas = document.getElementById("canvas");
const length_input = document.getElementById("length")
canvas.height = window.innerHeight - 15;
canvas.width = window.innerWidth - 17;
const ctx = canvas.getContext('2d');
var map = new Map(ctx, length_input.value)

function animate() {
    map.draw_nodes()
    requestAnimationFrame(animate)
}

function select_node(x, y) {
    const rect = canvas.getBoundingClientRect();
    x = x - rect.left
    y = y - rect.top
    let node = map.get_node(x, y)
    if (node.node != null) {
        node.node.color = "red"
    }
}


function handle_mouse_move(event) {
    select_node(event.clientX, event.clientY)
}

function handle_mouse_down(event) {
    select_node(event.clientX, event.clientY)
    canvas.addEventListener('mousemove', handle_mouse_move);
}

canvas.addEventListener('mousedown', handle_mouse_down);
canvas.addEventListener('mouseup', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});
canvas.addEventListener('mouseout', ()=>{canvas.removeEventListener('mousemove', handle_mouse_move)});

map.create_nodes()
animate()
