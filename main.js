const grid = document.querySelector(".grid")

let mouseDown = false
window.onmousedown = () => {mouseDown = true};
window.onmouseup = () => {mouseDown = false};

let fadeEnabled = false
let eraserEnabled = false

let eraserBtn = document.querySelector("#eraserbtn")
eraserBtn.onclick = function(){
    if (eraserEnabled) {
        eraserEnabled = false
        eraserBtn.textContent = "Enable Eraser"
    }else{
        eraserEnabled = true
        eraserBtn.textContent = "Disable Eraser"
    }
}
let fadeBtn = document.querySelector("#fadebtn")
fadeBtn.onclick = function(){
    if (fadeEnabled) {
        fadeEnabled = false
        fadeBtn.textContent = "Enable Fade"
    }else{
        fadeEnabled = true
        fadeBtn.textContent = "Disable Fade"
    }
}


let mouseOver = function(cell) {
    if (!mouseDown) { return }
    cell = cell.srcElement

    if (!eraserEnabled && !fadeEnabled) {
        cell.style.backgroundColor = "#000000"
    }else if (eraserEnabled) {
        cell.classList.remove("faded")
        cell.style.backgroundColor = "#ffffff"
    }else if (fadeEnabled) {
        let bg = cell.style.backgroundColor
        let last = bg.split(" "); last = last[1]; last = last.slice(0,-1)
        if (!cell.classList.contains("faded")){
            cell.classList.add("faded")
            cell.style.backgroundColor = "rgb(230, 230, 230)"
            return
        }
        if (bg != "rgb(0, 0, 0)") {
            last = String( Math.round(Number(last) - 25.5) )
            cell.style.backgroundColor = `rgb(${last}, ${last}, ${last})`
        }
    }
}

let generateGrid = function(size){
    grid.replaceChildren()
    for (let i = 0; i< size*size; i++) {
        let newDiv = document.createElement("div")
        
        let elementHeight = grid.clientHeight;
        let elementWidth = grid.clientWidth;
    
        let computedStyle = getComputedStyle(grid);
        elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
    
        newDiv.style.width = String(elementWidth / size)+"px"
        newDiv.style.height = String(elementHeight / size)+"px"
        newDiv.style.backgroundColor = "#ffffff"
    
        grid.append(newDiv)
    
        newDiv.onmouseover = mouseOver
    }
}
generateGrid(16)

let slider = document.querySelector("#gridsizerange")
let sliderLabel = document.querySelector("#rangelabel")
slider.oninput = function() {
    let val = String(slider.value)
    sliderLabel.textContent = `Grid Size: ${val}x${val}`
}
slider.onchange = function() {
    let val = slider.value
    generateGrid(val)
}

let clearbtn = document.querySelector("#clearbtn")
clearbtn.onclick = () => {generateGrid(slider.value)}