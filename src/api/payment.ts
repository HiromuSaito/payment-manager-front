import { client } from './client'

export default {
  async getList () {
    return client.get('http://localhost:8080/api/payments')
  }
}
