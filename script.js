// Adam Koziorz
// Etch-a-Sketch Project
// JavaScript Component

const body = document.querySelector('body');
const grid = document.querySelector('.grid');
const dimButton = document.querySelector('#dim-button');
const modeButton = document.querySelector('#mode-button');
const clearButton = document.querySelector('#clear-button');
const dimensionInfo = document.querySelector('#dimension-info');
const modeInfo = document.querySelector('#mode-info');
const DEFAULT_SIZE = 16;
const MAX_SIZE = 32;
const MIN_SIZE = 1;
let size = DEFAULT_SIZE;    // Bad style but "good enough" for the purpose
let dragged = false;        //   of this program which is to practice DOM manipulation
let mode = "DRAW";          // Enums would likely be better for this too


// We should only draw if the mouse is over the pixel and the mouse
// is being dragged (including clicks)
function editPixel(e) {
    if (e.type === 'mouseover' && !dragged) { return; }
    e.target.classList.toggle('draw', mode === "DRAW");
}


// Switch modes (drawing vs erasing)
function switchMode() {
    if (mode === "DRAW") {
        mode = "ERASE";
        modeInfo.textContent = "Mode: Erasing 🗑";
    } else {
        mode = "DRAW";
        modeInfo.textContent = "Mode: Drawing 🖌";
    }
}


// Clears the board and redraws the board with the current dimensions
// We also change the mode to drawing
function clearBoard() {
    grid.innerHTML = "";
    generateBoard(size);
    mode = "DRAW";
    modeInfo.textContent = "Mode: Drawing 🖌";
}


// Generates an empty board for the user
function generateBoard(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', editPixel);
        pixel.addEventListener('mousedown', editPixel);
        grid.appendChild(pixel);
    }
}


// Asks the user for new dimensions of the board and changes the board accordingly
// Input number must be an integer between MIN_SIZE and MAX_SIZE
function changeDimensions() {
    let newSize = prompt(`Input the new dimensions of the grid (${MIN_SIZE}-${MAX_SIZE})`);
    if (newSize.length == 0) { return; }
    if (isNaN(newSize) || newSize.indexOf('.') != -1) {
        alert("Input must be an integer!");
    } else if (+newSize < MIN_SIZE || +newSize > MAX_SIZE) {
        alert(`Only integers between ${MIN_SIZE} and ${MAX_SIZE} are supported!`);
    } else {
        size = +newSize;
        clearBoard();
        dimensionInfo.textContent = `Dimensions: ${size}x${size}`;
    }
}


// Ask the user for new dimensions if this button is clicked
dimButton.addEventListener('click', changeDimensions);

// Switch modes if this button is clicked
modeButton.addEventListener('click', switchMode);

// Clear the board if this button is clicked
clearButton.addEventListener('click', clearBoard);

// Determine whether the is dragging the mouse
body.addEventListener('mousedown', () => { dragged = true; });
body.addEventListener('mouseup', () => { dragged = false; });

// "Entry Point" - draw the board for the user upon startup
generateBoard(size);
