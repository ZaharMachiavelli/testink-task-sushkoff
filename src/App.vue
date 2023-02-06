<template>
  <Toast v-if="success" @hideToast="hideToast" :orderNumber="orderNumber" />
  <h1>Страница добавления заказа</h1>
  <form class="goods_form" @sumbit="submitGoods">
    <div class="goods_form__select">
      <select name="goodsSelect" v-model="activeGood">
        <option v-for="good in goods" :key="good.id" :value="good">
          {{ good.title }}
        </option>
      </select>

      <input type="number" v-model="count" />
    </div>

    <button
      class="goods_form__accept"
      type="submit"
      :disabled="count == 0 || !activeGood.id"
      @click="addGood"
    >
      Добавить
    </button>

    <FormTable :goods="goodsCart" v-if="goodsCart.length" />

    <button
      type="submit"
      @click="submitGoods"
      class="goods_form__accept"
      :disabled="!goodsCart.length"
      v-if="goodsCart.length"
    >
      Отправить
    </button>
  </form>
</template>

<script lang="ts">
import axios from "axios";
import { ref, onMounted, reactive } from "vue";
import { IProduct, IProductItem } from "@/interfaces/index";
import FormTable from "@/components/FormTable.vue";
import Toast from "@/components/Toast.vue";

export default {
  name: "App",
  components: { FormTable, Toast },
  setup() {
    const count = ref<number>(1);
    const activeGood = ref<IProduct>({} as IProduct);
    const goods = ref<IProduct[] | null>([]);
    let goodsCart = ref<IProductItem[]>([]);
    const success = ref(false);
    const orderNumber = ref<string>("0");

    async function getGoods() {
      try {
        const response = await axios.get(
          "https://dev-su.eda1.ru/test_task/products.php"
        );
        if (response.status == 200) {
          return response.data.products as IProduct[];
        }
        return null;
      } catch (err) {
        return null;
      }
    }

    function hideToast() {
      success.value = false;
    }

    function addGood() {
      goodsCart.value.push({
        product: activeGood.value as IProduct,
        count: count.value,
      });
      count.value = 1;
      activeGood.value = {} as IProduct;
    }

    async function submitGoods() {
      try {
        const response = await axios.post(
          "https://dev-su.eda1.ru/test_task/save.php",
          goodsCart.value
        );
        if (response.status == 200) {
          success.value = true;
          orderNumber.value = response.data.code;
          goodsCart.value = [];
        }
        return false;
      } catch (err) {
        return false;
      }
    }

    onMounted(async () => {
      goods.value = await getGoods();
    });

    return {
      count,
      goods,
      orderNumber,
      success,
      activeGood,
      addGood,
      goodsCart,
      hideToast,
      submitGoods,
    };
  },
};
</script>

<style lang="scss">
body {
  font-family: Arial, Helvetica, sans-serif;

  * {
    box-sizing: border-box;
  }
}

.goods_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 10px;
  min-height: 200px;
  padding: 15px 20px;

  &__select {
    margin-bottom: 1.5rem;
    display: flex;
    column-gap: 0.5rem;
    @media (max-width: 575px) {
      flex-direction: column;
      row-gap: 1rem;
      width: 100%;

      * {
        width: 100%;
      }
    }

    select {
      height: 40px;
      border: 1px solid #ccc;
    }

    input {
      min-width: 100px;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 10px;
    }
  }

  &__accept {
    margin: 1rem 0;
    padding: 15px 20px;
    border-radius: 10px;
    text-decoration: none;
    font-style: italic;
    font-size: 1rem;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: blue;
    height: 40px;
    border: none;
    cursor: pointer;

    &:disabled {
      opacity: 0.4;
    }
  }

  &__table {
    flex: 1 1 auto;
    text-align: center;

    th,
    td {
      padding: 0.5rem;
    }

    th {
      border: 2px solid #000;
    }

    td {
      border: 1px solid #ccc;
    }
  }
}
</style>
