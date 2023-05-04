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
//   if (!book || JSON.stringify(book) === '{}' ) {
//     res.status(400).send('book is required');
//   } else {
//     try {
//       const savedBook = await bookDAO.create(book);
//       res.json(savedBook); 
//     } catch(e) {
//       if (e instanceof bookDAO.BadDataError || e.code === 11000) {
//         res.status(400).send(e.message);
//       } else {
//         res.status(500).send(e.message);
//       }
//     }
//   }
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

// // Read - all books
// router.get("/", async (req, res, next) => {
//   let { page, perPage, authorId } = req.query;
//   page = page ? Number(page) : 0;
//   perPage = perPage ? Number(perPage) : 10;
//   const books = await bookDAO.getAll(page, perPage, authorId);
//   res.json(books);
// });

// // Update
// router.put("/:id", async (req, res, next) => {
//   const bookId = req.params.id;
//   const book = req.body;
//   if (!book || JSON.stringify(book) === '{}' ) {
//     res.status(400).send('book is required"');
//   } else {
//     try {
//       const success = await bookDAO.updateById(bookId, book);
//       res.sendStatus(success ? 200 : 400); 
//     } catch(e) {
//       if (e instanceof bookDAO.BadDataError) {
//         res.status(400).send(e.message);
//       } else {
//         res.status(500).send(e.message);
//       }
//     }
//   }
// });

// // Delete
// router.delete("/:id", async (req, res, next) => {
//   const bookId = req.params.id;
//   try {
//     const success = await bookDAO.deleteById(bookId);
//     res.sendStatus(success ? 200 : 400);
//   } catch(e) {
//     res.status(500).send(e.message);
//   }
// });

module.exports = router;