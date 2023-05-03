const mongoose = require('mongoose');
const uuid = require('uuid')

const User = require('../models/user');

module.exports = {};

// module.exports.getAll = (page, perPage) => {
//   return Author.find().limit(perPage).skip(perPage*page).lean();
// }

// module.exports.getById = (authorId) => {
//   if (!mongoose.Types.ObjectId.isValid(authorId)) {
//     return null;
//   }
//   return Author.findOne({ _id: authorId }).lean();
// }

// module.exports.deleteById = async (authorId) => {
//   if (!mongoose.Types.ObjectId.isValid(authorId)) {
//     return false;
//   }
//   await Author.deleteOne({ _id: authorId });
//   return true;
// }

// module.exports.updateById = async (authorId, newObj) => {
//   if (!mongoose.Types.ObjectId.isValid(authorId)) {
//     return false;
//   }
//   await Author.updateOne({ _id: authorId }, newObj);
//   return true;
// }

module.exports.createUser = async (userData, userEmail) => {
  try {
    const exist = await User.findOne({ email: userEmail }).lean();
    if (exist) {
      return 'exists'
    }
    const created = await User.create(userData);
    return created;
  } catch (e) {
    if (e.message.includes('validation failed')) {
      throw new BadDataError(e.message);
    }
    throw e;
  }
}

module.exports.getUser = async (userEmail) => {
    const user = await User.findOne({ email: userEmail }).lean();
    return user
}


module.exports.makeTokenForUserId = () => {
  //console.log(userId)
  const token = uuid.v4()
  return token
}

class BadDataError extends Error {};
module.exports.BadDataError = BadDataError;