const { Router } = require("express");
const router = Router();
const noteDAO = require('../daos/note');
const userDAO = require('../daos/user');

router.use(async function (req, res, next) {
    if (!req.headers.authorization) {
        res.sendStatus(401);
    } else {
        const tokenString = req.headers.authorization.slice(7);
        const userId = await userDAO.getUserIdFromToken(tokenString);
        if (userId) {
            req.userId = userId;
            next();
        } else {
            res.sendStatus(401);
        }
    }
});

router.post("/", async (req, res, next) => {
    try {
        const note = {
            text: req.body.text,
            userId: req.userId
        }
        const savedNote = await noteDAO.createNote(note);
        res.json(savedNote);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
       const note = await noteDAO.getNote(req.userId, req.params.id);
        if (!note) {
            res.sendStatus(400);
        } else if (note.length === 0) {
            res.sendStatus(404);
        } else {
            res.json(note[0]);
        }
    } catch (e) {
        res.status(500).send(e.message);
    }
});

router.get("/", async (req, res, next) => {
    try {
        const notes = await noteDAO.getUserNotes(req.userId);
        res.json(notes);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;