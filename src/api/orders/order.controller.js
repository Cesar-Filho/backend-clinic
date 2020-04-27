import { OK, CREATED } from 'http-status-codes';
import orderModel from './order.model';
import { ConflictError } from '../utils/errors';

export default class OrderController {
    static async list(req, res) {
        const entity = await orderModel();
        const orders = await entity.find(req.query);

        res.status(OK).send(orders);
    }

    static async create(req, res) {
        const request = req.body;
        const entity = await orderModel();
        const orders = await entity.find({ patient_id: request.patient_id, exam_type: request.exam_type, status: 'AGUARDANDO' });
        if (orders.length > 0) {
            throw new ConflictError('Já existe um exame desse tipo agendado, por favor verifique sua agenda.');
        }
        const order = await entity.create(request);

        res.status(CREATED).send(order);
    }
}
