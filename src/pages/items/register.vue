<template>
  <v-container>
    <v-col>
      <v-row class="text-h4 mb-12"> 商品登録 </v-row>
      <v-row>
        <v-form ref="form" lazy-validation class="w-25">
          <v-text-field v-model="itemCode" label="商品コード" required></v-text-field>
          <v-text-field v-model="itemName" label="商品名" required></v-text-field>
          <v-text-field
            v-model="manufacturerCode"
            label="メーカーコード"
            required
          ></v-text-field>
          <v-radio-group v-model="isEOP" inline>
            <v-radio label="販売中" :value="false"></v-radio>
            <v-radio label="廃盤" :value="true"></v-radio>
          </v-radio-group>
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
import items from '../../api/items';

const itemCode = ref('');
const itemName = ref('');
const manufacturerCode = ref('');
const isEOP = ref(false);

const cancel = () => {
  router.push({ path: '/items' });
};

const register = async () => {
  const req = {
    itemCode: itemCode.value,
    manufacturerCode: manufacturerCode.value,
    itemName: itemName.value,
    isEOP: isEOP.value,
  };
  await items.register(req);
  router.push({ path: '/items' });
};
</script>
