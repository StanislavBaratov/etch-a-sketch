const PIXEL_SIZE = '20px';
let currentColor = null;
const COLORS = ['#ff0000', '#ffff00', '#ffffff', '#000000', '#ff00ff', '#00ff00', '#00ffff', '#0000ff']

const clearWorkspace = function() {
    const workspace = document.querySelectorAll('main div');
    workspace.forEach((item) => item.remove());
}

const deactivateDraw = function(MouseEvent) {
    const canvas = document.querySelector('#canvas');
    canvas.childNodes.forEach((child) => {
        child.childNodes.forEach((pixel) => pixel.removeEventListener('mouseenter', draw))
    });
}

const draw = function(event) {
    event.stopPropagation();
    
    const pixel = event.target;
    const test = pixel.id;

    pixel.style.backgroundColor = currentColor.style.backgroundColor;
}


const activateDraw = function(MouseEvent) {
    console.log('Activated drawing');
    const canvas = document.querySelector('#canvas');
    canvas.childNodes.forEach((child) => {
        child.childNodes.forEach((pixel) => pixel.addEventListener('mouseenter', draw));
    });
}

const createPixel = function() {
    const pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    pixel.style.height = PIXEL_SIZE;
    pixel.style.width = PIXEL_SIZE;
    
    return pixel;

}

const createCanvasRow = function(width) {
    const row = document.createElement('div');
    row.setAttribute('id', 3);
        for (let i = 0; i < width; i++) {
            row.appendChild(createPixel(i));
        }
    
    return row;
}

const createCanvas = function(width, height) {
    const canvas = document.createElement('div');
    canvas.setAttribute('id', 'canvas');

    for (let i = 0; i < height; i++) {
        canvas.appendChild(createCanvasRow(width));
    }

    canvas.addEventListener('mousedown', activateDraw);
    canvas.addEventListener('mouseup', deactivateDraw);

    return canvas;
}

const createNewImage = function() {
    clearWorkspace();
    
    const workspace = document.querySelector('main');
    workspace.appendChild(createCanvas(16, 16));
}

const createWelcomeText = function() {
    const welcomeText = document.createElement('div');
    welcomeText.textContent = `Welcome to Etch-a-sketch app! 
    Press the button below to create a 16x16 image`;
    
    return welcomeText;

}

const createCreateButton = function() {
    const createButton = document.createElement('button');
    createButton.setAttribute('id', 'create-button');
    createButton.setAttribute('type', 'button');
    createButton.textContent = 'Create image';
    createButton.addEventListener('click', createNewImage);

    return createButton;
}

const initWorkspace = function() {
    const startBlock = document.createElement('div');
    startBlock.setAttribute('id', 'start');
    startBlock.append(createWelcomeText(), createCreateButton());

    const main = document.querySelector('main');
    main.appendChild(startBlock);
}

const activateColor = function(color) {
    color.setAttribute('id', 'selected-color');
    currentColor = color;
}

const deactivateColor = function(color) {
    color.removeAttribute('id');
}

const selectColor = function(event) {
    deactivateColor(currentColor);
    activateColor(event.target);
}

const createColorButton = function(color) {
    const button = document.createElement('div');
    button.setAttribute('class', 'palette-item');
    button.style.backgroundColor = color;
    button.addEventListener('click', selectColor);
    
    return button;
}

const addColorToPalette = function(palette, color) {
    palette.appendChild(createColorButton(color));
}

const initColorPalette = function() {
    const palette = document.querySelector('aside');
    COLORS.forEach((color) => addColorToPalette(palette, color));
    currentColor = document.querySelector('aside div');
    activateColor(currentColor);
}

const cleanImage = function(event) {
    const canvas = document.querySelector('#canvas');
    if (canvas) {
        canvas.childNodes.forEach((row) => {
            row.childNodes.forEach((pixel) => {
                pixel.style.backgroundColor = '#fff';
            })
        });
    }
}

const createToolbarButton = function(name, action) {
    const button = document.createElement('button');
    button.setAttribute('type', 'button');
    button.setAttribute('class', 'toolbar-button');
    button.textContent = name;
    button.addEventListener('click', action);
    
    return button;
}

const initToolbar = function() {
    const toolbar = document.querySelector('.toolbar');
    toolbar.appendChild(createToolbarButton('Clean image', cleanImage));
}

initWorkspace();
initColorPalette();
initToolbar();