const express = require('express');
const app = express();
const books = require('./books');
var bodyParser = require('body-parser')

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
    res.send(books);
});

router.get('/books/:id', (req, res) => {
    const book = books.filter(b => b.id === parseInt(req.params.id));

    if (book.length == 0) {
        return res.status(404).send(`No Book with that id ${req.params.id} not found error:404`);
    }
    else {
        res.send(`${book.length} no. of books Returned<br>${JSON.stringify(book)}`)
    }
})

router.post('/books', (req, res) => {

    if (req.body.price < 10) {
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
    res.send(newBook);
});

router.put('/books/:id', (req, res) => {
    const book = books.filter(b => b.id === parseInt(req.params.id));

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
    }
});

router.delete('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    //console.log(book)
    if (!book) {
        return res.status(404).send(`No Book with that id ${req.params.id} not found error:404`);
    }
    //Deletion:
    const index = books.indexOf(book);
    books.splice(index, 1);
    res.send(book);
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
});