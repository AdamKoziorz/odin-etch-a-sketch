const grid = document.querySelector('.grid');
const sizeButton = document.querySelector('#size-button')
const DEFAULT_SIZE = 16;

function generateBoard(size) {
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
    for (let i = 0; i < size * size; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mouseover', () => {
            pixel.classList.add('hovered');
        })
        grid.appendChild(pixel);
    }
}

sizeButton.addEventListener('click', () => {
    let newSize = prompt("Input the new dimensions of the grid");
    newSize = parseInt(newSize);
    if (!Number.isInteger(newSize) || newSize < 1 || newSize > 100) {
        alert("Input must be an integer between 1 and 100!");
    } else {
        grid.innerHTML = "";
        generateBoard(newSize);
    }
})

generateBoard(DEFAULT_SIZE);