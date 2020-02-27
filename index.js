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
            // console.log(profilePicture);
            // console.log(email);

            const readmeString = `# ${projectTitle}

            
![Downloads badge](https://img.shields.io/static/v1?label=Downloads&message=1,000,000&color=blue "Downloads Badge")

${projectDescription}

## Table of Contents
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Test](#Test)
- [Questions](#FAQs)
            
## Installation

${installationInstructions}

## Usage

${usageDetails}

## License

${licenseDetails}

## Contributing

${contributionInstructions}

## Test

${testInstructions}

## FAQs

${faqs}

## Contact

[${email}](mailto:${email})

![Profile Picture](${profilePicture} "Profile Picture")`;

            fs.writeFile("README-new.md", readmeString, function(err) {
                if (err) {
                    throw err;
                }

                console.log("README file has been generated.");
            });
        });
    });
