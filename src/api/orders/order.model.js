import connection from '../utils/conn';

const orderModel = async () => {
    const conn = await connection();

    if (!conn.models.orders) {
        conn.model('orders', {
            patient_id: { type: Number, required: true },
            exam_type: { type: String, uppercase: true, required: true, enum: ['HEMOGRAMA', 'RADIOGRAFIA'] },
            status: { type: String, required: true, uppercase: true, enum: ['AGUARDANDO', 'REALIZADO'] },
        });
    }

    return conn.model('orders');
};

export default orderModel;
