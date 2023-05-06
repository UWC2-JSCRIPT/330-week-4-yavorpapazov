const mongoose = require('mongoose');
const Note = require('../models/note');

module.exports = {};

module.exports.createNote = async (note) => {
    const created = await Note.create(note);
    return created;
}

module.exports.getNote = async (userId, noteId) => {
    if (!mongoose.Types.ObjectId.isValid(noteId)) {
        return null;
    }
    return await Note.find({ _id: noteId, userId }).lean();
}

module.exports.getUserNotes = async (userId) => {
    return await Note.find({ userId }).lean();
}