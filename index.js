console.log('hello');

const inquirer = require('inquirer');
const fs = require('fs');

// let answers = []

async function generateLogo() {
    // Prompt user for input
    const questions = await inquirer.prompt([
        {
            type: 'input',
            name: 'text',
            message: 'Enter the text for the logo within three words:',
            validate: function (input) {
                const words = input.split(/\s+/);
                if (words.length > 3) {
                    return 'Please limit the description to 3 words.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'textColor',
            message: 'What color should the text be? (e.g., #ff0000 or color name):',
        },
        {
            type: 'list',
            message: 'What shape should the logo be?',
            name: 'shape',
            choices: ['circle', 'triangle', 'square']
        },
        {
            type: 'input',
            name: 'shapeColor',
            message: 'What color should the shape be? (e.g., #ff0000 or color name)'
        },

    ]);

    const answers = questions;
    console.log(answers);
    return answers;

}

function createLogo(answers) {
    console.log(answers);
    const { text, textColor, shape, shapeColor } = answers;
    const newLogo = {
        'circle': `<circle cx="50" cy="50" r="40" fill="${shapeColor}" />`,
        'triangle': `<polygon points="50,15 20,80 80,80" fill="${shapeColor}" />`,
        'square': `<rect width="70" height="70" x="15" y="15" fill="${shapeColor}" />`
    };
    return`
    <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
        ${newLogo[shape]}
        <text x="50%" y="90%" style="dominant-baseline: middle; text-anchor: middle; fill: ${textColor}; font-family: Arial" font-size="10">${text}</text>
    </svg>`;
    
}

// Steps the program initializes from start to finish
async function init(){
    // try {
        const answers = await generateLogo();
        const logoContent = createLogo(answers);
        fs.writeFileSync('logo.svg', logoContent);
        console.log('Logo is generated and saved as logo.svg')
    // } catch (error) {
    //     console.error('failed to generate logo: ', error);
    // }

}




// Initializes the program
init();