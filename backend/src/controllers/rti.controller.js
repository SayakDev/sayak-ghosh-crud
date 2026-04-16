import rtiService from '../services/rti.service.js';
import { successResponse } from '../utils/apiResponse.js';
import createError from '../utils/createError.js';

const createRTI = async (req, res, next) => {
  try {
    const applicationFile = req.files?.applicationFile?.[0];
    if (!applicationFile) {
      throw createError(400, 'Application image file is required');
    }

    const payload = {
      ...req.body,
      applicationFile,
      attachmentFile: req.files?.attachmentFile?.[0] || null,
    };

    const rtiRecord = await rtiService.createRTI(payload);
    res.status(201).json(successResponse('RTI request created successfully', rtiRecord));
  } catch (error) {
    next(error);
  }
};

const listRTIs = async (_req, res, next) => {
  try {
    const rtiItems = await rtiService.getAllRTIs();
    res.json(successResponse('RTI list fetched successfully', rtiItems));
  } catch (error) {
    next(error);
  }
};

const getRTIById = async (req, res, next) => {
  try {
    const record = await rtiService.getRTIById(req.params.id);
    const recordData = typeof record.toJSON === 'function' ? record.toJSON() : record;
    const baseUrl = `${req.protocol}://${req.get('host')}`;

    const normalizePath = (filePath) => {
      if (!filePath) return null;
      return filePath.startsWith('/') ? filePath : `/${filePath}`;
    };

    const result = {
      ...recordData,
      applicationFileUrl: normalizePath(recordData.applicationFilePath) ? `${baseUrl}${normalizePath(recordData.applicationFilePath)}` : null,
      attachmentFileUrl: normalizePath(recordData.attachmentFilePath) ? `${baseUrl}${normalizePath(recordData.attachmentFilePath)}` : null,
    };

    res.json(successResponse('RTI fetched successfully', result));
  } catch (error) {
    next(error);
  }
};

const updateRTI = async (req, res, next) => {
  try {
    const payload = {
      ...req.body,
      applicationFile: req.files?.applicationFile?.[0] || null,
      attachmentFile: req.files?.attachmentFile?.[0] || null,
    };

    const updated = await rtiService.updateRTI(req.params.id, payload);
    res.json(successResponse('RTI updated successfully', updated));
  } catch (error) {
    next(error);
  }
};

const deleteRTI = async (req, res, next) => {
  try {
    await rtiService.deleteRTI(req.params.id);
    res.json(successResponse('RTI deleted successfully', null));
  } catch (error) {
    next(error);
  }
};

export default {
  createRTI,
  listRTIs,
  getRTIById,
  updateRTI,
  deleteRTI,
};
