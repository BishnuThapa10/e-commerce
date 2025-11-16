import joi from 'joi';


export const validateBody = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false
    });

    if (error) {
      const messages = error.details.map(d => `${d.path.join('.')}: ${d.message}`);
      return res.status(400).json({ errors: messages });
    }

    req.body = value;
    next();
  };
};