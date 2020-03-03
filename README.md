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

  | Method | Endpoint             | Action                                       | Required Fields                                                                                                                                         |
  | :----- | :------------------- | :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
  | GET    | /:id                 | get user data                                | userid                                                                                                                                                  |
  | PUT    | /:id                 | edit user password, username or phone number | password, username, phone_number                                                                                                                        |
  | GET    | /:id/plants          | get user's plants                            | userid(only used for api call)                                                                                                                          |
  | POST   | /:id/plants          | add plant to user data                       | userid(only used for api call), nickname(str), phone_number(str), species_name(str, not required), image(not required)                                  |
  | GET    | /:id/plants/:plantid | get plany by id                              | userid(only used for api call) plantid(only used for api call)                                                                                          |
  | PUT    | /:id/plants/:plantid | edit plant information                       | userid(only used for api call), plantid(only used for api call), nickname(str), phone_number(str), species_name(str, not required), image(not required) |
  | DELETE | /:id/plants/:plantid | delete plant                                 | plantid(only used for api call) userid(only used for api call)                                                                                          |
