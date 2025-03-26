const userRepository = require('../users/users-repository');
const { passwordMatched } = require('../../../utils/password');
const { errorResponder, errorTypes } = require('../../../core/errors');

async function login(email, password) {
  const user = await userRepository.getUserByEmail(email);

  if (!user) {
    throw errorResponder(
      errorTypes.INVALID_CREDENTIALS,
      'ga ada user dgn email itu'
    );
  }

  const passbenar = await passwordMatched(password, user.password);

  if (!passbenar) {
    throw errorResponder(errorTypes.INVALID_PASSWORD, 'password salah');
  }

  return { id: user._id, email: user.email, fullName: user.fullName };
}

module.exports = {
  login,
};
