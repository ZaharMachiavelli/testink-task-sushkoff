<template>
  <transition name="toast">
    <div class="toast_window">
      Заказ успешно добавлен. Ваш номер заказа: {{ orderNumber }}
    </div>
  </transition>
</template>

<script>
import { onMounted } from "vue";

export default {
  props: {
    orderNumber: Number,
  },
  setup(props, ctx) {
    onMounted(() => {
      setTimeout(() => {
        ctx.emit("hideToast");
      }, 5000);
    });
  },
};
</script>

<style>
.toast_window {
  position: fixed;
  top: 15px;
  width: 200px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  border-radius: 5px;
  background-color: greenyellow;
  left: calc(50% - 100px);
}

.toast-enter-from {
  opacity: 0;
}

.toast-enter-to {
  opacity: 0.75;
}

.toast-enter-active {
  transition: all 2s ease;
}

.toast-leave-from {
  opacity: 0.75;
}
.toast-leave-to {
  opacity: 0;
}
.toast-leave-active {
  transition: all 2s ease;
}
</style>