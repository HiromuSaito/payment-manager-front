<template>
  <v-data-table
    v-model:items-per-page="paymentsPerPage"
    :headers="headers"
    :items="items"
    :items-per-page-options="pages"
    items-per-page-text="表示件数"
    class="elevation-1"
    fixed-header
  >
    <!-- 環境によって変える -->
    <template v-slot:[`item.download`]="{ item }">
      <a :href="`http://localhost:8080/api/items/qr/${item.itemCode}`"> QRダウンロード</a>
    </template>
  </v-data-table>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import itemsApi from '../../api/items';

const items = ref([]);
itemsApi
  .getList()
  .then((res) => {
    items.value = res.data.items;
  })
  .catch((e) => {
    console.log(e);
  });

const paymentsPerPage = ref(-1); // ALL
const pages = [{ value: -1, title: '$vuetify.dataFooter.itemsPerPageAll' }];
const headers = [
  {
    title: '商品コード',
    align: 'end',
    sortable: true,
    key: 'itemCode',
  },
  { title: 'メーカーコード', align: 'end', key: 'manufacturerCode' },
  { title: '商品名', align: 'end', key: 'itemName' },
  {
    title: '販売状況',
    align: 'end',
    key: 'isEOP',
    value: (item) => (item.isEOP ? '廃盤' : '販売中'),
  },
  {
    title: 'QRダウンロード',
    align: 'end',
    key: 'download',
  },
];
</script>
