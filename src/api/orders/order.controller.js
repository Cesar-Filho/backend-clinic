import { OK, CREATED, NO_CONTENT } from 'http-status-codes';
import orderModel from './order.model';
import { ConflictError, BadRequestError } from '../utils/errors';

export default class OrderController {
    static async list(req, res) {
        const entity = await orderModel();
        const orders = await entity.find(req.query);

        res.status(OK).send(orders);
    }

    static async byId(req, res) {
        const entity = await orderModel();
        const order = await entity.find({ _id: req.params.id });

        if (order.length === 0) {
            throw new BadRequestError('Pedido não encontrado.');
        }

        res.status(OK).send(order[0]);
    }

    static async update(req, res) {
        const request = req.body;
        const entity = await orderModel();
        const item = await entity.findOne({ _id: req.params.id });

        if (!item) {
            throw new BadRequestError('Não foi possível encontrar pedido.');
        }
        if (item.status === 'REALIZADO') {
            throw new BadRequestError('Não é possível alterar pedido já realizado.');
        }

        const orders = await entity.find({ patient_id: request.patient_id, exam_type: request.exam_type, status: 'AGUARDANDO' });
        console.log('ORDERS:', orders);
        const hasItem = orders.filter((o) => o._id.toString() !== item._id.toString());
        console.log('HAS ITEM:', hasItem);
        if (orders.length > 0 && hasItem.length > 0) {
            throw new ConflictError('Já existe um exame desse tipo agendado, por favor verifique sua agenda.');
        }

        const order = await entity.findByIdAndUpdate({ _id: req.params.id }, request);
        if (order.length === 0) {
            throw new BadRequestError('Pedido não encontrado.');
        }

        res.status(OK).send(order);
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

    static async remove(req, res) {
        const request = req.body;
        const entity = await orderModel();

        if (request.status === 'REALIZADO') {
            throw new BadRequestError('Não é possível deletar pedido já realizado.');
        }

        const order = await entity.deleteOne({ _id: req.params.id });
        if (!order) {
            throw new BadRequestError('Pedido não encontrado.');
        }

        res.status(NO_CONTENT).send();
    }
}
