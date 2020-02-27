const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

let profilePicture;
let email;

inquirer
    .prompt([
        {
            message: "Enter your GitHub username:",
            name: "username"
        },
        {
            message: "Enter the title of your project:",
            name: "projectTitle"
        },
        {
            message: "Enter the a description of your project:",
            name: "projectDescription"
        },
        {
            message: "Enter installation instructions for you project:",
            name: "installationInstructions"
        },
        {
            message: "Enter usage details:",
            name: "usageDetails"
        },
        {
            message: "Enter the license type of your project:",
            name: "licenseDetails"
        },
        {
            message: "Enter contribution instructions for your project:",
            name: "contributionInstructions"
        },
        {
            message: "Enter testing instructions:",
            name: "testInstructions"
        },
        {
            message: "Enter answers to any frequently asked questions:",
            name: "faqs"
        }
    ])
    .then(function({
        username,
        projectTitle,
        projectDescription,
        installationInstructions,
        usageDetails,
        licenseDetails,
        contributionInstructions,
        testInstructions,
        faqs
    }) {
        const queryUrl = `https://api.github.com/users/${username}`;

        axios.get(queryUrl).then(function(res) {
            profilePicture = res.data.avatar_url;
            email = res.data.email;
            console.log(profilePicture);
            console.log(email);

            const readmeString = `# ${projectTitle}

            ${projectDescription}
            
            ## Installation Instructions
            
            ${installationInstructions}
            
            ## Usage
            
            ${usageDetails}
            
            ## License
            
            ${licenseDetails}
            
            ## Contribution
            
            ${contributionInstructions}
            
            ## Testing
            
            ${testInstructions}
            
            ## FAQs
            
            ${faqs}
            
            ## Contact
            
            [${email}](mailto:${email})
            
            ![Profile Picture](${profilePicture} "Profile Picture")`;

            // console.log(readmeString);

            fs.writeFile("README-new.md", readmeString, function(err) {
                if (err) {
                    throw err;
                }

                console.log("README file has been generated.");
            });
        });
    });
