# Assignment 1: Web Application - Nookazon

A simple product page and checkout calculator. 

Nookazon is your #1 go-to place to purchase your very own Tom Nook.

## Usage

Deployed application is here:

**If products do not appear on screen, *please* reload the website several times. The backend deployed on Heroku needs time to "start", and since the web application 
pulls data from backend and renders it dynamically, it needs time to start up.**

https://a1-nookazon-frontend.herokuapp.com/

## Installation

To run backend:

```bash
npm install
nodemon start
```

To test backend (using Mocha and Chai):

```bash
npm test
```

To run frontend:

```bash
npm install
npm run dev
```

To test frontend:

```bash
npm run test
```

## CI/CD **(Please read)**

CI/CD now meets with this error due to Github Classroom quota being met:

```
  The job was not started because the spending limit for Actions and Packages has been exceeded.
```

Github Actions will activate when a push is detected to the master branch, for both frontend and backend simultaneously.

The project is currently manually deployed through Heroku.

Here is proof that CI/CD with automated testing was working:

Frontend:
https://github.com/csc301-fall-2020/assignment-1-15-rajvirana-yichenesia-web/actions/runs/284805194

Backend:
https://github.com/csc301-fall-2020/assignment-1-15-rajvirana-yichenesia-web/actions/runs/284925689

## License
[MIT](https://choosealicense.com/licenses/mit/)
