#Overshare
[![Build Status](https://travis-ci.org/CodersInDev/overshare.svg?branch=test)](https://travis-ci.org/CodersInDev/overshare)

## What is Overshare?  
Overshare will one day be a photo-sharing web app to rival mySpace or even friendsreunited. Today, however, it is just a shell of its future self.

##Why are we building Overshare?

##What Overshare does?
In two days, overshare will do all of the below and more. Currently, it has none of the functionality below. All it does right now is allow you to drag and drop (or select from computer) files into an upload box. A thumbnail of the image will be generated. If you approve, you may hit the "Overshare" button to upload the file to the server. Nothing at all will happen, but you should feel free to press the button anyway.
You can also create a new user. The endpoints are working but the front-end is not yet linked. We use levelDB to store our users with the email has a key and a hash as the value which represent the password. The endpoints for the authentication also work, the next step is to store the user information into cookies.

* User login
 * [ ] Social media authentication 
 * [x] Create new user
  * [ ] Welcome email 
 * [x] Basic authentication
* File upload/download
 * [ ] User can upload file
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
