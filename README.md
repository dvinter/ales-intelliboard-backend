# ChatBot Starter

This is a blueprint for chatbot made by Intelliway. It was designed to be cloned to every new project that uses a chatbot and serve as a base to them.

## Code Guidelines
 - Code is written in English
 - Use arrow functions only when creating one-line functions or anonymous functions.
 - Use function syntax when creating functions to be exported on files.
 - Use Object.freeze when exporting multiple functions or objects.
 - Try not to deconstruct objects directly on function parameters
 - Format code with CTRL + SHIFT + F (or equivalent)
 - Use ESLINT + PRETTIER To Format Project
 - Don't use var (only let and const)
 - Promises should be handled with async/await
 - Name variables and functions with camelCase, constants with UPPER_CASE

## Initial configurations
After cloning, you should make some changes on .env file: update project name and bot name, watson env variables and email variables.
Then, just run `npm i` followed by `npm start`, and the bot should be available at [localhost](http://localhost:3000/index-bg.html).
When running on production, remember to set NODE_ENV variable to PROD.

## Important information
### Files and Folder meanings
 - Every variable that may change depending if it's running on production or dev, should be on **.env**. Every other constant variable should be on **constants.js**.
 - Don't declare function on router.js, only use middlewares and controllers directly.

### Folder structure
**index.js** This will have everything needed to start the server
**server.js** Here are all app global configurations
**src/** Here is all code of project
**src/routes.js** Here we put all routes of project
**src/controllers/** In this folder you should put all resolvers to the routes
**src/middlewares/** Here we put all middlewares that go on routes
**src/models/** Here go all mongoose models
**src/services/** Here we should put all functions that connect to external apis or services
**src/templates/** Here are all email templates
**src/utils/** Here are all functions shared by other functions, basically some utility functions
