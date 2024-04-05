<template>
  <v-container>
    <v-col>
      <v-row class="text-h4 mb-12"> 払出登録 </v-row>
      <v-row>
        <v-form ref="form" lazy-validation class="w-25">
          <v-row>
            <v-menu ref="menu" :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-text-field
                  v-bind="props"
                  label="払出日"
                  required
                  prepend-icon="mdi-calendar"
                  v-model="paymentFormattedDate"
                />
              </template>
              <v-date-picker
                color="primary"
                v-model="paymentDate"
                hide-header
                @update:modelValue="formatDate()"
              >
              </v-date-picker>
            </v-menu>
          </v-row>
          <v-row>
            <v-btn @click.prevent="toggleReaderBoot" color="primary" class="mb-4"
              >QRを読み取る</v-btn
            >
          </v-row>
          <v-row v-if="isStartingUp">
            <qrcode-stream @detect="detect" />
          </v-row>
          <v-row>
            <v-select v-model="itemCode" :items="itemCodes" label="商品コード" required />
          </v-row>
          <v-row>
            <v-select
              v-model="paymentType"
              :items="items"
              item-title="value"
              item-value="key"
              label="払出種別"
              required
            ></v-select>
          </v-row>
          <v-row>
            <v-text-field v-model="paymentAmount" label="数量" required></v-text-field>
          </v-row>
          <v-row>
            <v-textarea label="備考" v-model="note"></v-textarea>
          </v-row>
          <v-row>
            <v-btn color="error" class="mr-4" @click.prevent="cancel"> キャンセル</v-btn>
            <v-btn @click.prevent="register" color="success" class="mr-4"> 登録 </v-btn>
          </v-row>
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
import { QrcodeStream } from 'vue-qrcode-reader';

const isStartingUp = ref(false);

const detect = (content) => {
  isStartingUp.value = false;
  itemCode.value = content[0].rawValue;
};

const toggleReaderBoot = () => {
  isStartingUp.value = !isStartingUp.value;
};

const paymentDate = ref();
const paymentFormattedDate = ref();
const paymentAmount = ref(0);
const itemCode = ref('');
const paymentType = ref<'PLANED_PAYMENT' | 'NON_PLANED_PAYMENT'>('PLANED_PAYMENT');
const note = ref('');
const items = Object.entries(PAYMENT_TYPE).map(([key, value]) => ({
  key,
  value,
}));

const formatDate = () => {
  paymentFormattedDate.value = `${paymentDate.value.getFullYear()}/${paymentDate.value.getMonth().toString().padStart(2, '0')}/${paymentDate.value.getDate().toString().padStart(2, '0')}`;
};

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
    paymentDate: paymentFormattedDate.value,
    itemCode: itemCode.value,
    paymentAmount: paymentAmount.value,
    note: note.value,
  };
  await payment.register(req);
  router.push({ path: '/payments' });
};
</script>

<style scoped>
.qr-reader {
  width: 64px;
  height: 64px;
}
</style>
