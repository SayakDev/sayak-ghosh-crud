import { DataTypes } from 'sequelize';

const defineRTI = (sequelize) => {
  return sequelize.define('RTI', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    applicantName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    caseNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationMode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dateOfReceipt: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignedOfficer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    extendedDueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    reminderFrequency: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationFileName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    applicationFilePath: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    attachmentFileName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    attachmentFilePath: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }, {
    tableName: 'rtis',
    timestamps: true,
    paranoid: true,
    deletedAt: 'deletedAt',
  });
};

export default defineRTI;
