const mongoose = require('mongoose');

const Note = require('../models/note');

module.exports = {};

// module.exports.getSearch = async (page, perPage, query) => { 
//   if (query) {
//     return await Book.find({ 
//       $text: { $search: query } },
//       { score: { $meta: 'textScore'}}
//     ).sort({ score: { $meta: 'textScore'}}).limit(perPage).skip(perPage*page).lean();
//   }
//   return await Book.find().limit(perPage).skip(perPage*page).lean();
// }

// module.exports.getStats = (authorInfo) => {
//   if (authorInfo) {
//     return Book.aggregate([
//       { $group: { _id: '$authorId', averagePageCount: { $avg: '$pageCount' }, numBooks: { $sum: 1 }, titles: { $push: '$title' } } },
//       { $project: { _id: 0, authorId: '$_id', averagePageCount: 1, numBooks: 1, titles: 1 } },
//       { $lookup: {
//         from: 'authors',
//         localField: 'authorId',
//         foreignField: '_id',
//         as: 'author'
//       }},
//       { $unwind: '$author' }
//     ])
//   }
//   return Book.aggregate([
//     { $group: { _id: '$authorId', averagePageCount: { $avg: '$pageCount' }, numBooks: { $sum: 1 }, titles: { $push: '$title' } } },
//     { $project: { _id: 0, authorId: '$_id', averagePageCount: 1, numBooks: 1, titles: 1 } }
//   ])
// }

// module.exports.getById = (bookId) => {
//   if (!mongoose.Types.ObjectId.isValid(bookId)) {
//     return null;
//   }
//   return Book.findOne({ _id: bookId }).lean();
// }

module.exports.createNote = async (note) => {
    const created = await Note.create(note);
    return created;
}

module.exports.getNote = async (userId, noteId) => {
    return await Note.find({ _id: noteId, userId }).lean();
}

module.exports.getUserNotes = async (userId) => {
    return await Note.find({ userId }).lean();
}

// class BadDataError extends Error {};
// module.exports.BadDataError = BadDataError;