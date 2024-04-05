<template>
  <v-container>
    <v-col>
      <v-row class="text-h4 mb-12"> 商品台帳 </v-row>
      <v-row class="justify-end">
        <v-btn class="mb-2" rounded="xl" @click="toRegister">+</v-btn>
      </v-row>
      <v-row>
        <ItemsTable />
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import ItemsTable from '@/components/items/ItemsTable.vue';
import router from '@/router';

const toRegister = () => {
  router.push({
    path: '/items/register',
  });
};
</script>
