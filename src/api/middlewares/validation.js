import Joi from 'joi';

import { BadRequestError, InternalError } from '../utils/errors';

export default (schema, field = 'body', { fatal = false } = {}) => {
    return (req, res, next) => {
        const result = Joi.validate(req[field], schema, { abortEarly: false });
        if (result.error) {
            const description = result.error.details.map(d => d.message).join(',');

            if (fatal) {
                throw new InternalError(description);
            } else {
                throw new BadRequestError(description, { hash: req.oauth2 ? req.oauth2.hash : undefined });
            }
        }
        req[field] = result.value || req[field];
        next();
    };
};
