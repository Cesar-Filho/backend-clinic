import { OK } from 'http-status-codes';

export default class OrderController {
    static async list(req, res) {
        res.status(OK).send({ msg: 'Hello World!' });
    }
}
