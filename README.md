# Full Stack Developer Challenge
This is an interview challengs. Please feel free to fork. Pull Requests will be ignored.

## Requirements
Design a web application that allows employees to submit feedback toward each other's performance review.

*Partial solutions are acceptable.*  It is not necessary to submit a complete solution that implements every requirement.

### Admin view
* Add/remove/update/view employees
* Add/update/view performance reviews
* Assign employees to participate in another employee's performance review

### Employee view
* List of performance reviews requiring feedback
* Submit feedback

## Challenge Scope
* High level description of design and technologies used
* Server side API (using a programming language and/or framework of your choice)
  * Implementation of at least 3 API calls
  * Most full stack web developers at PayPay currently use Java, Ruby on Rails, or Node.js on the server(with MySQL for the database), but feel free to use other tech if you prefer
* Web app
  * Implementation of 2-5 web pages using a modern web framework (e.g. React or Angular) that talks to server side
    * This should integrate with your API, but it's fine to use static responses for some of it 
* Document all assumptions made
* Complete solutions aren't required, but what you do submit needs to run.

## How to complete this challenge
* Fork this repo in github
* Complete the design and code as defined to the best of your abilities
* Place notes in your code to help with clarity where appropriate. Make it readable enough to present to the PayPay interview team
* Complete your work in your own github repo and send the results to us and/or present them during your interview

## What are we looking for? What does this prove?
* Assumptions you make given limited requirements
* Technology and design choices
* Identify areas of your strengths
* This is not a pass or fail test, this will serve as a common ground that we can deep dive together into specific issues

## Technologies Used

- Backend: Node/Express
- MongoDB
- Libaries: Es6, eslint, mocha, express, chai, babel

## To Install

- Download or clone
- Open terminal inside the root directory of clone folder
- Type `npm install` to install all dependencies
- `npm start` to run the app in production environment
- npm run `dev` to run development environment

## Features

- Create Employee by admin
- Create Employee review by an admin
- Get all employees
- Get all employees review
- Remove review by an admin
- Create feedback by an employee
- Login as an admin
- Create an admin

## API Endpoints

| Endpoint                                             | Functionality                      |
| ---------------------------------------------------- | ---------------------------------- |
| POST /create-employee                                | Create Employee                    |
| POST /create-employee-review/\<employeeId>           | Create an employee review          |
| GET /employees                                       | Get all employees                  |
| POST /post-feedback/\<employeeId>?reviewId=<reviewId>| Post a feedback                    |
| POST /create-admin/                                  | Create an admin                    |
| POST /login-admin/                                   | Login an admin                     |
| DELETE /review/\<employeeId>?reviewId=<reviewId>     | Remove a review for a employee     |

## AUTHOR

[Valentine Ezeh](https://github.com/valentineezeh/gateway-service/)
