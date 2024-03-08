const casual = require('casual');

const generateUser = () => {
  return {
    firstName: casual.first_name,
    lastName: casual.last_name,
    email: casual.email,
    password: casual.password,
  };
};

const generateItem = () => {
  return {
    name: casual.word,
    price: casual.integer(1, 1000),
    description: casual.sentence,
  };
};

module.exports = {
  generateUser,
  generateItem,
};