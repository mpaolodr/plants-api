# API Documentation

## Backend Deployment

- <h3>https://water-my-plants-01.herokuapp.com/</h3>

## Frameworks

- bcryptjs
- cloudinary
- cors
- datauri
- dotenv
- express
- helmet
- jsonwebtoken
- knex
- knex-cleaner
- multer
- sqlite3

## Routes

- ### Authentication

  **/api/auth**

  | Method | Endpoint  | Action                    | Required Fields                  |
  | :----- | :-------- | :------------------------ | :------------------------------- |
  | POST   | /register | registers a new user      | username, password, phone_number |
  | POST   | /login    | signs registered users in | username, password               |

* ### Userus

  **/api/users**

  | Method | Endpoint             | Action                 | Required Fields                                                                                    |
  | :----- | :------------------- | :--------------------- | :------------------------------------------------------------------------------------------------- |
  | GET    | /:id                 | get user data          | userid                                                                                             |
  | GET    | /:id/plants          | get user's plants      | userid                                                                                             |
  | POST   | /:id/plants          | add plant to user data | userid, nickname(str), phone_number(str), species(str, not required), image(not required)          |
  | PUT    | /:id/plants/:plantid | edit plant information | userid, plantid, nickname(str), phone_number(str), species(str, not required), image(not required) |
  | DELETE | /:id/plants/:plantid | delete plant           | plantid userid                                                                                     |
