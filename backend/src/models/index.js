import { Sequelize } from 'sequelize';
import sequelize from '../config/database.js';
import defineUser from './user.model.js';
import defineRTI from './rti.model.js';

const User = defineUser(sequelize);
const RTI = defineRTI(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
  RTI,
};

export default db;
