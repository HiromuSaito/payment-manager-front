import { client } from './client';

export default {
  async getList() {
    return client.get('http://localhost:8080/api/payments');
  },
  async register(req: RegisterPaymentRequest) {
    return client.post('http://localhost:8080/api/payments', req);
  },
};

export type RegisterPaymentRequest = {
  paymentType: 'NON_PLANED_PAYMENT' | 'PLANED_PAYMENT';
  itemCode: String;
  paymentDate: String;
  paymentAmount: number;
  note?: string;
};
