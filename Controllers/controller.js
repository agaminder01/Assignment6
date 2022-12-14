const model = require("../Models/model")

module.exports = {
  home: (req, res) => {
    res.render("index")
  },
  index: (req, res) => {
    model.find({})
      .then(books => {
        res.render("books", {
          books: books
        })
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        res.redirect("/");
      });
  },
  admin: (req, res) => {
    model.find({})
      .then(books => {
        res.render("admin", {
          books: books
        })
      })
      .catch(error => {
        console.log(`Error fetching users: ${error.message}`)
        res.redirect("/");
      });
  },
  new: (req, res) => {
    res.render("new")
  },
  show: (req, res, next) => {
    let bookId = req.params.id;
    model.findById(bookId)
      .then(books => {
        res.locals.books = books;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  showView: (req, res) => {
    res.render("book1");
  }
};