const msg_container = document.getElementById("msg_container")

function show_msg(msg) {
    let msg_div = document.createElement("div")
    msg_div.className = "msg"
    msg_div.innerText = msg

    msg_container.appendChild(msg_div)
    setTimeout(()=> {
        msg_div.style.left = "0"
    }, 10)
    
    msg_div.onclick = ()=> {hide_msg(msg_div, 0)}
    hide_msg(msg_div, 3500)
}


function hide_msg(msg_div, time) {
    setTimeout(()=> {
        msg_div.remove()
    }, time)
}

