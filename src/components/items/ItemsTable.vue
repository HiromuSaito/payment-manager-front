<template>
  <v-container class="w-75">
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="items"
      :items-per-page-options="pages"
      items-per-page-text="表示件数"
      class="elevation-1"
      fixed-header
    ></v-data-table>
  </v-container>
</template>
<script setup lang="ts">
import { ref } from "vue";
import payment from "../../api/payment";
import {PAYMENT_TYPE} from "../../const/const"

const items = ref([])
payment.getList().then(res => {
  console.log(res)
  items.value = res.data.payments
})
.catch(e =>{
  console.log(e)
})


const itemsPerPage = ref(-1); // ALL
const pages = [
  { value: -1, title: "$vuetify.dataFooter.itemsPerPageAll" },
];
const headers = [
  {
    title: "ID",
    align: "end",
    sortable: false,
    key: "paymentId",
  },
  { title: "払出日", align: "end", key: "paymentDate" },
  { title: "商品コード", align: "end", key: "itemCode" },
  { title: "払出種別", align: "end", key: "paymentType" ,value: item => PAYMENT_TYPE[item.paymentType],},
  { title: "数量", align: "end", key: "paymentCount" },
];
</script>
