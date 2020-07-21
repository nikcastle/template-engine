// * Global variables, required files
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
// * Run prompts for user
function promptUser() {
    return inquirer.prompt({
            type: "list",
            message: "Which kind of employee would you like to enter?",
            name: "type",
            choices: ["Manager", "Engineer", "Intern","I'm done entering employees."]
        })
        .then(function (answers) {
            switch (answers.type) {
                case "Manager":
                    makeManager();
                    break;
                case "Engineer":
                    makeEngineer();
                    break;
                case "Intern":
                    makeIntern();
                    break;
                case "I'm done entering employees.":
                    renderHtml();
                    break;

            }
        })
}

// * Make a Manager Employee 
function makeManager() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the Manager's name?",
            name: "name"
         },
         {
            type: "input",
            message: "What is the Manager's ID?",
            name: "id"
         },
         {
            type: "input",
            message: "What is the Manager's email address?",
            name: "email"
         },
         {
            type: "input",
            message: "What is the Manager's office number?",
            name: "officeNumber"
         },
    ])
    .then(function({name, id, email, officeNumber}){
       
       const manager = new Manager(name, id, email, officeNumber)
       employees.push(manager);

       promptUser();
    })
}

// * Make an Engineer Employee
function makeEngineer() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the Engineer's name?",
            name: "name"
         },
         {
            type: "input",
            message: "What is the Engineer's ID?",
            name: "id"
         },
         {
            type: "input",
            message: "What is the Engineer's email address?",
            name: "email"
         },
         {
            type: "input",
            message: "What is the Engineer's Github username?",
            name: "userName"
         },
    ])
    .then(function({name, id, email, userName}){
       
       const engineer = new Engineer(name, id, email, userName)
       employees.push(engineer);

       promptUser();
    })
}

// * Make an Intern Employee
function makeIntern() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is the Intern's name?",
            name: "name"
         },
         {
            type: "input",
            message: "What is the Intern's ID?",
            name: "id"
         },
         {
            type: "input",
            message: "What is the Intern's email address?",
            name: "email"
         },
         {
            type: "input",
            message: "What is the Intern's school?",
            name: "school"
         },
    ])
    .then(function({name, id, email, school}){
       
       const intern = new Intern(name, id, email, school)
       employees.push(intern);

       promptUser();
    })
}

// * Render the html document
function renderHtml() {
    fs.writeFileSync(outputPath, render(employees)) 

    console.log("Successfully wrote employee file");
    
}

// * Function Call
promptUser();




