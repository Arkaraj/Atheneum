# atheneum
A very basic backend server made through Node.js and express, book api that can perform basic CURD operations.
> To run it.

```npm install``` </br>
 ```nodemon app.js``` </br>

Make a .env file and store Mysql Database's username and password

| Route        | HTTP Verb          | Description  |
| ------------- |:-------------:| -----:|
| /api/books      | GET | Get all the books. |
| /api/books      |  POST     |  Create a book. |
| /api/books/:id | GET      |    Get a single book. |
| /api/books/:id | PUT      |    Update a book with new info. |
| /api/books/:id | DELETE      |    DELETE	a book |
