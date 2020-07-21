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
function promptUser() {
    return inquirer.prompt({
            type: "list",
            message: "What kind of employee would you like to enter?",
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

function renderHtml() {
    fs.writeFileSync(outputPath, render(employees)) 

    console.log("Successfully wrote employee file");
    
}

promptUser();




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