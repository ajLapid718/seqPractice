const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/sequelize_practice', { logging: false });

const User = db.define('user', {
  first: {
    type: Sequelize.STRING
  },

  last: {
    type: Sequelize.STRING
  },

  age: {
    type: Sequelize.INTEGER,
    validate: {
      min: 18
    }
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false
  },

  bio: {
    type: Sequelize.TEXT
  }

}, {
  getterMethods: {
    fullName: function() {
      return this.getDataValue('first') + ' ' + this.getDataValue('last');
    }
  }
});

User.prototype.haveBirthday = function () {
  let newAge = this.age + 1;
  return User.update({age: newAge}, {where: {first: "DB"}});
}

module.exports = User;
