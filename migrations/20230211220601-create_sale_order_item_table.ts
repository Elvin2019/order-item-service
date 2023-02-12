'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('SaleOrderItems', 'isPaid', {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    });
  },

  down: async (queryInterface) => {
    return queryInterface.removeColumn('SaleOrderItems', 'isPaid');
  },
};
