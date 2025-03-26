const booksService = require('./books-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function getBooks(request, response, next) {
  try {
    const offset = request.query.offset || 0;
    const limit = request.query.limit || 20;
    const books = await booksService.getBooks(offset, limit);

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

async function createBook(request, response, next) {
  try {
    const { title } = request.body;

    if (!title) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'Title is required');
    }

    const book = await booksService.create(title);

    return response.status(200).json(book);
  } catch (error) {
    return next(error);
  }
}

async function getBooksByID(request, response, next) {
  try {
    const { id } = request.params;
    const books = await booksService.getBooksByID(id);

    if (!id) {
      throw errorResponder(errorTypes.VALIDATION_ERROR, 'book not found');
    }

    return response.status(200).json(books);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  getBooks,
  createBook,
  getBooksByID,
};
