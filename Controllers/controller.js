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
  create: (req, res, next) => {
    let bookParams = {
      id: req.body.id,
      Name: req.body.Name,
      AuthorName: req.body.AuthorName
    };
    model.create(bookParams)
      .then(user => {
        res.locals.redirect = "/admin";
        res.locals.user = user;
        next();
      })
      .catch(error => {
        console.log(`Error saving user: ${error.message}`);
        next(error);
      });
  },
  redirectView: (req, res, next) => {
    let redirectPath = res.locals.redirect;
    if (redirectPath) res.redirect(redirectPath);
    else next();
  },
  showView: (req, res) => {
    res.render("book1");
  },
  delete: (req, res, next) => {
    let bookId = req.params.id;
    model.findByIdAndRemove(bookId)
      .then(() => {
        res.locals.redirect = "/admin";
        next();
      })
      .catch(error => {

        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  }
};