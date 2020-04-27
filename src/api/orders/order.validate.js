import Joi from 'joi';

export const postSchema = Joi.object({
    patient_id: Joi.number().required(),
    exam_type: Joi.string().valid(['HEMOGRAMA', 'RADIOGRAFIA']).required(),
    status: Joi.string().default('AGUARDANDO'),
    date: Joi.date().required(),
});

export const querySchema = Joi.object({
    patient_id: Joi.number().optional(),
});
