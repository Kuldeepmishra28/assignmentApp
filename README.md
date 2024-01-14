# assignmentApp
Getting Started

These instructions will get you install this application and running on your local machine.
Prerequisites

NPM / Yarn and Node.js installed

Clone the repository to your local machine.

git clone https://github.com/Kuldeepmishra28/assignmentApp.git

Installing

Installing NPM modules on both client and home directory

Execute these commands from the project directory

npm install

cd client && npm install

Database connection

Create MongoDB Atlas collection and attach MONGO_URL in env file.

For payment gateway

For this application attach braintree sandbox merchant id, public id, private id in env file and connect sandbox account to paypal

JWT Action

Enter JWT secret key in env file 

Running the app

Open a terminal on home directory

node server.js

and open another terminal on client directory

npm run start

Access the web app at http://localhost:3000/

Application is live on given port.

