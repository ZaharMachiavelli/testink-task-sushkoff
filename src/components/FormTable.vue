<template>
  <table class="goods_form__table">
    <thead>
      <tr>
        <th>Название товара</th>
        <th>Добавленное количество</th>
        <th>Стоимость добавленного количества</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in goods" :key="item.product.id">
        <td>{{ item.product.title }}</td>
        <td>{{ item.count }}</td>
        <td>{{ item.product.price * item.count }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "FormTable",
  props: {
    goods: Array,
  },
};
</script>

<style lang="scss" scoped>
</style>