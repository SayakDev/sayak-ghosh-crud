module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('rtis', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      applicant_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      gender: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      contact_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      case_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subject: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      application_mode: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      date_of_receipt: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      department: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assigned_officer: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      due_date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      extended_due_date: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      reminder_frequency: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      application_file_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      application_file_path: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      attachment_file_name: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      attachment_file_path: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('rtis');
  },
};
