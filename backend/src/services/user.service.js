import db from '../models/index.js';
import createError from '../utils/createError.js';

const User = db.User;

const createUser = async (payload) => {
  return await User.create(payload);
};

const getAllUsers = async () => {
  return await User.findAll({ order: [['createdAt', 'DESC']] });
};

const getUserById = async (id) => {
  const user = await User.findByPk(id);
  if (!user) {
    throw createError(404, 'User not found');
  }
  return user;
};

const updateUser = async (id, payload) => {
  const user = await getUserById(id);
  await user.update(payload);
  return user;
};

const deleteUser = async (id) => {
  const user = await getUserById(id);
  await user.destroy();
};

export default {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
