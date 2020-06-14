const Employee = require("./lib/Employee");
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
        message: "What is your name?"
    },
    { 
        type:"input",
        name: "id",
        message: "What is your employee ID number?"
    },
    { 
        type:"input",
        name: "email",
        message: "What is your e-mail address?"
    }, 
    { 
        type:"list",
        name: "employeeType",
        message: "Which employee would you like to add?",
        choices: ['engineer', 'intern', 'none']
    },
]

const internQuestions = [
    { 
        type:"input",
        name: "name",
        message: "What is your name?"
    },
    { 
        type:"input",
        name: "id",
        message: "What is your employee ID number?"
    },
    { 
        type:"input",
        name: "email",
        message: "What is your e-mail address?"
    },
    { 
        type:"input",
        name: "name",
        message: "What school are you currently attending?"
    },
];

const engineerQuestions = [
    { 
        type:"input",
        name: "name",
        message: "What is your name?"
    },
    { 
        type:"input",
        name: "id",
        message: "What is your employee ID number?"
    },
    { 
        type:"input",
        name: "email",
        message: "What is your e-mail address?"
    },
    { 
        type:"input",
        name: "githubUsername",
        message: "What is your github username?"
    },
];

inquirer.prompt(introQuestions).then(function(employeeResponse){
    
    if (employeeResponse.employeeType === 'engineer') {
        inquirer.prompt(engineerQuestions).then(function(engineerResponse){
            console.log(engineerResponse);
            let test = new Engineer(engineerResponse);
            totalEmployees.push(test);
        })
    } else if (employeeResponse.employeeType === 'intern') {
        inquirer.prompt(internQuestions).then(function(internResponse){
            console.log(internResponse);
            totalEmployees.push(internResponse);
        })
    } else {
        totalEmployees.push(employeeResponse);
        return;
    }
    render(totalEmployees);
})


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```





// PSEUDOCODE - README
// BUILD APP THAT WILL RUN AS NODE CLI THAT TAKES IN (GATHER) INFORMATION ABOUT EMPLOYEES AND GENERATE A HTML WEBPAGE THAT DIPLAYS SUMMARIES FOR EACH PERSON
        // BUILD SE TEAM GENERATOR CLI APP
            // PROMPT USER FOR INFO ABOUT TEAM MANAGER AND ANY INFO ON TEAM MEMBERS
            // CAN IMPUT ANY NUMBER OF TEAM MEMBERS
            // MIX OF ENGINEERS AND INTERNS
            // WHEN DONE BUILDING - APP WILL CREATE HTML FILE THAT DISPLAYS NICELY FORMATTED ROSTER BASED ON INFO PROVIDED BY USER
        // GENERATE WEBPAGE THAT DISPLAY TEAM'S BASIC INFO TO HAVE QUICK ACCESS TO THEIR CONTACT INFO
        // MAKE TESTS PASS

// USE INQUIRER - ASK USER FOR EMAIL, ID. AND OTHER INFO PERTAINING TO ROLE IN COMPANY
    // INTERN - SCHOOL
    // ENGINEER - GITHUB USERNAME
// RUN NPM INSTALL
    // DEPENDENCIES - JEST, INQUIRER

// WORKFLOW
    // RUN TEST - USE "NPM RUN TEST"
    // CREATE/UPDATE CLASSES TO PASS TEST CASE
    // REPEAT

// DIRECTORY STRUCTURE?? - MORE RESEARCH

// HINTS
    // CREATE MANY HTML TEMPLATES FOR EACH TYPE OF USER (MAIN/ENGINEER/INTERN/MANAGER)
        // ADD PLACEHOLDER CHARACTER THAT HELPS PROGRAM ID WHERE DYNAMIC MARKUP BEGINS AND ENDS
    // MAKE METHODS AS SIMPLE AS POSSIBLE
    // DIFF EMPLOYEES SHOULD INHERIT SOME METHODS AND PROPERTIES FROM BASE CLASS OF 'EMPLOYEE.'

// FINISHING PRODUCT - FUNCTIONAL APP, GITHUB REPO WITH README, USER GENERATING HTML WITH INFO ON TEAM, PASS TESTS
    // HAVE CLASS "EMPLOYEE". "MANAGER", "ENGINEER", "INTERN"
        // EMPLOYEE - PARENT CLASS
            // NAME
            // ID
            // EMAIL
            // GETNAME()
            // GETID ()
            // GET EMAIL ()
            // GETROLE() - RETURNS 'EMPLOYEE'
        // MANAGER - SAME AS 'EMPLOYEE' PLUS MORE
            // OFFICENUMBER
            // GETROLE() - OVERRIDEN TO RETURN 'MANAGER'
        // ENGINEER - SAME AS 'EMPLOYEE' PLUS MORE
            // GITHUB USERNAME
            // GETGITHUB()
            // GETROLE() - OVERRIDEN TO RETURN 'ENGINEER'
        // INTERN - SAME AS 'EMPLOYEE' PLUS MORE
            // SCHOOL
            // GETSCHOOL()
            // GETROLE() - OVERRIDEN TO RETURN 'INTERN'
    // PROMPT USER TO BUILD ENGINEERING TEAM - MANAGER, AND ANY # ENGINEERS AND INTERNS
    // GENERATE HTML PAGE IN 'OUTPUT DIRECTORY' AND IS NICELY FORMATTED TEAM ROSTER
        // DISPLAY NAME, ROLE, ID, ROLE-SPECIFIC PROPERTY

// BONUS
    // DATA VALIDATION
    // ADDING APP TO PORTFOLIO

// SUBMISSION
    // URL OF GITHUB REPO
    // VIDEO OF FUNCTIONALITY


// PSEUDOCODE APPLICATION
// NODE FILENAME ON TERMINAL
// INQUIRER QUESTIONS - FOR LOOP
        // ASK FOR ENPLOYEE INFO
            // IF USER INPUTS MANAGER
                // MANAGER SUBCLASS QUESTIONS WILL APPEAR
                    // ANSWER QUESTIONS
                    // RETURN TO EMPLOYEE TO ADD MORE 
            // IF USER INPUTS ENGINEER
                // ENGINEER SUBCLASS QUESTIONS WILL APPEAR
                    // ANSWER QUSTIONS
                    // RETURN TO EMPLOYEE TO ADD MORE
            // IF USER INPUTS INTERN
                // INTERN SUBCLASS QUESTIONS WILL APPEAR
                    // ANSWER QUSTIONS
                    // RETURN TO EMPLOYEE TO ADD MORE 
            // IF THERE ARE NO MORE EMPLOYEES TO ENTER
                // USE GETROLE() TO FINISH
        // CREATE HTML FILE WITH FORMATTED TEAM ROSTER
// INFORMATION FROM INQUIRER USED TO GENERATE INDEX FILE
    // USE WRITEFILE FUNCTION FOR ONE INDEX FILE