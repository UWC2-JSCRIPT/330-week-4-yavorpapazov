// const mongoose = require('mongoose');

// const Book = require('../models/book');

// module.exports = {};

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

// module.exports.getAll = async (page, perPage, authorId) => {
//   if (authorId) {
//     return await Book.find({ authorId: new mongoose.Types.ObjectId(authorId) }).limit(perPage).skip(perPage*page).lean();
//   }
//   return await Book.find().limit(perPage).skip(perPage*page).lean();
// }

// module.exports.getById = (bookId) => {
//   if (!mongoose.Types.ObjectId.isValid(bookId)) {
//     return null;
//   }
//   return Book.findOne({ _id: bookId }).lean();
// }

// module.exports.deleteById = async (bookId) => {
//   if (!mongoose.Types.ObjectId.isValid(bookId)) {
//     return false;
//   }
//   await Book.deleteOne({ _id: bookId });
//   return true;
// }

// module.exports.updateById = async (bookId, newObj) => {
//   if (!mongoose.Types.ObjectId.isValid(bookId)) {
//     return false;
//   }
//   await Book.updateOne({ _id: bookId }, newObj);
//   return true;
// }

// module.exports.create = async (bookData) => {
//   try {
//     const created = await Book.create(bookData);
//     return created;
//   } catch (e) {
//     if (e.message.includes('validation failed')) {
//       throw new BadDataError(e.message);
//     }
//     throw e;
//   }
// }

// class BadDataError extends Error {};
// module.exports.BadDataError = BadDataError;