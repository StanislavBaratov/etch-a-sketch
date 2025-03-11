const PIXEL_SIZE = '20px';

const clearWorkspace = function() {
    const workspace = document.querySelectorAll('main div');
    workspace.forEach((item) => item.remove());
}

const createPixel = function(x, y) {
    const pixel = document.createElement('div');
    pixel.setAttribute('class', 'pixel');
    pixel.setAttribute('id', `${x}_${y}`);
    pixel.style.height = PIXEL_SIZE;
    pixel.style.width = PIXEL_SIZE;
    
    return pixel;

}

const createCanvas = function(width, height) {
    const canvas = document.createElement('div');
    canvas.setAttribute('id', 'canvas');

    for (let i = 0; i < height; i++) {
        const row = document.createElement('div');
        for (let j = 0; j < width; j++) {
            row.appendChild(createPixel(j, i));
        }
        canvas.appendChild(row);
    }

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