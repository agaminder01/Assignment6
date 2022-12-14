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
  show: (req, res, next) => {
    let bookId = req.params.id;
    model.findById(bookId)
      .then(book => {
        res.locals.book = book;
        next();
      })
      .catch(error => {
        console.log(`Error fetching user by ID: ${error.message}`);
        next(error);
      });
  },
  new: (req, res) => {
    res.render("users/new");
  },
  create: (req, res, next) => {
    let bookParams = {
      name: {
        first: req.body.first,
        last: req.body.last
      },
      email: req.body.email,
      password: req.body.password,
      zipCode: req.body.zipCode
    };
    model.create(userParams)
      .then(user => {
        res.locals.redirect = "/users";
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
        res.locals.redirect = "/users";
        next();
      })
      .catch(error => {

        console.log(`Error deleting user by ID: ${error.message}`);
        next();
      });
  }
};