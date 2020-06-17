const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let totalEmployees = [];

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

async function runQuestions () {
    // manager inputs answers
    const introAnswers =  await inquirer.prompt(introQuestions)
    totalEmployees.push(new Manager (
        introAnswers.name,
        introAnswers.id,
        introAnswers.email,
        introAnswers.officeNumber,
    ));

    let confirmAddition = true;
    while(confirmAddition) {
        confirmAddition = await inquirer.prompt(
            { 
                type:"confirm",
                name: "confirm",
                message: "Do you want to add another employee?",
            }
        );

        if (!confirmAddition.confirm) {
            break;
        }

        const addOneEmployee = await inquirer.prompt(
            { 
                type:"list",
                name: "employeeType",
                message: "What employee do you want to add?",
                choices: ['engineer', 'intern']
            }
        )

        if (addOneEmployee.employeeType === 'engineer') {
            const engineerNewb = await inquirer.prompt(engineerQuestions);
            totalEmployees.push(new Engineer (
                engineerNewb.name,
                engineerNewb.id,
                engineerNewb.email,
                engineerNewb.githubUsername
            ));
        }

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

    render(totalEmployees);
    fs.writeFile(outputPath, render(totalEmployees), console.log);
}

runQuestions();