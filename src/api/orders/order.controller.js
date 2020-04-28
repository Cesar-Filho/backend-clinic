import { OK, CREATED, NO_CONTENT } from 'http-status-codes';
import orderModel from './order.model';
import { ConflictError, BadRequestError } from '../utils/errors';

export default class OrderController {
    static async list(req, res) {
        const { model, connection } = await orderModel();
        const orders = await model.find(req.query);

        connection.close();
        res.status(OK).send(orders);
    }

    static async byId(req, res) {
        const { model, connection } = await orderModel();
        const order = await model.find({ _id: req.params.id });

        if (order.length === 0) {
            throw new BadRequestError('Pedido não encontrado.');
        }

        connection.close();
        res.status(OK).send(order[0]);
    }

    static async update(req, res) {
        const request = req.body;
        const { model, connection } = await orderModel();
        const item = await model.findOne({ _id: req.params.id });

        if (!item) {
            throw new BadRequestError('Não foi possível encontrar pedido.');
        }
        if (item.status === 'REALIZADO') {
            throw new BadRequestError('Não é possível alterar pedido já realizado.');
        }

        const orders = await model.find({ patient_id: request.patient_id, exam_type: request.exam_type, status: 'AGUARDANDO' });
        const hasItem = orders.filter((o) => o._id.toString() !== item._id.toString());

        if (orders.length > 0 && hasItem.length > 0) {
            throw new ConflictError('Já existe um exame desse tipo agendado, por favor verifique sua agenda.');
        }

        const order = await model.findByIdAndUpdate({ _id: req.params.id }, request);
        if (order.length === 0) {
            throw new BadRequestError('Pedido não encontrado.');
        }

        connection.close();
        res.status(OK).send(order);
    }

    static async create(req, res) {
        const request = req.body;
        const { model, connection } = await orderModel();
        const orders = await model.find({ patient_id: request.patient_id, exam_type: request.exam_type, status: 'AGUARDANDO' });
        if (orders.length > 0) {
            throw new ConflictError('Já existe um exame desse tipo agendado, por favor verifique sua agenda.');
        }
        const order = await model.create(request);

        connection.close();
        res.status(CREATED).send(order);
    }

    static async remove(req, res) {
        const request = req.body;
        const { model, connection } = await orderModel();

        if (request.status === 'REALIZADO') {
            throw new BadRequestError('Não é possível deletar pedido já realizado.');
        }

        const order = await model.deleteOne({ _id: req.params.id });
        if (!order) {
            throw new BadRequestError('Pedido não encontrado.');
        }

        connection.close();
        res.status(NO_CONTENT).send();
    }
}
