const authservice = require('./authentication-service');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function login(request, response, next) {
  try {
    const { email, password } = request.body;
    if (!email || !password) {
      throw errorResponder(
        errorTypes.VALIDATION_ERROR,
        'email or password is required'
      );
    }
    const user = await authservice.login(email, password);

    return response.status(200).json(user);
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  login,
};
