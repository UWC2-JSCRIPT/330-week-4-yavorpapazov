const { Router } = require("express");
const router = Router();

const noteDAO = require('../daos/note');
const userDAO = require('../daos/user');

router.use(async function (req, res, next) {
    const tokenString = req.headers.authorization.slice(7)
    const userId = await userDAO.getUserIdFromToken(tokenString)
    if (userId) {
        req.userId = userId;
    }
    next();
})

router.post("/", async (req, res, next) => {
    const note = {
        text: req.body.text,
        userId: req.userId
    }
    const savedNote = await noteDAO.createNote(note);
    res.json(savedNote);
});

router.get("/:id", async (req, res, next) => {
    const note = await noteDAO.getNote(req.userId, req.params.id);
    res.json(note[0]);
});

router.get("/", async (req, res, next) => {
    const notes = await noteDAO.getUserNotes(req.userId);
    res.json(notes);
});

// router.get("/search", async (req, res, next) => {
//   let { page, perPage, query } = req.query;
//   page = page ? Number(page) : 0;
//   perPage = perPage ? Number(perPage) : 10;
//   const books = await bookDAO.getSearch(page, perPage, query);
//   res.json(books);
// });

// router.get("/authors/stats", async (req, res, next) => {
//   const { authorInfo } = req.query;
//   const stats = await bookDAO.getStats(authorInfo);
//   res.json(stats);
// });

// // Read - single book
// router.get("/:id", async (req, res, next) => {
//   const book = await bookDAO.getById(req.params.id);
//   if (book) {
//     res.json(book);
//   } else {
//     res.sendStatus(404);
//   }
// });

module.exports = router;