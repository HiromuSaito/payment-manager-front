<template>
  <v-container>
    <v-col>
      <v-row>
        払出登録
        <v-spacer class="mb-16" />
      </v-row>
      <v-row>
        <v-form ref="form" lazy-validation class="w-400">
          <v-text-field v-model="paymentDate" label="払出日" required></v-text-field>

          <v-select v-model="itemCode" :items="itemCodes" label="商品コード" required />
          <v-select
            v-model="paymentType"
            :items="items"
            item-title="value"
            item-value="key"
            label="払出種別"
            required
          ></v-select>

          <v-text-field v-model="paymentAmount" label="数量" required></v-text-field>
          <v-textarea label="備考" v-model="note"></v-textarea>

          <v-btn color="error" class="mr-4" @click.prevent="cancel"> キャンセル</v-btn>
          <v-btn @click.prevent="register" color="success" class="mr-4"> 登録 </v-btn>
        </v-form>
      </v-row>
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import router from '../../router';
import { PAYMENT_TYPE } from '../../const';
import payment from '../../api/payment';
import itemsApi from '../../api/items';

const paymentDate = ref('');
const paymentAmount = ref(0);
const itemCode = ref('');
const paymentType = ref<'PLANED_PAYMENT' | 'NON_PLANED_PAYMENT'>('PLANED_PAYMENT');
const note = ref('');
const items = Object.entries(PAYMENT_TYPE).map(([key, value]) => ({
  key,
  value,
}));

const itemCodes = ref([]);
itemsApi.getCodeList().then((res) => {
  itemCodes.value = res.data.itemCodes;
});

const cancel = () => {
  router.push({ path: '/payments' });
};

const register = async () => {
  const req = {
    paymentType: paymentType.value,
    paymentDate: paymentDate.value,
    itemCode: itemCode.value,
    paymentAmount: paymentAmount.value,
    note: note.value,
  };
  await payment.register(req);
  router.push({ path: '/payments' });
};
</script>
