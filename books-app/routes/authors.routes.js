const router = require("express").Router()

router.get('/', (req, res) => res.render('authors/list'))
router.get('/nuevos-talentos', (req, res) => res.render('authors/new-talents'))
router.get('/mas-vendidos', (req, res) => res.render('authors/best-sellers'))

module.exports = router