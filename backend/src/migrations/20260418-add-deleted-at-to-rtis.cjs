module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('rtis', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn('rtis', 'deleted_at');
  },
};
