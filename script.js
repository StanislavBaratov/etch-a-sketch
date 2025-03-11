const PIXEL_SIZE = '20px';

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

    pixel.style.backgroundColor = '#000';
    console.log(`Перекрасили ${pixel.id}`);
}


const activateDraw = function(MouseEvent) {
    console.log('Activated drawing');
    const canvas = document.querySelector('#canvas');
    canvas.childNodes.forEach((child) => {
        child.childNodes.forEach((pixel) => pixel.addEventListener('mouseenter', draw))
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

initWorkspace();