Step-by-Step Instructions
Clone the Repository

Install the project dependencies using npm:

    npm install

To start the development server, run:

    npm start

    This will start a local development server on http://localhost:8080/.

Building the Project

    To build the project for production, run: npm run build

    This will create a dist directory containing the production build of the project.

Deploying the Project

    To deploy the project to GitHub Pages using the production branch, follow these steps:

    Create a file named deploy.sh in the root of your project with the following content:

    #!/bin/bash

Build the project
    npm run build

Force push to the production branch
git push -f git@github.com:YOUR_USERNAME/portfolio.git master:production

    npm run deploy

Additional Notes
Make sure to replace YOUR_USERNAME with your actual GitHub username in the deploy.sh script and the clone command.
Ensure that your GitHub repository settings for GitHub Pages are set to deploy from the production branch.