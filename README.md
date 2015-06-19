#Overshare
[![Build Status](https://travis-ci.org/CodersInDev/overshare.svg?branch=test)](https://travis-ci.org/CodersInDev/overshare)

## What is Overshare?  
Overshare will one day be a photo-sharing web app to rival mySpace or even friendsreunited. Today, however, it is just a shell of its future self.

##Why are we building Overshare?
People need yet another platform to share all the mundane aspects of their lives.

##What Overshare does?
In the future, overshare will do all of the below and more. Currently, a user can register for the service and log in using their email address and a chosen password, or using their Twitter account. When the new user registers, they will receive a welcome email to congratulate them on choosing to start oversharing their lives.

* User login
 * [x] Social media authentication 
 * [x] Create new user
  * [ ] Welcome email 
 * [x] Basic authentication
* File upload/download
 * [x] User can upload file
 * [ ] User can view public stream photos
 * [ ] User can delete own photos
* Social functionality
 * [ ] Follow users
 * [ ] Like photos
 * [ ] Comments
* Search 
 * [ ] Search by users
 * [ ] Search by hashtags photos
 * [ ] Filter by date
* Admin
 * [ ] user statistics - login data

##How can you run Overshare?

Clone the repository, run npm install to install dependencies, then run ```node server.js```

To run the tests, run ```npm test```. If you run the test again it will fail because one of our test try to create a new user but the first test already created this user.
