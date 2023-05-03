const { Router } = require("express");
const router = Router();
const bcrypt = require("bcrypt")
const userDAO = require('../daos/user');

// Create
router.post("/signup", async (req, res, next) => {
    if (!req.body.password || JSON.stringify(req.body.password) === '' ) {
        res.status(400).send('password is required');
    } else {
        try {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = {
                email: req.body.email,
                password: hashedPassword
            };
            const savedUser = await userDAO.createUser(user, user.email);
            if (savedUser === 'exists') {
                res.status(409).send('email already exists')
            } else {
                res.json(savedUser);
            }
        } catch(e) {
            if (e instanceof userDAO.BadDataError) {
                res.status(400).send(e.message);
            } else {
                res.status(500).send(e.message);
            }
        }
    }
});

router.post("/", async (req, res, next) => {
    if (!req.body.password || JSON.stringify(req.body.password) === '' ) {
        res.status(400).send('password is required');
    } else {
        try {
            const user = await userDAO.getUser(req.body.email);
            const result = await bcrypt.compare(req.body.password, user.password)
            if (!result) {
                res.status(401).send("password doesn't match")
            } else {
                const userToken = userDAO.makeTokenForUserId()
                res.json({ token: userToken });
            }
        } catch(e) {
            if (e instanceof userDAO.BadDataError) {
                res.status(400).send(e.message);
            } else {
                res.status(500).send(e.message);
            }
        }
    }
});

// // Read - single author
// router.get("/:id", async (req, res, next) => {
//   const author = await authorDAO.getById(req.params.id);
//   if (author) {
//     res.json(author);
//   } else {
//     res.sendStatus(404);
//   }
// });

// // Read - all authors
// router.get("/", async (req, res, next) => {
//   let { page, perPage } = req.query;
//   page = page ? Number(page) : 0;
//   perPage = perPage ? Number(perPage) : 10;
//   const authors = await authorDAO.getAll(page, perPage);
//   res.json(authors);
// });

// // Update
// router.put("/:id", async (req, res, next) => {
//   const authorId = req.params.id;
//   const author = req.body;
//   if (!author || JSON.stringify(author) === '{}' ) {
//     res.status(400).send('author is required"');
//   } else {
//     try {
//       const success = await authorDAO.updateById(authorId, author);
//       res.sendStatus(success ? 200 : 400); 
//     } catch(e) {
//       if (e instanceof authorDAO.BadDataError) {
//         res.status(400).send(e.message);
//       } else {
//         res.status(500).send(e.message);
//       }
//     }
//   }
// });

// // Delete
// router.delete("/:id", async (req, res, next) => {
//   const authorId = req.params.id;
//   try {
//     const success = await authorDAO.deleteById(authorId);
//     res.sendStatus(success ? 200 : 400);
//   } catch(e) {
//     res.status(500).send(e.message);
//   }
// });

module.exports = router;