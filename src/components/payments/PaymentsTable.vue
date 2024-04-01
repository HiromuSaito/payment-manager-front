<template>
  <v-data-table
    v-model:items-per-page="paymentsPerPage"
    :headers="headers"
    :items="payments"
    :items-per-page-options="pages"
    items-per-page-text="表示件数"
    class="elevation-1"
    fixed-header
  ></v-data-table>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import payment from '../../api/payment';
import { PAYMENT_TYPE } from '../../const/';

const payments = ref([]);
payment
  .getList()
  .then((res) => {
    console.log(res);
    payments.value = res.data.payments;
  })
  .catch((e) => {
    console.log(e);
  });

const paymentsPerPage = ref(-1); // ALL
const pages = [{ value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' }];
const headers = [
  {
    title: 'ID',
    align: 'end',
    sortable: false,
    key: 'paymentId',
  },
  { title: '払出日', align: 'end', key: 'paymentDate' },
  { title: '商品コード', align: 'end', key: 'itemCode' },
  {
    title: '払出種別',
    align: 'end',
    key: 'paymentType',
    value: (item) => PAYMENT_TYPE[item.paymentType],
  },
  { title: '数量', align: 'end', key: 'paymentAmount' },
];
</script>
