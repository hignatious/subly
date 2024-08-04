# Subly tech test
This is a React application that recreates the medium cards specified in the Subly technical test.

## Getting Started
Firstly create a .env file and create the required environment variables. An example .env file can be found in the root of the directory.

 * Install Node.js and NPM https://nodejs.org/en/download

Then run the following commands
```
npm install
npm start
```

This should start the development server and open a browser window showing the application.

## Deployed version:
You can find a deployed version of this application here: http://subly-tech-test.s3-website-eu-west-1.amazonaws.com/

## Deploying to AWS via Terraform yourself (optional)
in the `/infrastructure` directory you should find a handful of terraform files and a shell script which can be used to deploy the application

 * Set up the AWS CLI
https://docs.aws.amazon.com/cli/latest/userguide/getting-started-quickstart.html
 * Install Terraform
https://developer.hashicorp.com/terraform/install

To deploy the application run the following commands:
```
npm run build
cd infrastructure
terraform init
terraform plan
terraform apply
./deploy.sh
```

## Decisions Made

Components were broken out as it became apparent that they could be reused, there are probably some things that could have been components but I didn't think it was worth breaking everything out for its own sake.

I chose to use Tailwind for this as I find it convenient for rapid prototyping and have used it in the past, some people don't like it and there are better options for maintaining consistent styles across a large application.

There are other comments in the code

I'm afraid I forgot to commit along the way

## Credits

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Alert icons created by [Pixel Buddha](https://www.flaticon.com/free-icons/alert) - Flaticon
