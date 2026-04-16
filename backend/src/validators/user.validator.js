import Joi from 'joi';

const namePattern = /^[a-zA-Z '-]+$/;

export const createUserSchema = Joi.object({
  firstName: Joi.string().trim().pattern(namePattern).required().messages({
    'string.empty': 'First name is required',
  }),
  lastName: Joi.string().trim().pattern(namePattern).required().messages({
    'string.empty': 'Last name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Valid email is required',
  }),
  role: Joi.string().trim().optional(),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string().trim().pattern(namePattern).optional(),
  lastName: Joi.string().trim().pattern(namePattern).optional(),
  email: Joi.string().email().optional(),
  role: Joi.string().trim().optional(),
}).min(1);
