import axios from 'axios';
export const client = createClient();

function createClient() {
  return axios.create({ withCredentials: true });
}
