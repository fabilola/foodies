# TDDD27_2022_project
My project is called foodies and it is a platform where users can create an account and share recipes with other users.
Users can create recipes, add them to their favorites, comment and rate them or share them via email with friends.

## Functional Specification
- Sign in functionality with third party apps Facebook, Google and GitHub
- Create / update / delete a recipe
- Share recipes with other users via email
- Comment and rate recipes
- add favorites to their favorites
- Filter and search recipes

## Technical Specification 
For my project I used the MERN Stack:
- Frontend with React.js and JavaScript
- Backend with Node.js and Express.js 
- MongoDB as database
 
Additionally I used:
- [Docker](https://www.docker.com/) to dockerize the application
- [passport.js](https://www.passportjs.org/) for third party authentication
- MaterialUI for React [MUI](https://mui.com/) for easier component styling and implementation
- [React Dropzone](https://react-dropzone.js.org/) to implement Drag and Drop functionality

## Links to Screencast:
- [Project Screencast](https://www.youtube.com/watch?v=IQOFt9HsWRQ)
- [Individual Screencast](https://youtu.be/T5nWgN34k6s)

## Project Setup:
### Development Mode:
To start the project in development mode:
 
1. Run ``npm install`` in `/backend` folder
2. Create ``.env`` file in `/backend` folder with the following values:
    ```
   CLIENT_ID= Google Client Id for oauth
   CLIENT_SECRET= Google Client Secret for oauth
   CALLBACK_URL= Google Callback URL for oauth
   MONGO_SECRET= secret for mongodb
   MONGO_URL= db url for mongodb
   FOODIES_MAIL= gmail address to send emails from
   FOODIES_PWD= gmail password to send emails from
   FACEBOOK_APP_ID= Facebook App Id for oauth
   FACEBOOK_APP_SECRET= Facebook App Secret for oauth
   GITHUB_CLIENT_ID= GitHub App Id for oauth
   GITHUB_CLIENT_SECRET= GitHub App Secret for oauth
   ```
3. Run ```npm start``` in `/backend` folder
4. Run ``npm install`` in `/frontend` folder
5. Run ```npm start``` in `/frontend` folder

Now the application should be running on  ```localhost:3000``` in the browser 

### Docker:
To start the project in docker:
1. Create ``.env`` file in `/root` folder with the following values:
 ```
   CLIENT_ID= Google Client Id for oauth
   CLIENT_SECRET= Google Client Secret for oauth
   CALLBACK_URL= Google Callback URL for oauth
   MONGO_SECRET= secret for mongodb
   MONGO_URL= db url for mongodb
   FOODIES_MAIL= gmail address to send emails from
   FOODIES_PWD= gmail password to send emails from
   FACEBOOK_APP_ID= Facebook App Id for oauth
   FACEBOOK_APP_SECRET= Facebook App Secret for oauth
   GITHUB_CLIENT_ID= GitHub App Id for oauth
   GITHUB_CLIENT_SECRET= GitHub App Secret for oauth
   ```
2. Run ```docker compuse up``` in `/root` folder

Now the application should be running on  ```localhost:3000``` in the browser 
