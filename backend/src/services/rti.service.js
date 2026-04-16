import db from '../models/index.js';
import createError from '../utils/createError.js';

const RTI = db.RTI;

const createRTI = async (payload) => {
  const record = {
    applicantName: payload.applicantName,
    gender: payload.gender,
    contactNumber: payload.contactNumber,
    email: payload.email,
    address: payload.address,
    caseNumber: payload.caseNumber,
    subject: payload.subject,
    applicationMode: payload.applicationMode,
    dateOfReceipt: payload.dateOfReceipt,
    description: payload.description,
    department: payload.department,
    assignedOfficer: payload.assignedOfficer,
    dueDate: payload.dueDate,
    extendedDueDate: payload.extendedDueDate,
    reminderFrequency: payload.reminderFrequency,
    applicationFileName: payload.applicationFile.originalname,
    applicationFilePath: `uploads/${payload.applicationFile.filename}`,
    attachmentFileName: payload.attachmentFile?.originalname || null,
    attachmentFilePath: payload.attachmentFile ? `uploads/${payload.attachmentFile.filename}` : null,
  };

  return RTI.create(record);
};

const getAllRTIs = async () => {
  const results = await RTI.findAll({ order: [['createdAt', 'DESC']] });
  return results.map((item) => ({
    id: item.id,
    rtiNo: item.caseNumber,
    applicant: item.applicantName,
    department: item.department,
    date: item.dateOfReceipt,
    status: new Date(item.dueDate) >= new Date() ? 'Pending' : 'Verified',
  }));
};

const getRTIById = async (id) => {
  const item = await RTI.findByPk(id);
  if (!item) {
    throw createError(404, 'RTI record not found');
  }
  return item;
};

const updateRTI = async (id, payload) => {
  const item = await RTI.findByPk(id);
  if (!item) {
    throw createError(404, 'RTI record not found');
  }

  const fieldsToUpdate = {
    applicantName: payload.applicantName,
    gender: payload.gender,
    contactNumber: payload.contactNumber,
    email: payload.email,
    address: payload.address,
    caseNumber: payload.caseNumber,
    subject: payload.subject,
    applicationMode: payload.applicationMode,
    dateOfReceipt: payload.dateOfReceipt,
    description: payload.description,
    department: payload.department,
    assignedOfficer: payload.assignedOfficer,
    dueDate: payload.dueDate,
    extendedDueDate: payload.extendedDueDate,
    reminderFrequency: payload.reminderFrequency,
  };

  if (payload.applicationFile) {
    fieldsToUpdate.applicationFileName = payload.applicationFile.originalname;
    fieldsToUpdate.applicationFilePath = `uploads/${payload.applicationFile.filename}`;
  }

  if (payload.attachmentFile) {
    fieldsToUpdate.attachmentFileName = payload.attachmentFile.originalname;
    fieldsToUpdate.attachmentFilePath = `uploads/${payload.attachmentFile.filename}`;
  }

  return item.update(fieldsToUpdate);
};

const deleteRTI = async (id) => {
  const item = await RTI.findByPk(id);
  if (!item) {
    throw createError(404, 'RTI record not found');
  }
  await item.destroy();
  return true;
};

export default {
  createRTI,
  getAllRTIs,
  getRTIById,
  updateRTI,
  deleteRTI,
};
