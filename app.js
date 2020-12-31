const express = require('express');
const app = express();
const books = require('./books');
var bodyParser = require('body-parser');
var mysql = require('mysql');
require('dotenv').config()
var connection = mysql.createConnection({
    host: `${process.env.HOST}`,
    user: `${process.env.USER_DB}`,
    password: `${process.env.PASSWORD}`,
    database: `${process.env.DB_NAME}`
});

connection.connect(err => {
    if (err) {
        console.log('Error in connecting...');
        return;
    } else
        console.log('connected as id ' + connection.threadId);
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const router = express.Router();

//CRUD OPERATION
//Http verbs: GET,POST,PUT,DELETE

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to our api!' });
});

// all of the routes will be prefixed with /api
app.use('/api', router);

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hooray! Welcome to our api!' });
});

router.get('/books', (req, res) => {
    //res.send(books);
    connection.query('SELECT * from books', function (error, results, fields) {
        if (error) throw error;
        // connected!
        console.log(results)
        res.send(results)
    });
});

router.get('/books/:id', (req, res) => {
    /*const book = books.filter(b => b.id === parseInt(req.params.id));

    if (book.length == 0) {
        return res.status(404).send(`No Book with that id ${req.params.id} not found error:404`);
    }
    else {
        res.send(`${book.length} no. of books Returned<br>${JSON.stringify(book)}`)
    }*/

    //Sql method
    connection.query(`SELECT * from books where id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        // connected!
        if (results.length == 0) { return res.status(404).send(`No Book with that id ${req.params.id} not found error:404`) }
        else
            console.log(results)
        res.send(results)
    });
})

router.post('/books', (req, res) => {

    /*if (req.body.price < 10) {
        res.status(400).send('Price must be more than 10!');
        return;
    }

    const newBook = {
        id: books.length + 1,
        name: req.body.name,
        author: req.body.author,
        dateofPublish: req.body.dateofPublish,
        price: parseInt(req.body.price),
        description: req.body.description
    };

    books.push(newBook);
    res.send(newBook);*/

    connection.query(`INSERT INTO books(name,author,price,dateOfPublish,description) values('${req.body.name}','${req.body.author}',${req.body.price},'${new Date().toISOString().slice(0, 19)}','${req.body.description}')`, function (error, results, fields) {
        if (error) throw error;
        // connected!
        console.log(results)
        res.send(`Sucessfully added data to the database!`);
        //res.send(results);
    });

});

router.put('/books/:id', (req, res) => {
    /*const book = books.filter(b => b.id === parseInt(req.params.id));

    if (book.length == 0) {
        return res.status(404).send(`No Book with that id ${req.params.id} not found error:404`);
    }
    else {
        if (req.body.price < 10) {
            res.status(400).send('Price must be more than 10!');
            return;
        }
        book[0].name = req.body.name;
        book[0].author = req.body.author;
        book[0].dateOfPublish = req.body.dateOfPublish;
        book[0].price = req.body.price;
        book[0].description = req.body.description;
        res.send(book);
        console.log('Updated!');
    }*/

    connection.query(`SELECT * from books where id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        // connected!
        if (results.length == 0) {
            return res.status(404).send(`No Book with that id ${req.params.id} not found error:404`)
        }
        else {
            connection.query(`update books set name='${req.body.name}',author='${req.body.author}',price=${req.body.price},description='${req.body.description}' where id = ${req.params.id}`, function (error, results, fields) {
                if (error) throw error;
                // connected!
                console.log(results)
                //res.send('Updated!!');
                res.send(results)
            });
        }

    });

});

router.delete('/books/:id', (req, res) => {
    /*const book = books.find(b => b.id === parseInt(req.params.id));
    //console.log(book)
    if (!book) {
        return res.status(404).send(`No Book with that id ${req.params.id} not found error:404`);
    }
    //Deletion:
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);*/
    connection.query(`SELECT * from books where id = ${req.params.id}`, function (error, results, fields) {
        if (error) throw error;
        // connected!
        if (results.length == 0) {
            return res.status(404).send(`No Book with that id ${req.params.id} not found error:404`)
        }
        else {
            connection.query(`Delete from books where id = ${req.params.id}`, function (error, results, fields) {
                if (error) throw error;
                // connected!
                console.log(results)
                //res.send('Deleted!!');
                res.send(results)
            });
        }

    });

});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});