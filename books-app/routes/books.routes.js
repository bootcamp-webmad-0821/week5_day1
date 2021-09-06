const router = require("express").Router()

const { checkId, isLoggedIn, checkRoles } = require("../middleware")

const Book = require('./../models/Book.model')



// Listado de libros
router.get('/', (req, res) => {

  Book
    .find()
    .select('title author')                 // renderiza contenido tanto por inicio de sesion (isLogged) como por rol (isPM)
    .then(books => res.render('books/list', { books, isLogged: req.session.currentUser, isPM: req.session.currentUser?.role === 'PM' }))
    .catch(err => console.log(err))
})


// Detalles de libros, comprueba ID
router.get('/detalles/:id', checkId, (req, res) => {

  const { id } = req.params

  Book
    .findById(id)
    .then(theBook => res.render('books/details', { theBook, isLogged: req.session.currentUser }))
    .catch(err => console.log(err))
})


// Formulario de creación: renderizado, protegida solo para usuarios logueados
router.get('/crear', isLoggedIn, (req, res) => {
  res.render('books/new-book-form')
})

// Formulario de creación: gestión, protegida solo para usuarios logueados
router.post('/crear', isLoggedIn, (req, res) => {

  const { title, description, rating, author } = req.body

  Book
    .create({ title, description, rating, author })
    .then(theBook => res.redirect(`/libros/detalles/${theBook._id}`))
    .catch(err => console.log(err))
})


// Formulario de edición: renderizado, protegida solo para usuarios logueados Y ADEMÁS solo usuario con rol PM o LT
router.get('/editar', isLoggedIn, checkRoles('PM', 'LT'), (req, res) => {

  const { book_id } = req.query

  Book
    .findById(book_id)
    .then(theBook => res.render('books/edit-book-form', theBook))
    .catch(err => console.log(err))
})

// Formulario de edición: gestión, protegida solo para usuarios logueados
router.post('/editar/:id', isLoggedIn, (req, res) => {

  const { id } = req.params
  const { title, description, rating, author } = req.body

  Book
    .findByIdAndUpdate(id, { title, description, rating, author }, { new: true })
    .then(theBook => res.redirect(`/libros/detalles/${theBook._id}`))
    .catch(err => console.log(err))
})


module.exports = router