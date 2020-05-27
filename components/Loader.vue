<template>
  <div class="loader">
    <div />
    <div />
    <div />
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>

<style scoped>
.loader {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.loader div {
  width: 8px;
  height: 40px;
  margin: 0 3px;
}
.loader div:nth-child(1) {
  background-color: var(--fuschia);
  animation: LoaderGrow 1s 0s infinite ease-in-out;
}
.loader div:nth-child(2) {
  background-color: var(--stark);
  animation: LoaderGrow 1s 0.25s infinite ease-in-out;
}
.loader div:nth-child(3) {
  background-color: var(--jewel);
  animation: LoaderGrow 1s 0.5s infinite ease-in-out;
}
@keyframes LoaderGrow {
  0%,
  15% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(1.8);
  }
  85%,
  100% {
    transform: scaleY(1);
  }
}
</style>
