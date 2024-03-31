import { client } from './client';

export default {
  async getList() {
    return client.get('http://localhost:8080/api/items');
  },
  async register(req: ItemRegisterRequest) {
    return client.post('http://localhost:8080/api/items', req);
  },
};

export type ItemRegisterRequest = {
  itemCode: string;
  manufacturerCode: string;
  itemName: string;
  isEOP: Boolean;
};
