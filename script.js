console.log('Hello');

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