# Note App

Note App is a web application designed for efficient creation, editing, and deletion of notes. It enables users to take quick notes and access them from anywhere. Notes are automatically saved in the user's personal profile, providing a personalized and secure user experience.

# Features
- Quick note creation.
- Easy editing and deletion.
- Secure storage in the user's profile.
# Usage
- Sign up or log in to your profile.
- Create new notes or edit existing ones.
- Access your notes from any device.

# Technologies Used
Note App leverages the following technologies:

## Frontend:
- HTML5
- CSS3
- JavaScript
## Backend:
- Node.js
## Web Framework:
- EJS (Embedded JavaScript) for templating
## Server-Side API:
- Appwrite
## Search Engine:
- Meilisearch
## Containerization:
- Docker
## Version Control:
- Git

## Local Deployment Instructions for Note App
Note App is designed for local deployment, and you can access it at "http://localhost:3000/".
Please follow the steps below to set up and run Note App locally:

## Prerequisites:

- Node.js:
Ensure that Node.js is installed on your machine. If not, you can download it here.
Node Package Manager (npm):
npm is typically included with Node.js.
However, you may want to ensure it is up to date by running npm install npm -g.

## Dependencies:

Run npm install to install the necessary dependencies.
- Meilisearch:
- Nodemon:
(Install Nodemon globally by running npm install -g nodemon.)
- Appwrite:
   Acces to this profile on Appwrite using the following credentials:
   - Mail: admin@admin.com
   - Password: admin2024

## Running Note App Locally:

´´´
Run the application using nodemon app.js: npm run start.
´´´

## Access Note App:
Open your web browser and go to "http://localhost:3000/".
Appwrite ORM:
Access Appwrite Dashboard:
Visit "http://localhost/console" to access the Appwrite Dashboard.

## Login:
   Use the following credentials to log in:
   - Mail: admin@admin.com
   - Password: admin2024
## View Users:
Within the Appwrite dashboard, navigate to the Users section to view all created users.

## Example Entry:
- Mail: Jul@mail.com
- Password: 12345678
Note: Ensure that you have Meilisearch, Appwrite, and Note App running simultaneously for a seamless experience.
