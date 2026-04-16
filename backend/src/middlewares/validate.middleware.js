const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const validationError = new Error('Validation failed');
      validationError.status = 400;
      validationError.details = error.details.map((item) => ({ field: item.path.join('.'), message: item.message }));
      return next(validationError);
    }
    next();
  };
};

export default validate;
