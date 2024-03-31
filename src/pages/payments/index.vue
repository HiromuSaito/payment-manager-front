<template>
  <v-container>
    <v-col>
      <v-row> 払出記録 </v-row>
      <v-row class="justify-end">
        <v-btn class="mb-2" rounded="xl" @click="register">+</v-btn>
      </v-row>
      <v-row>
        <PaymentsTable />
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import PaymentsTable from '@/components/payments/PaymentsTable.vue';
import router from '@/router';

const register = () => {
  router.push({
    path: '/payments/register',
  });
};
</script>
