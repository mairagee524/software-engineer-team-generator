// Requiring classses from different JS files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// Requiring external node package
const inquirer = require("inquirer");

//Requiring built-in node packages
const path = require("path");
const fs = require("fs");

// Declaring const's for path to generate HTML
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Declare const to use JS file to style page
const render = require("./lib/htmlRenderer");

// Array of employees as JSON objects
let totalEmployees = [];

// Intro ?'s for when manager initiates application
const introQuestions = [
    { 
        type:"input",
        name: "name",
        message: "What is your name?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid name.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "id",
        message: "What is your employee ID number?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "email",
        message: "What is your e-mail address?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid email address.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "officeNumber",
        message: "What is your office number?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid number.';
            }
            return true;
        }
    },
]

// Questions about intern if manager picks intern
const internQuestions = [
    { 
        type:"input",
        name: "name",
        message: "What is your name?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "id",
        message: "What is your employee ID number?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "email",
        message: "What is your e-mail address?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "school",
        message: "What school are you currently attending?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    }
];

// Questions about engineer if manager picks intern
const engineerQuestions = [
    { 
        type:"input",
        name: "name",
        message: "What is your name?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "id",
        message: "What is your employee ID number?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "email",
        message: "What is your e-mail address?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    },
    { 
        type:"input",
        name: "githubUsername",
        message: "What is your github username?",
        validate: function (response) {
            if (response.length < 1) {
              return 'Please enter a valid ID number.';
            }
            return true;
        }
    }
];

// Function 
async function runQuestions () {

    // manager inputs answers
    const introAnswers =  await inquirer.prompt(introQuestions);

    // push new JSON manager object to array
    totalEmployees.push(new Manager (
        introAnswers.name,
        introAnswers.id,
        introAnswers.email,
        introAnswers.officeNumber,
    ));

    // declare let variable
    let confirmAddition = true;

    // loop will run as long as manager clicks "yes" to input another employee
    while(confirmAddition) {
        confirmAddition = await inquirer.prompt(
            { 
                type:"confirm",
                name: "confirm",
                message: "Do you want to add another employee?",
            }
        );
        
        // if user clicks "no", loop will end
        if (!confirmAddition.confirm) {
            break;
        }

        // once user clics "yes", the next question appearsn
        const addOneEmployee = await inquirer.prompt(
            { 
                type:"list",
                name: "employeeType",
                message: "What employee do you want to add?",
                choices: ['engineer', 'intern']
            }
        )

        // if user selects another engineer...
        if (addOneEmployee.employeeType === 'engineer') {
            const engineerNewb = await inquirer.prompt(engineerQuestions);
            totalEmployees.push(new Engineer (
                engineerNewb.name,
                engineerNewb.id,
                engineerNewb.email,
                engineerNewb.githubUsername
            ));
        }

        // if user selects another intern...
        if (addOneEmployee.employeeType === 'intern') {
            const internNewb = await inquirer.prompt(internQuestions);
            totalEmployees.push(new Intern (
                internNewb.name,
                internNewb.id,
                internNewb.email,
                internNewb.school
            ))
        }
    }

    // invoke render()
    render(totalEmployees);

    // write to file
    fs.writeFile(outputPath, render(totalEmployees), console.log);
}

runQuestions();